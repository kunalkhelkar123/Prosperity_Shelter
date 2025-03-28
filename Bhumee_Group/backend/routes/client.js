const express = require('express');
const router = express.Router();
const sendBirthdayWishEmail = require("../handlers/handleSendBirthdayMessage")
const sendWishEmail = require("../handlers/handleSendBirthdayMessage")
const { S3Client, PutObjectCommand, GetObjectCommand, GetObjectCommandInput, DeleteObjectCommand } = require('@aws-sdk/client-s3'); // AWS SDK v3
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const multer = require('multer');
const dotenv = require("dotenv");


const db = require('../db');
const sendAnniversaryWishEmail = require('../handlers/handleSendAnniversaryMessage');
dotenv.config();



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

router.post(
    '/addoffers',
    upload.fields([
        { name: 'image', maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            // Upload files to S3 and get their URLs

            // console.log("insods")
            const image =
                req.files['image'] &&
                (await uploadToS3(req.files['image'][0], bucketName));

            // Extract form data from the request body
            const {
                heading
            } = req.body;
            // console.log("insods2")

            // Insert property details into MySQL database
            const query = `
          INSERT INTO offers_data (
            heading,image
          ) 
          VALUES (?,?);
        `;
            const values = [
                heading
                , image
            ];

            // console.log('adding details in db');
            await db.query(query, values);
            res.status(201).json({ message: 'offer details saved successfully.' });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: error.message });
        }
    }
);

