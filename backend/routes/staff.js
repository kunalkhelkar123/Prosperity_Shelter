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
        query = `SELECT * FROM booking_master WHERE staff_id = ${id}`;

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

router.post('/getvisits', async (req, res) => {
    try {
        const { id } = req.body;  // Get the user ID from the request body
        console.log("idd ==> ", id)
        if (!id) {
            return res.status(400).json({ error: 'Staff ID is required' });
        }

        // Query for visits belonging only to the given staff ID
        const [rows] = await db.execute(
            `SELECT * FROM visits_master WHERE staff_id = ? ORDER BY created_at ASC`,
            [id] // Pass the staff_id dynamically
        );

        // Format the visit_date for each entry
        const formattedRows = rows.map(row => {
            const formattedDate = row.visit_date ? new Date(row.visit_date).toLocaleDateString('en-GB') : null;
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
    const { visitorName, visitDate, purpose, followupBy, id } = req.body;

    if (!visitorName || !visitDate || !purpose || !followupBy || !id) {

        // console.log("visitorName, visitDate, purpose, followupBy, id", visitorName, visitDate, purpose, followupBy, id)
        return res.status(400).json({ error: 'All fields are required' });
    }

    const visitMonth = new Date(visitDate).toLocaleString('default', { month: 'long' });

    try {
        const [result] = await db.execute(
            'INSERT INTO visits_master (visitor_name, visit_date, purpose, followup_by, month, staff_id) VALUES (?, ?, ?, ?, ?, ?)',
            [visitorName, visitDate, purpose, followupBy, visitMonth, id]
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






module.exports = router;



