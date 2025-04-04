const express = require('express');
const router = express.Router();

const db = require('../db')













router.post('/add-booking', async (req, res) => {

    // console.log("inside add-booking")
    const { count, date, propertyName, clientName, price, month, book_by, id } = req.body;

    // console.log("data ==>  ", count, date, propertyName, clientName, price, month, book_by, id)
    const query = `
        INSERT INTO booking_master (count, date, property_name, client_name, price, month, book_by,staff_id)
        VALUES (?, ?, ?, ?, ?, ?, ?,?)
    `;
    const results = await db.query(query, [count, date, propertyName, clientName, price, month, book_by, id])
    // console.log("booking details  ==> ", results[0].insertId)
    const insertedId = results[0].insertId; // Extract the count
    res.status(201).json({ insertedId }); // Send the count as a JSON response
    // console.log('store booking details  successfully');

});

router.post('/get-bookings', async (req, res) => {

    const { id } = req.body;

    console.log("id ", id)
    let query;

    if (id) {
        query = `SELECT * FROM booking_master WHERE staff_id = ${id} ORDER BY id DESC`;

    }
    else {

        query = 'SELECT * FROM booking_master';
    }


    try {
        const [rows] = await db.query(query); // Execute the query
        // console.log("result ==> ", rows);


        // Format the `date` field for each row
        const formattedRows = rows.map(row => {
            const formattedDate = row.date ? new Date(row.date).toLocaleDateString('en-GB') : null; // Handle null/undefined dates
            return {
                ...row,
                date: formattedDate
            };
        });

        res.status(200).json(formattedRows); // Send all formatted rows
        // console.log('Fetched bookings successfully');

    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

router.post('/get-visits', async (req, res) => {

    const { id } = req.body;
    let query;
    if (id) {
        query = `SELECT * FROM visits_master WHERE staff_id = ${id} ORDER BY id DESC`;
    }
    else {

        res.status(500).json({ error: 'Failed to fetch visites' });
    }


    try {
        const [rows] = await db.query(query); // Execute the query
        // console.log("result ==> ", rows);


        // Format the `date` field for each row
        const formattedRows = rows.map(row => {
            const formattedDate = row.visit_date ? new Date(row.visit_date).toLocaleDateString('en-GB') : null; // Handle null/undefined dates
          
            return {
                ...row,
                date: formattedDate
            };
        });

        res.status(200).json(formattedRows); // Send all formatted rows
        // console.log('Fetched visites successfully');

    } catch (error) {
        console.error('Error fetching visites:', error);
        res.status(500).json({ error: 'Failed to fetch visites' });
    }
});




router.post('/getvisits', async (req, res) => {
    try {
        const { followup_by } = req.body;  // Get the user ID from the request body
        console.log("followup_by ==> ", followup_by)
        if (!followup_by) {
            return res.status(400).json({ error: 'Staff name is required' });
        }

        // Query for visits belonging only to the given staff ID
        const [rows] = await db.execute(
            `SELECT * FROM lead_descriptions WHERE followup_by = ? ORDER BY created_at ASC`,
            [followup_by] // Pass the staff_id dynamically
        );

        // Format the visit_date for each entry
        const formattedRows = rows.map(row => {
            const formattedDate = row.expected_visit_date ? new Date(row.expected_visit_date).toLocaleDateString('en-GB') : null;
            return {
                ...row,
                visit_date: formattedDate // Ensure consistent date formatting
            };
        });

        res.status(200).json(formattedRows);
    } catch (error) {
        console.error('Error fetching visits:', error);
        res.status(500).json({ error: 'Failed to fetch visits data' });
    }
});

// Route to add a new visit
router.post('/addvisits', async (req, res) => {
    const { visitorName, visitDate, purpose, followupBy, id, propertyname } = req.body;


    if (!visitorName || !visitDate || !purpose || !followupBy || !id) {

        // console.log("visitorName, visitDate, purpose, followupBy, id", visitorName, visitDate, purpose, followupBy, id)
        return res.status(400).json({ error: 'All fields are required' });
    }

    const visitMonth = new Date(visitDate).toLocaleString('default', { month: 'long' });

    try {
        const [result] = await db.execute(
            'INSERT INTO visits_master (visitor_name, visit_date, purpose, followup_by, month, propertyname, staff_id) VALUES (?, ?, ?, ?, ?, ?,?)',
            [visitorName, visitDate, purpose, followupBy, visitMonth, propertyname, id]
        );
        res.status(201).json({ message: 'Visit added successfully', visitId: result.insertId });
    } catch (error) {
        console.error('Error adding visit:', error);
        res.status(500).json({ error: 'Failed to add visit' });
    }
});

router.delete('/deletevisit/:visitId', async (req, res) => {
    const { visitId } = req.params;  // Getting visitId from the URL parameter
    console.log("Deleting visit with ID:", visitId); // Debugging line

    if (!visitId) {
        return res.status(400).json({ error: 'Visit ID is required' });
    }

    try {
        // Use db.execute for deleting a visit
        const [result] = await db.execute('DELETE FROM visits_master WHERE id = ?', [visitId]);

        // Check if any rows were deleted
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Visit not found' });
        }

        // Respond with success
        console.log("Visit deleted successfully:", visitId); // Debugging line
        res.status(200).json({ message: 'Visit deleted successfully' });
    } catch (error) {
        console.error('Error deleting visit:', error);
        res.status(500).json({ error: 'Failed to delete visit' });
    }
});

router.get("/attendance/:user_id/:date", (req, res) => {
    const { user_id, date } = req.params;

    if (!user_id || !date) {
        return res.status(400).json({ success: false, message: "User ID and Date are required." });
    }

    const sql = "SELECT status FROM employee_attendance WHERE user_id = ? AND date = ?";

    db.query(sql, [user_id, date], (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }

        if (results.length === 0) {
            return res.json({ success: true, statuses: [] }); // No attendance marked yet
        }

        // Extract statuses from results
        const statuses = results.map((row) => row.status);

        return res.json({ success: true, statuses });
    });
});


router.post('/addattendance', async (req, res) => {
    const { user_id, name, status, date, time, latitude, longitude, address } = req.body;

    if (!user_id || !name || !status || !date || !time || !latitude || !longitude || !address) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO employee_attendance (user_id, name, status, date, time, latitude, longitude, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [user_id, name, status, date, time, latitude, longitude, address]
        );
        res.status(201).json({ message: 'Attendance marked successfully!', attendanceId: result.insertId });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ error: 'Failed to mark attendance' });
    }
});


router.put("/updateLead", async (req, res) => {
    const {
      id,
      fullName,
      emailId,
      contactNumber,
      area,
      // add more fields as per your `leads` table
    } = req.body.data;
  
    // console.log("   id,fullName, emailId,contactNumber, area", req.body.data)
    if (!id) {
      return res.status(400).json({ message: "Lead ID is required." });
    }
  
    try {
      const updateQuery = `
        UPDATE leads
        SET fullName = ?, emailId = ?, contactNumber = ?, area = ?
        WHERE id = ?
      `;
  
      await db.execute(updateQuery, [fullName, emailId, contactNumber, area, id]);
  
      res.status(200).json({ message: "Lead details updated successfully." });
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).json({ message: "Error updating lead." });
    }
  });


module.exports = router;