router.get("/getoffers", async (req, res) => {
    try {
        const query = `
    SELECT * 
    FROM offers_data
    ORDER BY id DESC;
`;

        const [rows] = await db.execute(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching offers_data details:", error);
        res.status(500).json({ error: "Failed to fetch offers_data details." });
    }
});


router.delete('/deleteoffers/:id', async (req, res) => {
    const offerid = req.params.id;
    // console.log("id ", offerid)

    try {
        //   console.log("here")
        // Fetch the existing offers_data details
        const query = `SELECT * FROM offers_data WHERE id = ?`
        const [offers_data] = await db.execute(query, [offerid]);
        // console.log("offers_data", offers_data)
        if (offers_data.length === 0) {
            return res.status(404).json({ message: 'offers_data not found' });
        }
        try {
            // console.log("deleting ")
            const result = await db.query('DELETE FROM offers_data WHERE id = ?', [offerid]);

            if (result) {
                res.status(200).send(); // Successfully deleted
            }
        }
        catch (err) {
            console.log("error", err)
            res.status(500).json({ error: 'Failed to delete offers_data' });


        }


    } catch (error) {
        console.error('Error deleting offers_data:', error);
        res.status(500).json({ error: 'Failed to delete offers_data' });
    }
});

router.put("/update-booking", async (req, res) => {
    try {
        const { id, client_id, ...updateData } = req.body;

        // Filter out fields with null or undefined values
        const filteredData = Object.entries(updateData)
            .filter(([key, value]) => value !== null && value !== undefined)
            .reduce((acc, [key, value]) => {
                acc[key] = value;
                return acc;
            }, {});

        // Generate the dynamic query
        const fields = Object.keys(filteredData)
            .map((key) => `${key} = ?`)
            .join(", ");

        const values = Object.values(filteredData);

        // Ensure fields are not empty
        if (!fields) {
            return res.status(400).json({ message: "No valid fields to update." });
        }

        const query = `UPDATE client_booking_master SET ${fields} WHERE id = ?`;

        // console.log("query", query);
        // console.log("values", values);
        // console.log("id", id);

        // Execute the query
        await db.execute(query, [...values, id]);
        res.status(200).json({ message: "Booking updated successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update booking." });
    }
});


router.get("/bookings", async (req, res) => {
    try {
        const query = `
    SELECT * 
    FROM client_booking_master
    ORDER BY id DESC;
`;

        const [rows] = await db.execute(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching booking details:", error);
        res.status(500).json({ error: "Failed to fetch booking details." });
    }
});


router.post('/addpayments', async (req, res) => {
    const { clientId, amount, paymentMode, paymentDate, remarks, balanceAmount } = req.body;

    // console.log("totalAmount", balanceAmount)
    if (!clientId || !amount || !paymentMode || !paymentDate) {
        // console.log("!clientId || !amount || !paymentMode || !paymentDate ", clientId, amount, paymentMode, paymentDate)
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Insert the payment data into the database
        const result = await db.query(
            'INSERT INTO client_payments (client_id, amount, payment_mode, payment_date, added_by) VALUES (?, ?, ?, ?, ?)',
            [clientId, amount, paymentMode, paymentDate, remarks]
        );

        if (result) {

            // console.log("balanceAmount", balanceAmount)
            // console.log("amount", amount)

            const calculatedamount = balanceAmount - amount

            // console.log("calculatedamount", calculatedamount)



            const queryToUpdatebalanceAmount = `
        UPDATE client_payment_details
        SET balanceAmount = ?
        WHERE client_id = ?
    `;
            const resultbalanceAmount = await db.execute(queryToUpdatebalanceAmount, [calculatedamount, clientId]);

            if (resultbalanceAmount) {

                // console.log("total amount updated")
                res.status(200).json({
                    success: true
                });
            }


        }


    } catch (error) {
        console.error('Error inserting payment:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});


router.post('/getpayments', async (req, res) => {
    try {
        const { id } = req.body; // Extract id from the request body

        if (!id) {
            return res.status(400).json({ message: 'Client ID is required' });
        }

        const query = 'SELECT * FROM client_payments WHERE client_id = ?';

        // console.log("Query:", query);
        // console.log("Client ID:", id);

        // Pass id as an array for parameterized query
        const [results] = await db.execute(query, [id]); // Wrap id in an array

        if (results.length > 0) {
            res.status(200).json(results); // Return the results
        } else {
            res.status(200).json({ message: 'No payment records found' }); // No data found
        }
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Error fetching payments' });
    }
});

router.put('/updateclientpayment', async (req, res) => {
    const {
        client_id,
        clientName,
        address,
        mobileNumber,
        totalAmount,
        agreementValue,
        allPackage,
        ownContribution,
        gst,
        stampDutyRegistration,
        infrastructure,
        advancePaid,
        email,
        balanceAmount,
        infra_Charges
    } = req.body;

    // console.log("req.body", req.body);

    // Prepare the SET part of the query dynamically based on provided values
    let setClause = [];
    let values = [];

    // Check each field, if not null or undefined, add it to the setClause and values
    if (clientName) {
        setClause.push("clientName = ?");
        values.push(clientName);
    }
    if (address) {
        setClause.push("address = ?");
        values.push(address);
    }
    if (mobileNumber) {
        setClause.push("mobileNumber = ?");
        values.push(mobileNumber);
    }
    if (totalAmount) {
        setClause.push("totalAmount = ?");
        values.push(totalAmount);
    }
    if (agreementValue) {
        setClause.push("agreementValue = ?");
        values.push(agreementValue);
    }
    if (allPackage) {
        setClause.push("allPackage = ?");
        values.push(allPackage);
    }
    if (ownContribution) {
        setClause.push("ownContribution = ?");
        values.push(ownContribution);
    }
    if (gst) {
        setClause.push("gst = ?");
        values.push(gst);
    }
    if (stampDutyRegistration) {
        setClause.push("stampDutyRegistration = ?");
        values.push(stampDutyRegistration);
    }
    if (infrastructure) {
        setClause.push("infrastructure = ?");
        values.push(infrastructure);
    }
    if (advancePaid) {
        setClause.push("advancePaid = ?");
        values.push(advancePaid);
    }
    if (email) {
        setClause.push("email = ?");
        values.push(email);
    }
    if (balanceAmount) {
        setClause.push("balanceAmount = ?");
        values.push(balanceAmount);
    }
    if (infra_Charges) {
        setClause.push("infra_Charges = ?");
        values.push(infra_Charges);
    }

    // Check if at least one field has been provided
    if (setClause.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }

    // Add client_id as the last value
    values.push(client_id);

    // Build the final query string
    const query = `
        UPDATE client_payment_details SET 
        ${setClause.join(', ')} 
        WHERE client_id = ?`;

    try {
        const [result] = await db.query(query, values);

        if (result.affectedRows === 0) {
            // console.log("not ok");
            return res.status(404).json({ message: "Client payment not found" });
        }
        // console.log("ok");

        res.status(200).json({ message: "Client payment updated successfully" });
    } catch (error) {
        console.log("not ok", error);

        res.status(500).json({ message: "Error updating client payment" });
    }
});


router.get("/paymentsDetails", async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT 
               * 
            FROM 
                client_payment_details
                ORDER BY id DESC;
        `);

        // Send fetched rows as JSON response
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching loan details:", error);
        res.status(500).json({ error: "Failed to fetch loan details." });
    }
});

// Add new payment details
router.post('/addpayment', async (req, res) => {
    try {
        const { client_id, amount, payment_mode, payment_date, added_by } = req.body;

        // Validate required fields
        if (!client_id || !amount || !payment_mode || !payment_date || !added_by) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const query = `
            INSERT INTO client_payments (client_id, amount, payment_mode, payment_date, added_by, created_at)
            VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `;

        const [result] = await db.execute(query, [client_id, amount, payment_mode, payment_date, added_by]);

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'Payment details added successfully', paymentId: result.insertId });
        } else {
            res.status(500).json({ message: 'Failed to add payment details' });
        }
    } catch (error) {
        console.error('Error adding payment details:', error);
        res.status(500).json({ message: 'Error adding payment details' });
    }
});

// Update loan details - sending the id in the body
router.put('/loan', async (req, res) => {
    const {
        loan_Id,
        clientName,
        address,
        mobileNumber,
        agreementValue,
        totalAmount,
        bankName,
        branchName,
        disbursement,
        email,
        aadharCard,
        pancardNumber,
        city,
        advancePaid
    } = req.body;

    // console.log("req.body", req.body);

    // Ensure that all required fields are provided
    if (!loan_Id || !clientName || !address || !mobileNumber) {
        console.log("Missing required fields")
        return res.status(400).json({ message: "Missing required fields" });
    }

    // Construct the SQL query to update the loan
    const query = `
        UPDATE client_loans
        SET 
            clientName = ?, 
            address = ?, 
            mobileNumber = ?, 
            agreementValue = ?, 
            totalAmount = ?, 
            bankName = ?, 
            branchName = ?, 
            disbursement = ?, 
            email = ?, 
            aadharCard = ?, 
            pancardNumber = ?, 
            city = ?, 
            advancePaid = ?
        WHERE loan_Id = ?
    `;

    const values = [
        clientName,
        address,
        mobileNumber,
        agreementValue,
        totalAmount,
        bankName,
        branchName,
        disbursement,
        email,
        aadharCard,
        pancardNumber,
        city,
        advancePaid,
        loan_Id
    ];

    // Run the query to update the loan
    const [results] = await db.execute(query, values);

    if (results) {
        res.status(201).json({ success: true, message: 'details update successfully' });

    }
    else {
        res.status(201).json({ success: false, message: 'error while  update details' });


    }


});


router.get("/loan", async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT 
               * 
            FROM 
                client_loans
                ORDER BY loan_Id DESC;
        `);

        // Send fetched rows as JSON response
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching loan details:", error);
        res.status(500).json({ error: "Failed to fetch loan details." });
    }
});


router.post('/addClient', async (req, res) => {
    // Destructure the incoming request body
    const {
        clientName, address, district, taluka, pincode, age, occupation,
        bookingDate, dateOfBirth, anniversaryDate, parentProperty, propertyName,
        propertyDescription, totalPrice, advancePaid, paymentMode, remainingAmount,
        sansaction, mobileNumber, email, aadharCard, pancardNumber,
        coApplicantName, coApplicantMobile, coApplicantEmail, coApplicantAadharCard,
        coApplicantPancardNumber, coApplicantAddress
    } = req.body;

    // Log the received data for debugging
    // console.log("Received Data:", req.body);

    // Ensure all required fields are received
    // if (!clientName || !mobileNumber) {
    //     return res.status(400).json({ error: 'Client name and mobile number are required.' });
    // }

    try {
        // Insert the client data into the database
        const [result] = await db.execute(
            `INSERT INTO client_master (
                clientName, address, district, taluka, pincode, age, occupation,
                bookingDate, dateOfBirth, anniversaryDate, parentProperty, propertyName,
                propertyDescription, totalPrice, advancePaid, paymentMode, remainingAmount,
                sansaction, mobileNumber, email, aadharCard, pancardNumber,
                coApplicantName, coApplicantMobile, coApplicantEmail, coApplicantAadharCard,
                coApplicantPancardNumber, coApplicantAddress
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
            [
                clientName, address, district, taluka, pincode, age, occupation,
                bookingDate, dateOfBirth, anniversaryDate, parentProperty, propertyName,
                propertyDescription, totalPrice, advancePaid, paymentMode, remainingAmount,
                sansaction, mobileNumber, email, aadharCard, pancardNumber,
                coApplicantName, coApplicantMobile, coApplicantEmail, coApplicantAadharCard,
                coApplicantPancardNumber, coApplicantAddress
            ]
        );

        if (result) {
            // console.log("result ", result)
            const query = `
            INSERT INTO client_loans (
                client_id, clientName, address,advancePaid, mobileNumber, email, aadharCard, pancardNumber
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

            const values = [result.insertId, clientName, address, advancePaid, mobileNumber, email, aadharCard, pancardNumber,]

            try {
                // console.log("query ", query);
                // console.log("values ", values);
                const [results] = await db.execute(query, values);
                if (results) {
                    // console.log("check 1")


                    const query1 = `
                    INSERT INTO client_booking_master (
                        client_id, clientName, address, mobileNumber, email, aadharCard, pancardNumber, parentProperty, propertyDescription, propertyName, bookingDate, totalCost,  bookingTokenAmount, paymentMode
                    ) VALUES (?, ?, ?, ?, ?, ?,?,?,?, ?, ?, ?, ?,?)
                `;
                    const values1 = [result.insertId, clientName, address, mobileNumber, email, aadharCard, pancardNumber, parentProperty, propertyDescription, propertyName, bookingDate, totalPrice, advancePaid, paymentMode]


                    const [clientresults1] = await db.execute(query1, values1);


                    ///////////////////////////////////
                    if (clientresults1) {
                        const query2 = `
                    INSERT INTO client_payment_details (
                        client_id, clientName, address,advancePaid, mobileNumber, email,totalAmount,balanceAmount
                    ) VALUES (?, ?, ?, ?, ?, ?,?,?)
                `;
                        const values2 = [result.insertId, clientName, address, advancePaid, mobileNumber, email, totalPrice, totalPrice]
                        try {

                            const [clientresults] = await db.execute(query2, values2);
                            if (clientresults) {

                                res.status(201).json({ success: true, message: 'Client added successfully', clientId: result.insertId });

                            }
                        }
                        catch (error) {
                            console.log("error ", error)
                            res.status(500).json({ success: false, error: 'Failed to add client' });

                        }
                    }
                }
                else {
                    res.status(500).json({ success: false, error: 'Failed to add client' });

                    console.log("error")
                }
            }
            catch (error) {
                res.status(500).json({ success: false, error: 'Failed to add client' });

                console.log("error", error)
            }
        }
        else {
            console.log("error ")
        }
        // Respond with success
    } catch (error) {
        console.error('Error adding client:', error);
        res.status(500).json({ success: false, error: 'Failed to add client' });
    }
});


router.get('/getclients', async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM client_master ORDER BY client_id DESC;");
        res.status(200).json({ success: true, clients: rows });
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).json({ success: false, error: "Failed to fetch clients" });
    }
});


router.put('/updateclient/:clientId', (req, res) => {
    const clientId = req.params.clientId;
    const updatedClient = req.body; // This contains the updated client data

    // console.log("clientId", clientId);
    // console.log("updatedClient data:", updatedClient);

    // Prepare the fields to update, but only those that are not null or undefined
    const updateFields = [];
    const updateValues = [];

    // Dynamically construct the query based on the provided updated data
    for (const [key, value] of Object.entries(updatedClient)) {
        if (value != null) {
            updateFields.push(`${key} = ?`);
            updateValues.push(value);
        }
    }

    // If no valid data to update, return an error
    if (updateFields.length === 0) {
        return res.status(400).json({ success: false, message: 'No valid data to update.' });
    }

    // Add the clientId to the end of the updateValues array
    updateValues.push(clientId);

    // Create the SQL query
    const sqlQuery = `
        UPDATE client_master 
        SET ${updateFields.join(', ')} 
        WHERE client_id = ?
    `;

    // Execute the query
    db.query(sqlQuery, updateValues, (err, result) => {
        if (err) {
            console.error('Error updating client:', err);
            return res.status(500).json({ success: false, message: 'Error updating client details' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: 'Client not found' });
        }

        return res.status(200).json({ success: true, message: 'Client details updated successfully' });
    });
});


router.get('/getclientsdate', async (req, res) => {
    const sqlQuery = `
        SELECT client_id, clientName, dateOfBirth, anniversaryDate, email, mobileNumber 
        FROM client_master ORDER BY client_id DESC;
    `;

    try {
        const [results] = await db.execute(sqlQuery); // Using execute for safer queries
        res.status(200).json({ success: true, data: results });
    } catch (err) {
        console.error('Error fetching client data:', err);
        res.status(500).json({ success: false, message: 'Error fetching client data' });
    }
});


router.post('/sendWish', async (req, res) => {
    const { email, clientName, mobileNumber, message, eventType } = req.body;

    if (!email || !clientName || !message || !eventType) {
        // console.log(" email, clientName, mobileNumber, message", email, clientName, mobileNumber, message)
        return res.status(400).json({ success: false, message: 'Email, client,eventType, name, and message are required.' });
    }
    try {
        // Call the handler to send the email
        // console.log(" eventType", eventType)
        if (eventType === "birthday") {
            await sendBirthdayWishEmail(email, clientName, message);
            // console.log(" birthday Wishes  sent successfully!", eventType)
            return res.status(200).json({ success: true, message: 'birthday Wishes  sent successfully!' });
        } else
            if (eventType === "anniversary") {
                await sendAnniversaryWishEmail(email, clientName, message)
                // console.log(" anniversary Wishes sent successfully!", eventType)

                return res.status(200).json({ success: true, message: 'anniversary Wishes sent successfully!' });

            }
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send wishes.' });
    }
});




router.get("/getcpusers", async (req, res) => {
    try {
        console.log("inside cp user")
        const query = `
    SELECT * 
    FROM cp_user
    ORDER BY id DESC;
`;

        const [rows] = await db.execute(query);
        res.json({ success: true, cp_users: rows });

    } catch (error) {
        console.error("Error fetching cp_user_data details:", error);
        res.status(500).json({ error: "Failed to fetch cp_user_data details." });
    }
});


router.get("/getcppaymentdetails/:id", async (req, res) => {
    try {
        const { id } = req.params;

        console.log("Fetching payment details for ID:", id);

        const [rows] = await db.execute("SELECT * FROM cp_payments WHERE cpid = ?", [id]);

        if (rows.length > 0) {
            // console.log("Data:", rows);
            res.status(200).json({ success: true, payments: rows }); // Changed from paymentDetails to payments

        } 
        else if (rows.length == 0) {
            res.status(200).json({ success: true, payments: rows }); // Changed from paymentDetails to payments
        }
        else {
            console.log("rows", rows)
            res.status(201).json({ success: false, message: "No payment details found" });
        }
    } catch (error) {
        console.error("Error fetching payment details:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


router.post("/addcppayment", async (req, res) => {
    try {


        const { cpid, amount, date, payment_mode, description, propertyname, clientname } = req.body;


        if (!cpid || !amount || !date || !payment_mode || !description || !propertyname || !clientname) {

            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        await db.query("INSERT INTO cp_payments (cpid, amount, date, payment_mode, description, propertyname, clientname) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [cpid, amount, date, payment_mode, description, propertyname, clientname]);

        res.json({ success: true, message: "Payment added successfully!" });
    } catch (error) {
        console.error("Error adding payment:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});

router.post("/createChannelPartner", async (req, res) => {
    const { name, address, company_name, phone } = req.body;

    if (!name || !address || !phone) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const query = "INSERT INTO cp_user (name, address, company_name, phone) VALUES (?, ?, ?, ?)";
        const [result] = await db.execute(query, [name, address, company_name, phone]);

        res.status(201).json({
            success: true,
            message: "Channel Partner added successfully",
            data: result,
        });
    } catch (err) {
        console.error("Error inserting data:", err);
        res.status(500).json({ success: false, message: "Database error" });
    }
});


module.exports = router;