const express = require('express');
// const mysql = require("mysql2/promise");
const router = express.Router();
const PropertyDetails = require('../models/PropertyDetails');
// const { verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require("axios");
const db = require('../db')


// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Save uploaded files to the uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to the filename to make it unique
  },
});

const upload = multer({ storage: storage });

router.post('/propertyDetails', upload.fields([
  { name: 'featureImage', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 },
  { name: 'offersImage', maxCount: 1 }
]), async (req, res) => {
  try {
    // Extract form data
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
    } = req.body;

    // Extract file paths or names for images
    const featureImage = req.files['featureImage'] ? req.files['featureImage'][0].filename : null;
    const backgroundImage = req.files['backgroundImage'] ? req.files['backgroundImage'][0].filename : null;
    const offersImage = req.files['offersImage'] ? req.files['offersImage'][0].filename : null;

    // Save property details to MySQL
    const query = `
      INSERT INTO property_details (
        propertyID, propertyTitle, propertyType, propertyDescription, parentProperty, 
        builderName, status, label, material, rooms, bedsroom, kitchen, bhk, 
        yearBuilt, totalhomeArea, builtDimentions, openArea, price, location, 
        area, pinCode, amenities, featureImage, backgroundImage, offersImage
      ) 
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
    `;

    const values = [
      propertyID, propertyTitle, propertyType, propertyDescription, parentProperty,
      builderName, status, label, material, rooms, bedsroom, kitchen, bhk,
      yearBuilt, totalhomeArea, builtDimentions, openArea, price, location,
      area, pinCode, amenities, featureImage, backgroundImage, offersImage
    ];

    // Insert into database
    try {

      console.log("values ==> ", featureImage, backgroundImage, offersImage)
      await db.query(query, values);
      res.status(201).json({ message: "Property details saved successfully." });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Failed to save property details." });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: error.message });
  }
});


// // get count of properties using mongoes
// router.get('/property-count', async (req, res) => {
//   try {
//     const totalProperties = await PropertyDetails.countDocuments();
//     res.status(200).json({totalProperties});
//   } catch (error) {
//     res.status(500).json({error: 'Fail to calculate Total user'});
//   }
// });


// Get count of properties using mysql
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

//// get all property details in mongodb 

// router.get('/properties', async (req, res) => {
//   try {
//     const property = await PropertyDetails.find();
//     res.status(200).json(property);
//     console.log('ok');
//   } catch (error) {
//     console.log('error');

//     res.status(500).json({ message: error.message });
//   }
// });



// get all property details in mysql 
router.get('/properties', async (req, res) => {
  const query = 'SELECT * FROM property_details'; // SQL query to fetch all properties
  try {
    const [properties] = await db.query(query); // Execute the query
    res.status(200).json(properties); // Send the fetched data as a JSON response
    console.log('Fetched properties successfully');
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: error.message });
  }
});




//// get single property details using mongoes
// router.get('/properties/:id', async (req, res) => {
//   try {
//     const property = await PropertyDetails.findById(req.params.id);
//     res.status(200).json(property);
//   } catch (error) {
//     res.status(500).json(error);
//     console.log(error);
//   }
// });


