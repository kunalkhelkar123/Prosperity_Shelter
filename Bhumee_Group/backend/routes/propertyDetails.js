const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const dotenv = require("dotenv");
const { S3Client, PutObjectCommand, GetObjectCommand, GetObjectCommandInput, DeleteObjectCommand } = require('@aws-sdk/client-s3'); // AWS SDK v3
const db = require('../db');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

dotenv.config();
// AWS S3 Configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION, // Add your AWS region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Add your AWS Access Key
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Add your AWS Secret Key
  },
});

const bucketName = process.env.AWS_BUCKET_NAME;

// Multer configuration for handling file uploads with file validation
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  // Allow only certain file types
  if (file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and image files are allowed.'), false);
  }
};


const upload = multer({ storage, fileFilter });

// Upload file to S3
const uploadToS3 = async (file, bucketName) => {


  const params = {
    Bucket: bucketName, // Your S3 bucket name
    Key: `${Date.now()}-${file.originalname}`, // Unique file name in the bucket
    Body: file.buffer, // File buffer (in memory)
    ContentType: file.mimetype, // File MIME type
  };
  try {
    const command = new PutObjectCommand(params); // Create the PutObjectCommand
    await s3.send(command); // Send the command to S3
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`; // Return the file's public URL
  } catch (error) {
    console.error('Error uploading to S3:', error);
    throw new Error('Failed to upload file to S3');
  }
};


// Function to generate a signed URL
const generateSignedUrl = async (bucketName, key) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  try {
    // Generate a signed URL with expiration (e.g., 1 hour)
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 5 * 60 });
    console.log("Generated signed URL:", signedUrl);
    // return signedUrl;
  } catch (error) {
    console.error("Error generating signed URL:", error);
    throw new Error("Failed to generate signed URL");
  }
};


router.post(
  '/propertyDetails',
  upload.fields([
    { name: 'featureImage', maxCount: 2 },
    { name: 'backgroundImage', maxCount: 2 },
    { name: 'offersImage', maxCount: 2 },
    { name: 'brochurepdf', maxCount: 2 },
  ]),
  async (req, res) => {
    try {
      // Upload files to S3 and get their URLs

      console.log(" req.files['brochurepdf'] ", req.files['brochurepdf'])
      const featureImage =
        req.files['featureImage'] &&
        (await uploadToS3(req.files['featureImage'][0], bucketName));
      const backgroundImage =
        req.files['backgroundImage'] &&
        (await uploadToS3(req.files['backgroundImage'][0], bucketName));
      const offersImage =
        req.files['offersImage'] &&
        (await uploadToS3(req.files['offersImage'][0], bucketName));
      const brochurepdf =
        req.files['brochurepdf'] &&
        (await uploadToS3(req.files['brochurepdf'][0], bucketName));

      // Extract form data from the request body
      const {
        propertyID,
        propertyTitle,
        propertyType,
        propertyDescription,
        parentProperty,
        builderName,
        status,
        label,
        material,
        rooms,
        bedsroom,
        kitchen,
        bhk,
        yearBuilt,
        totalhomeArea,
        builtDimentions,
        openArea,
        price,
        location,
        area,
        pinCode,
        amenities,
        builderDescription,
        MahaRera,
      } = req.body;

      // Insert property details into MySQL database

      console.log("brochurepdf", brochurepdf)
      const query = `
        INSERT INTO property_details (
          propertyID, propertyTitle, propertyType, propertyDescription, parentProperty, 
          builderName, status, label, material, rooms, bedsroom, kitchen, bhk, 
          yearBuilt, totalhomeArea, builtDimentions, openArea, price, location, 
          area, pinCode, amenities, featureImage, backgroundImage, offersImage, brochurepdf,
          builderDescription, MahaRera
        ) 
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
      `;
      const values = [
        propertyID,
        propertyTitle,
        propertyType,
        propertyDescription,
        parentProperty,
        builderName,
        status,
        label,
        material,
        rooms,
        bedsroom,
        kitchen,
        bhk,
        yearBuilt,
        totalhomeArea,
        builtDimentions,
        openArea,
        price,
        location,
        area,
        pinCode,
        amenities,
        featureImage,
        backgroundImage,
        offersImage,
        brochurepdf,
        builderDescription,
        MahaRera,
      ];

      console.log('adding details in db');
      await db.query(query, values);
      res.status(201).json({ message: 'Property details saved successfully.' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Add API route for fetching signed URL
router.get('/getImageUrl', async (req, res) => {
  try {
    const { key } = req.query; // S3 object key is passed in the query parameters
    const bucketName = 'prosperityshelters'; // Your S3 bucket name
    // console.log("key inget  ", key)
    const signedUrl = await generateSignedUrl(bucketName, key);
    console.log("signedUrl  ", signedUrl)

    res.json({ signedUrl });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});


router.get('/property-count', async (req, res) => {
  const query = 'SELECT COUNT(*) AS totalProperties FROM property_details'; // SQL query to count properties

  try {
    const [result] = await db.query(query); // Execute the query
    const totalProperties = result[0].totalProperties; // Extract the count
    res.status(200).json({ totalProperties }); // Send the count as a JSON response
    console.log('Fetched property count successfully');
  } catch (error) {
    console.error('Error fetching property count:', error);
    res.status(500).json({ error: 'Failed to calculate total properties' });
  }
});


router.get('/properties', async (req, res) => {
  const query = 'SELECT * FROM property_details ORDER BY _id DESC'; // SQL query to fetch all properties
  try {
    const [properties] = await db.query(query); // Execute the query
    res.status(200).json(properties); // Send the fetched data as a JSON response
    console.log('Fetched properties successfully');
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: error.message });
  }
});


router.get('/hotproperties', async (req, res) => {
  const query = 'SELECT * FROM property_details WHERE label =? ORDER BY _id DESC'; // SQL query to fetch all properties
  try {
    const [properties] = await db.query(query, ["Hot"]); // Execute the query
    res.status(200).json(properties); // Send the fetched data as a JSON response
    console.log('Fetched properties successfully');
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: error.message });
  }
});

router.get('/properties/:id', async (req, res) => {
  
  const propertyId = req.params.id; // Get property ID from the URL parameter
  const query = 'SELECT * FROM property_details WHERE _id = ? ORDER BY _id DESC'; // SQL query to fetch the property by ID

  try {
    const [result] = await db.query(query, [propertyId]); // Execute the query with the ID parameter
    if (result.length > 0) {
      res.status(200).json(result[0]); // Send the property details as a JSON response
    } else {
      res.status(404).json({ message: 'Property not found' }); // Handle case where no property matches the ID
    }
  } catch (error) {
    console.error('Error fetching property details:', error);
    res.status(500).json({ error: 'Failed to fetch property details' }); // Handle any errors
  }
});


router.put('/propertyDetails/:id', upload.fields([
  // { name: 'featureImage', maxCount: 1 },
  // { name: 'backgroundImage', maxCount: 1 },
  // { name: 'offersImage', maxCount: 1 },
  // { name: 'brochurepdf', maxCount: 1 }
]), async (req, res) => {
  const propertyId = req.params.id; // Get the property ID from the URL parameter

  const {
    propertyID,
    propertyTitle,
    propertyType,
    propertyDescription,
    parentProperty,
    builderName,
    status,
    label,
    material,
    rooms,
    bedsroom,
    kitchen,
    bhk,
    yearBuilt,
    totalhomeArea,
    builtDimentions,
    openArea,
    price,
    location,
    area,
    pinCode,
    amenities,
    builderDescription,
    MahaRera,
  } = req.body;

  // const featureImage = req.files['featureImage'] ? req.files['featureImage'][0].filename : null;
  // const backgroundImage = req.files['backgroundImage'] ? req.files['backgroundImage'][0].filename : null;
  // const offersImage = req.files['offersImage'] ? req.files['offersImage'][0].filename : null;
  // const brochurepdf = req.files['brochurepdf'] ? req.files['brochurepdf'][0].filename : null;

  try {
    // Fetch the existing property details
    const [property] = await db.query('SELECT * FROM property_details WHERE _id = ?', [propertyId]);

    if (property.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Handle old image deletions only if new images are uploaded
    // const deleteOldImage = (fileKey, oldFileName) => {
    //   if (fileKey && oldFileName) {
    //     const oldImagePath = path.join(__dirname, '../uploads', oldFileName);
    //     fs.unlink(oldImagePath, (err) => {
    //       if (err) console.error(`Failed to delete old image: ${err.message}`);
    //     });
    //   }
    // };

    // Delete old images if new ones are uploaded
    // if (featureImage) deleteOldImage(featureImage, property[0].featureImage);
    // if (backgroundImage) deleteOldImage(backgroundImage, property[0].backgroundImage);
    // if (offersImage) deleteOldImage(offersImage, property[0].offersImage);
    // if (brochurepdf) deleteOldImage(brochurepdf, property[0].brochurepdf);

    // Update the property in the database
    const query = [];
    const values = [];

    if (propertyTitle) {
      query.push('propertyTitle = ?');
      values.push(propertyTitle);
    }
    if (propertyType) {
      query.push('propertyType = ?');
      values.push(propertyType);
    }
    if (propertyDescription) {
      query.push('propertyDescription = ?');
      values.push(propertyDescription);
    }
    if (propertyID) {
      query.push('propertyID = ?');
      values.push(propertyID);
    }
    if (status) {
      query.push('status = ?');
      values.push(status);
    }
    if (label) {
      query.push('label = ?');
      values.push(label);
    }
    if (parentProperty) {
      query.push('parentProperty = ?');
      values.push(parentProperty);
    }
    if (material) {
      query.push('material = ?');
      values.push(material);
    }
    if (rooms) {
      query.push('rooms = ?');
      values.push(rooms);
    }
    if (bedsroom) {
      query.push('bedsroom = ?');
      values.push(bedsroom);
    }
    if (kitchen) {
      query.push('kitchen = ?');
      values.push(kitchen);
    }
    if (bhk) {
      query.push('bhk = ?');
      values.push(bhk);
    }
    if (yearBuilt) {
      query.push('yearBuilt = ?');
      values.push(yearBuilt);
    }
    if (totalhomeArea) {
      query.push('totalhomeArea = ?');
      values.push(totalhomeArea);
    }
    if (builtDimentions) {
      query.push('builtDimentions = ?');
      values.push(builtDimentions);
    }
    if (openArea) {
      query.push('openArea = ?');
      values.push(openArea);
    }
    if (price) {
      query.push('price = ?');
      values.push(price);
    }
    if (location) {
      query.push('location = ?');
      values.push(location);
    }
    if (area) {
      query.push('area = ?');
      values.push(area);
    }
    if (pinCode) {
      query.push('pinCode = ?');
      values.push(pinCode);
    }
    if (amenities) {
      query.push('amenities = ?');
      values.push(amenities);
    }

    // if (featureImage) {
    //   query.push('featureImage = ?');
    //   values.push(featureImage);
    // }
    // if (backgroundImage) {
    //   query.push('backgroundImage = ?');
    //   values.push(backgroundImage);
    // }
    // if (offersImage) {
    //   query.push('offersImage = ?');
    //   values.push(offersImage);
    // }
    // if (brochurepdf) {
    //   query.push('brochurepdf = ?');
    //   values.push(brochurepdf);
    // }

    if (builderName) {
      query.push('builderName = ?');
      values.push(builderName);
    }
    if (MahaRera) {
      query.push('MahaRera = ?');
      values.push(MahaRera);
    }
    if (builderDescription) {
      query.push('builderDescription = ?');
      values.push(builderDescription);
    }

    // Add the propertyId for the WHERE clause
    values.push(propertyId);

    // Execute the update query
    await db.query(`UPDATE property_details SET ${query.join(', ')} WHERE _id = ?`, values);

    res.status(200).json({ message: 'Property updated successfully' });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
});



// // Delete Property using mysql
router.delete('/deletepropertyDetails/:id', async (req, res) => {
  const propertyId = req.params.id;

  try {
    console.log("here")
    // Fetch the existing property details
    const query = `SELECT * FROM property_details WHERE _id = ?`
    const [property] = await db.execute(query, [propertyId]);

    if (property.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Delete the feature image from the file system if it exists
    // if (property[0].featureImage) {
    //   const imagePath = path.join(__dirname, '../uploads', property[0].featureImage);
    //   fs.unlink(imagePath, (err) => {
    //     if (err) console.error(`Failed to delete image: ${err.message}`);
    //   });
    // }

    // Delete the property from the database
    try {
      const result = await db.query('DELETE FROM property_details WHERE _id = ?', [propertyId]);

      if (result) {
        res.status(200).send(); // Successfully deleted
      }
    }
    catch (err) {
      res.status(500).json({ error: 'Failed to delete property' });


    }


  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
});


router.get('/residential_properties', async (req, res) => {
  try {
    // Query to fetch only residential properties
    const [residentialProperties] = await db.query('SELECT * FROM property_details WHERE propertyType = ? ORDER BY _id DESC', ['Residential']);

    // Check if any properties are found
    if (residentialProperties.length === 0) {
      return res.status(404).json({ message: 'No residential properties found' });
    }

    res.status(200).json(residentialProperties); // Send the residential properties as the response
  } catch (error) {
    console.error('Error fetching residential properties:', error);
    res.status(500).json({ error: 'Failed to fetch residential properties' });
  }
});

router.post('/leads', async (req, res) => {
  console.log("Inside leads");
  const {
    fullName,
    emailId,
    contactNumber,
    subject,
    message,
    Refer,
    preferredLocation,
    visitDate,
    budget,
    configuration,
    area,
    assigned,
  } = req.body;

  const query = `
    INSERT INTO leads (
      fullName, emailId, contactNumber, subject, message, Refer, preferredLocation, visitDate, 
      budget, configuration, area, assigned
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);
  `;

  const values = [
    fullName, emailId, contactNumber, subject, message, Refer, preferredLocation, visitDate,
    budget, configuration, area,assigned,
  ];

  const response = await db.query(query, values)
  res.status(200).json({ response, success: true, message: "Thank you for making the first move! Your submission is confirmed, and we're eager to get in touch with you soon" });


  //  , (error, results) => {
  //     if (error) {
  //       console.error("Error inserting data: ", error);
  //       return res.status(500).json({ success: false, message: "Error saving lead data" });
  //     }

  //     console.log("Result: ", results);
  //     res.status(200).json({ success: true, message: "Lead submitted successfully!" });
  //   });
});


router.delete("/deleteLead", async (req, res) => {
  const { leadId } = req.body;

  console.log("id ==>", leadId)
  if (!leadId) {
    return res.status(400).json({ success: false, message: "Lead ID is required." });
  }

  try {
    // Replace `leads` with your actual table name
    console.log("deleteing lead")
    const result = await db.query("DELETE FROM leads WHERE id = ?", [leadId]);
    console.log("lead delted")
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Lead not found." });
    }

    res.status(200).json({ success: true, message: "Lead deleted successfully." });
  } catch (error) {
    console.error("Error deleting lead:", error);
    res.status(500).json({ success: false, message: "Failed to delete lead." });
  }
});


// Get leads
router.get('/getleads', async (req, res) => {
  console.log("Fetching leads...");
  const { staffuser } = req.params;
  let query = 'SELECT * FROM leads  ORDER BY id DESC;';
  try {
    const [results] = await db.query(query);
    if (results.length === 0) {
      return res.status(202).json({ success: false, message: "No leads found" });
    }
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("Error executing query: ", error);
    res.status(500).json({ success: false, message: "Error retrieving lead data", error });
  }
});


router.get('/getstaffleads/:staffuser', async (req, res) => {
  
  const { staffuser } = req.params;
  console.log("Fetching leads...",staffuser);
  console.log(" staffuser name  ", staffuser)
  let query = 'SELECT * FROM leads WHERE assigned = ? ORDER BY id DESC;';
  try {
    const [results] = await db.query(query,[staffuser]);
    if (results.length === 0) {
      return res.status(202).json({ success: false, message: "No leads found" });
    }
    console.log(" result.length  ==>",results.length)
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("Error executing query: ", error);
    res.status(500).json({ success: false, message: "Error retrieving lead data", error });
  }
});


router.get('/getleads-count', async (req, res) => {
  const query = 'SELECT COUNT(*) AS totalLeads FROM leads'; // SQL query to count leads
  try {
    const [result] = await db.query(query); // Execute the query
    const totalLeads = result[0].totalLeads; // Extract the count
    // console.log("totalLeads ==> ", totalLeads)
    res.status(200).json({ totalLeads }); // Send the count as a JSON response
    // console.log('Fetched totalLeads count successfully');
  } catch (error) {
    console.error('Error fetching totalLeads count:', error);
    res.status(500).json({ error: 'Failed to calculate total totalLeads' });
  }
});


router.get('/staff', async (req, res) => {
  const query = 'SELECT * FROM staff_master ORDER BY staffid DESC'; // SQL query to count leads
  try {
    const [result] = await db.query(query); // Execute the query
    // const totalLeads = result; // Extract the count
    // console.log("totalLeads ==> ", result)
    res.status(200).json({ data: result }); // Send the count as a JSON response
    // console.log('Fetched totalstaff fetch successfully');
  } catch (error) {
    console.error('Error fetching totalLeads count:', error);
    res.status(500).json({ error: 'Failed to calculate total totalLeads' });
  }
});


router.post("/updateStatus", async (req, res) => {
  const { userId, isActive } = req.body;  // Getting userId and the new status from the request body

  const updatedStatus = isActive === "true" ? "true" : "false";  // Toggle the status between "true" and "false"

  const query = "UPDATE staff_master SET isActive = ? WHERE staffid = ?";

  try {

    console.log("query", query)
    console.log("updatedStatus", updatedStatus)
    console.log("userId", userId)

    const [result] = await db.query(query, [updatedStatus, userId]);

    console.log("Updating user status:", updatedStatus, "for userId:", userId);

    // Check if any row was affected by the query
    if (result.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "User status updated successfully",
      });
    } else {
      // If no rows were affected, the user may not exist or the query did not update anything
      res.status(404).json({
        success: false,
        message: "User not found or status not updated",
      });
    }
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating status",
      error,
    });
  }
});

// Backend: API Route to delete user
router.delete("/deleteUser", async (req, res) => {
  const { userId } = req.body;  // Get userId from request body

  const query = "DELETE FROM staff_master WHERE staffid = ?";

  try {
    const [result] = await db.query(query, [userId]);

    console.log(`Deleting user with ID: ${userId}`);

    // Check if any rows were affected (if the user exists and was deleted)
    if (result.affectedRows > 0) {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting user",
      error,
    });
  }
});

//Post Enquiry from the property Details
router.post('/addenquiry', async (req, res) => {
  console.log("Adding a new lead...");
  const {
    name,
    email,
    mobile,
    propertyID,
    propertyTitle,
    budget,
    preferredLocation,
    propertyType,
    message
  } = req.body;

  const query = `
    INSERT INTO property_leads 
    (name, email, mobile, propertyID, propertyTitle, budget, preferredLocation, propertyType, message) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    email,
    mobile,
    propertyID,
    propertyTitle,
    budget,
    preferredLocation,
    propertyType,
    message
  ];

  // console.log("Insert Query: ", query);
  // console.log("Values: ", values);

  try {
    const [result] = await db.query(query, values);
    res.status(201).json({
      success: true,
      message: "Lead added successfully",
      data: { id: result.insertId }
    });
  } catch (error) {
    console.error("Error inserting lead: ", error);
    res.status(500).json({
      success: false,
      message: "Error adding lead",
      error
    });
  }
});


router.post("/addDescription", async (req, res) => {
  console.log("inside addDescription");
  const { lead_id, lead_description, expected_visit_date, followup_by } = req.body;
  console.log("lead_id, lead_description, expected_visit_date, followup_by ", lead_id, lead_description, expected_visit_date, followup_by);

  // Check for missing required fields
  if (!lead_id || !lead_description || !followup_by) {
    return res.status(400).send("Missing required fields.");
  }

  try {
    // Insert the new description and visit date into the 'lead_descriptions' table
    const query = `
      INSERT INTO lead_descriptions (lead_id, lead_description, expected_visit_date, followup_by)
      VALUES (?, ?, ?, ?)
    `;

    const values = [lead_id, lead_description, expected_visit_date ? expected_visit_date : null, followup_by];

    // Execute the query
    const [result] = await db.query(query, values);

    // Send the success response after the query
    return res.status(201).json({
      success: true,
      message: "Lead addDescription added successfully",
      data: { id: result.insertId }
    });

  } catch (error) {
    console.error("Error adding description:", error);

    // Send the error response if there's an issue
    return res.status(500).json({
      success: false,
      message: "Error adding description",
      error
    });
  }
});


router.get("/getDescriptions/:lead_id", async (req, res) => {
  const { lead_id } = req.params;

  try {
    const query = `
    SELECT lead_description, expected_visit_date, followup_by, created_at 
    FROM lead_descriptions 
    WHERE lead_id = ?
    ORDER BY id DESC;
  `;

    const [rows] = await db.query(query, [lead_id]);

    // Format the created_at date for each row
    const formattedRows = rows.map(row => {
      const created_at = new Date(row.created_at);
      const formattedcreated_at = created_at.toLocaleDateString('en-GB');

      const expected_visit_date = new Date(row.expected_visit_date);
      const formattedDate = expected_visit_date.toLocaleDateString('en-GB'); // 'en-GB' for day-month-year format
      return {
        ...row,
        expected_visit_date: formattedDate, // Replace the original date with the formatted one
        created_at: formattedcreated_at
      };
    });



    console.log("formattedRows ==> ", formattedRows);
    res.status(200).json({ success: true, data: formattedRows });

  } catch (error) {
    console.error("Error fetching descriptions: ", error);
    res.status(500).json({ success: false, message: "Failed to fetch descriptions", error });
  }
});