// // //// get single property details using mysql
router.get('/properties/:id', async (req, res) => {
  const propertyId = req.params.id; // Get property ID from the URL parameter
  const query = 'SELECT * FROM property_details WHERE _id = ?'; // SQL query to fetch the property by ID

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





// //  Edit Properties using mongoes 
// router.put('/propertyDetails/:id', upload.single('featureImage'), async (req, res) => {
//   try {
//     const property = await PropertyDetails.findById(req.params.id);

//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }

//     const {
//       propertyTitle,
//       propertyType,
//       propertyDescription,
//       builderName,
//       propertyID,
//       parentProperty,
//       status,
//       label,
//       material,
//       rooms,
//       bedsroom,
//       kitchen,
//       bhk,
//       yearBuilt,
//       totalhomeArea,
//       builtDimentions,
//       openArea,
//       price,
//       location,
//       area,
//       pinCode,
//       amenities,
//     } = req.body;

//     // Check if a new image is uploaded
//     if (req.file) {
//       const newFeatureImage = req.file.filename;

//       // Delete old image from the file system
//       if (property.featureImage) {
//         fs.unlink(path.join(__dirname, '../uploads', property.featureImage), (err) => {
//           if (err) console.error(err);
//         });
//       }

//       property.featureImage = newFeatureImage;
//     }

//     // Update other fields
//     property.propertyTitle = propertyTitle;
//     property.propertyType = propertyType;
//     property.propertyDescription = propertyDescription;
//     property.propertyID = propertyID;
//     property.parentProperty = parentProperty;
//     property.builderName = builderName;
//     property.status = status;
//     property.label = label;
//     property.material = material;
//     property.rooms = rooms;
//     property.bedsroom = bedsroom;
//     property.kitchen = kitchen;
//     property.bhk = bhk;
//     property.yearBuilt = yearBuilt;
//     property.totalhomeArea = totalhomeArea;
//     property.builtDimentions = builtDimentions;
//     property.openArea = openArea;
//     property.price = price;
//     property.location = location;
//     property.area = area;
//     property.pinCode = pinCode;
//     property.amenities = amenities;

//     const updatedPropertyDetails = await property.save();

//     res.status(200).json(updatedPropertyDetails);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });



// Edit Properties using mysql     upload.single('featureImage')
router.put('/propertyDetails/:id', upload.single('featureImage'), async (req, res) => {
  const propertyId = req.params.id; // Get the property ID from the URL parameter

  const {
    propertyTitle,
    propertyType,
    propertyDescription,
    builderName,
    propertyID,
    parentProperty,
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
  } = req.body;

  const featureImage = req.file ? req.file.filename : null; // Check if a new image is uploaded

  try {
    // Fetch the existing property details
    const [property] = await db.query('SELECT * FROM property_details WHERE _id = ?', [propertyId]);

    if (property.length === 0) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // If a new feature image is uploaded, delete the old image from the file system
    if (featureImage && property[0].featureImage) {
      const oldImagePath = path.join(__dirname, '../uploads', property[0].featureImage);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error(`Failed to delete old image: ${err.message}`);
      });
    }

    // Update the property in the database

    const query = [];
    const values = []


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
    if (featureImage) {
      query.push('featureImage = ?');
      values.push(featureImage);
    }

    values.push(propertyId);


    // console.log("query ==> ", query);
    // console.log("values ==> ", values);


    await db.query(`UPDATE property_details SET ${query.join(', ')} WHERE _id = ?`,
      values).then((res) => {
        // console.log("resss", res)
      })


    res.status(200).json({ message: 'Property updated successfully' });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
});




// Delete Property using mongoes
// router.delete('/deletepropertyDetails/:id', async (req, res) => {
//   try {
//     const propertyID = req.params.id; // Extract the property ID from the request params
//     console.log("Property ID from request:", propertyID);

//     // Find the property by ID
//     const property = await PropertyDetails.findById(propertyID);
//     console.log("Property details:", property);

//     // If property not found, return 404
//     if (!property) {
//       return res.status(404).json({ message: 'Property not found' });
//     }

//     // Delete the associated feature image from the file system (if exists)
//     if (property.featureImage) {
//       const imagePath = path.join(__dirname, '../uploads', property.featureImage);
//       fs.unlink(imagePath, (err) => {
//         if (err) {
//           console.error(`Error deleting feature image: ${imagePath}`, err);
//         } else {
//           console.log(`Feature image deleted: ${imagePath}`);
//         }
//       });
//     }

//     // Delete the property record from the database
//     await PropertyDetails.findByIdAndDelete(propertyID);

//     // Respond with a success message
//     res.status(200).json({ message: 'Property deleted successfully' });
//   } catch (error) {
//     console.error("Error in deleting property:", error);
//     res.status(500).json({ message: 'Internal server error', error: error.message });
//   }
// });


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
    if (property[0].featureImage) {
      const imagePath = path.join(__dirname, '../uploads', property[0].featureImage);
      fs.unlink(imagePath, (err) => {
        if (err) console.error(`Failed to delete image: ${err.message}`);
      });
    }

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



//// get only residential  property details using mongoes
// router.get('/residential_properties', async (req, res) => {
//   try {
//     console.log("inside residential")
//     const residentialProperties = await PropertyDetails.find({
//       propertyType: 'Residential',
//     });
//     res.status(200).json(residentialProperties);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });








// Get only residential property details using mysql
router.get('/residential_properties', async (req, res) => {
  try {
    // Query to fetch only residential properties
    const [residentialProperties] = await db.query('SELECT * FROM property_details WHERE propertyType = ?', ['Residential']);

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
  } = req.body;

  const query = `
    INSERT INTO leads (
      fullName, emailId, contactNumber, subject, message, Refer, preferredLocation, visitDate, 
      budget, configuration, area
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  const values = [
    fullName, emailId, contactNumber, subject, message, Refer, preferredLocation, visitDate,
    budget, configuration, area,
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
  const { emailId, contactNumber, preferredLocation } = req.query;
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;

  let query = 'SELECT * FROM homi_grow.leads';
  const filters = [];
  const values = [];

  if (emailId) {
    filters.push('emailId = ?');
    values.push(emailId);
  }

  if (contactNumber) {
    filters.push('contactNumber = ?');
    values.push(contactNumber);
  }

  if (preferredLocation) {
    filters.push('preferredLocation = ?');
    values.push(preferredLocation);
  }

  if (filters.length > 0) {
    query += ' WHERE ' + filters.join(' AND ');
  }

  const offset = (page - 1) * limit;
  query += ' LIMIT ? OFFSET ?';
  values.push(limit, offset);

  // console.log("Final Query: ", query);
  // console.log("Values: ", values);

  try {
    const [results] = await db.query(query, values);
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "No leads found" });
    }
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error("Error executing query: ", error);
    res.status(500).json({ success: false, message: "Error retrieving lead data", error });
  }
});


router.get('/getleads-count', async (req, res) => {
  const query = 'SELECT COUNT(*) AS totalLeads FROM homi_grow.leads'; // SQL query to count leads
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
  const query = 'SELECT * FROM homi_grow.staff_master'; // SQL query to count leads
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
    INSERT INTO homi_grow.property_leads 
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
      INSERT INTO homi_grow.lead_descriptions (lead_id, lead_description, expected_visit_date, followup_by)
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
    FROM homi_grow.lead_descriptions 
    WHERE lead_id = ?
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// get only Commercial property details using mongoes
// router.get('/Commercial_properties', async (req, res) => {
//   try {
//     const residentialProperties = await PropertyDetails.find({
//       propertyType: 'Commercial',
//     });
//     res.status(200).json(residentialProperties);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get only Commercial property details using mysql
router.get('/Commercial_properties', async (req, res) => {
  try {
    // Query to fetch only commercial properties
    const [commercialProperties] = await db.query('SELECT * FROM property_details WHERE propertyType = ?', ['Commercial']);

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


// get all property details with filters using search button using mongoes



router.post('/filter_properties', async (req, res) => {
  try {
    const { area, bhk, price } = req.body;
    // Define filter object
    const filters = {};
    // Apply filters if they exist
    if (area) filters.area = area;
    if (bhk) filters.bhk = bhk;
    if (price) filters.price = price;
    // Find properties based on filters
    const properties = await PropertyDetails.find(filters);
    res.status(200).json(properties);
    console.log('details ', properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// // Get all property details with filters using search button using mysql
// router.post('/filter_properties', async (req, res) => {
//   try {
//     const { area, bhk, price } = req.body;

//     // Start with the basic SQL query
//     let query = 'SELECT * FROM property_details WHERE 1=1';
//     const values = [];

//     // Dynamically add filters to the query based on the provided fields
//     if (area) {
//       query += ' AND area = ?';
//       values.push(area);
//     }
//     if (bhk) {
//       query += ' AND bhk = ?';
//       values.push(bhk);
//     }
//     if (price) {
//       query += ' AND price = ?';
//       values.push(price);
//     }

//     // Execute the query with the filters
//     const [properties] = await db.query(query, values);

//     // If no properties are found
//     if (properties.length === 0) {
//       return res.status(404).json({ message: 'No properties found matching the filters' });
//     }

//     // Send the filtered properties
//     res.status(200).json(properties);
//     console.log('Filtered Properties:', properties);
//   } catch (error) {
//     console.error('Error fetching filtered properties:', error);
//     res.status(500).json({ message: error.message });
//   }
// });













//// get  property details base on builder name using mongoes
router.get('/builder_name/:builderName', async (req, res) => {
  try {
    const builderName = req.params.builderName;
    console.log('builder name ', builderName);
    const property = await PropertyDetails.find({
      builderName: builderName,
    });

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
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

router.get('/check', async (req, res) => {
  res.send('Working fine');
});

router.get('/check2', async (req, res) => {
  res.send('HEllo world');
});

module.exports = router;