router.post('/updateUser', async (req, res) => {
  const { name, email, phone, password, isActive, staffid } = req.body;
  console.log("name, email, phone, password, isActive, staffid", name, email, phone, password, isActive, staffid)
  try {
    // Update the user details in the database
    const query = `
      UPDATE staff_master 
      SET name = ?, email = ?, phone = ?, password = ?, isActive = ? 
      WHERE staffid = ?
    `;
    const values = [name, email, phone, password, isActive, staffid];

    // Execute the query
    const result = await db.query(query, values);

    // Check if the update was successful
    console.log("result  ==> ", result[0].affectedRows)
    if (result[0].affectedRows > 0) {
      return res.json({ success: true, message: "User details updated successfully." });
    } else {
      return res.status(400).json({ success: false, message: "Failed to update user details." });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
});


router.post("/createStaff", async (req, res) => {
  const { name, phone, email, password, status } = req.body;
  // Validate inputs
  if (!name || !phone || !email || !password || !status) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }
  try {
    // Save the staff details to the database

    const query = `
   INSERT INTO staff_master (name, phone, email, password, isActive)
        VALUES (?, ?, ?, ?, ?);
    `;

    const values = [name, phone, email, password, status];

    console.log("query ==> ", query);
    console.log("values ==> ", values)

    // Execute the query
    const [result] = await db.query(query, values);


    console.log("staff member added  result ", result)
    console.log(" result.insertId ", result.insertId)

    res.status(201).json({ success: true, data: { id: result.insertId }, message: "Staff member added successfully" });
  } catch (err) {
    console.error("Error adding staff:", err);
    res.status(500).json({ success: false, message: "An error occurred while adding the staff member" });
  }
});


router.post("/submit-google-form", async (req, res) => {

  console.log("inside submit google form ")
  const googleFormURL =
    "https://docs.google.com/forms/d/e/1FAIpQLScBoB1H3JLepBBnAhg9wbapoyX0ylUA830VycJASb7upy-jCw/formResponse";

  try {
    // Forward form data to Google Form
    const response = await axios.post(googleFormURL, req.body, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    console.log("data send to gooogle form ")
    res.status(200).send("Form submitted successfully!");
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).send("Error submitting form.");
  }
});


router.get('/Commercial_properties', async (req, res) => {
  try {
    // Query to fetch only commercial properties
    const [commercialProperties] = await db.query('SELECT * FROM property_details WHERE propertyType = ? ORDER BY _id DESC', ['Commercial']);

    // Check if any properties are found
    if (commercialProperties.length === 0) {
      return res.status(404).json({ message: 'No commercial properties found' });
    }

    res.status(200).json(commercialProperties); // Send the commercial properties as the response
  } catch (error) {
    console.error('Error fetching commercial properties:', error);
    res.status(500).json({ error: 'Failed to fetch commercial properties' });
  }
});

router.post('/filter_properties', async (req, res) => {
  try {
    const { area, configuration, budget2 } = req.body;

    console.log("Received Params:", area, configuration, budget2);

    // Define the filter conditions and values
    const filters = [];
    const values = [];

    // Apply filters if they exist
    if (area) {
      filters.push('location = ?');
      values.push(area);
    }
    if (configuration) {
      filters.push('bhk = ?');
      values.push(configuration);
    }
    let budget = "";
    if (budget2) {

      budget = JSON.parse(budget2)
    }

    // Handling the budget field with ranges
    if (budget) {
      let minBudget = null;
      let maxBudget = null;
      console.log("budget ", budget)
      if (budget == '20') {
        minBudget = 1;
        maxBudget = 2000000;
      } else if (budget == '2050') {
        // console.log("sda2")
        minBudget = 2000000;
        maxBudget = 5000000;
      } else if (budget == '501') {
        minBudget = 5000000;
        maxBudget = 10000000;
      } else if (budget == '115') {
        minBudget = 10000000;
        maxBudget = 15000000;
      } else if (budget == "152") {
        // console.log("sdsd")
        minBudget = 15000000;
        maxBudget = 20000000;
      } else if (budget == '225') {
        minBudget = 20000000;
        maxBudget = 25000000;
      } else if (budget == '253') {
        minBudget = 25000000;
        maxBudget = 30000000;
      } else if (budget == '335') {
        minBudget = 30000000;
        maxBudget = 35000000;
      } else if (budget == '354') {
        minBudget = 35000000;
        maxBudget = 40000000;
      } else if (budget == '45') {
        minBudget = 40000000;
        maxBudget = 50000000;
      } else if (budget == '5') {
        minBudget = 50000000;
        maxBudget = 999999999; // Large upper bound
      } else {
        console.log("Invalid budget range received.");
      }

      // Apply budget filter only if valid min/max values exist
      if (minBudget !== null && maxBudget !== null) {
        filters.push('price BETWEEN ? AND ?');
        values.push(minBudget, maxBudget);
      }
    }

    // Build the final query dynamically

    let query = 'SELECT * FROM property_details';
    if (filters.length > 0) {
      query += ' WHERE ' + filters.join(' AND ');
    }

    // Debugging: Print the query and values
    console.log("Final Query:", query);
    console.log("Query Values:", values);

    // Execute the query
    // console.log("budget22",budget)
    const [properties] = await db.query(query, values);

    res.status(200).json(properties);
    // console.log('Filtered Properties:', properties);
  } catch (error) {
    console.log("Error in filter_properties route:", error);
    res.status(500).json({ message: error.message });
  }
});




// // Get property details based on builder name using mysql
// router.get('/builder_name/:builderName', async (req, res) => {
//   try {
//     const builderName = req.params.builderName;
//     console.log('Builder name:', builderName);

//     // Prepare the SQL query to fetch properties based on builder name
//     const query = 'SELECT * FROM property_details WHERE builderName = ?';

//     // Execute the query
//     const [properties] = await db.query(query, [builderName]);

//     // If no properties found
//     if (properties.length === 0) {
//       return res.status(404).json({ message: 'No properties found for this builder' });
//     }

//     // Send the properties in the response
//     res.status(200).json(properties);
//   } catch (error) {
//     console.error('Error fetching properties by builder name:', error);
//     res.status(500).json({ message: error.message });
//   }
// });


router.get('/getstaff', async (req, res) => {
  const query = 'SELECT name FROM staff_master ORDER BY staffid DESC'; // SQL query to count leads
  try {
    const [result] = await db.query(query); // Execute the query
    // const totalLeads = result; // Extract the count
    // console.log("totalLeads ==> ", result)
    res.status(200).json({ data: result }); // Send the count as a JSON response
    // console.log('Fetched totalstaff fetch successfully');
  } catch (error) {
    console.error('Error fetching totalLeads count:', error);
    res.status(500).json({ error: 'Failed to calculate total totalLeads' });
  }
});

router.put('/updateAssigned', async (req, res) => {
  const { leadId, assigned} = req.body;
  console.log("leadId, assigned", leadId, assigned)
  try {
    // Update the user details in the database
    const query = `
      UPDATE leads 
      SET assigned = ? 
      WHERE id = ?
    `;
    const values = [assigned,leadId];

    // Execute the query
    const result = await db.query(query, values);

    // Check if the update was successful
    console.log("result  ==> ", result[0].affectedRows)
    if (result[0].affectedRows > 0) {
      return res.json({ success: true, message: "lead details updated successfully." });
    } else {
      return res.status(400).json({ success: false, message: "Failed to update user details." });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
});

router.put('/deleteLead', async (req, res) => {
  const { leadId,data } = req.body;
  console.log("leadId", leadId,data.leadId)
  try {
    // Update the user details in the database
    const query = `
      UPDATE leads 
      SET assigned = ? 
      WHERE id = ?
    `;
    const values = ['NOT ASSIGNED',data.leadId];

    // Execute the query
    const result = await db.query(query, values);

    // Check if the update was successful
    console.log("result  ==> ", result[0].affectedRows)
    if (result[0].affectedRows > 0) {
      return res.json({ success: true, message: "lead details updated successfully." });
    } else {
      return res.status(400).json({ success: false, message: "Failed to update user details." });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
});

router.get('/check', async (req, res) => {
  res.send('Working fine');
});

router.get('/check2', async (req, res) => {
  res.send('HEllo world');
});

module.exports = router;
