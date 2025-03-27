const express = require('express');
const router = express.Router();

const db = require('../db');    


router.get('/getvisits', async (req, res) => {
    try {
        // Fetch all visits
        const [rows] = await db.execute(
        `SELECT * FROM lead_descriptions WHERE expected_visit_date IS NOT NULL ORDER BY created_at ASC;
`
        );

        // Format the visit_date for each entry
        const formattedRows = rows.map(row => {
            const formattedDate = row.expected_visit_date
                ? new Date(row.expected_visit_date).toLocaleDateString('en-GB')
                : null;
            return {
                ...row,
                visit_date: formattedDate, // Ensure consistent date formatting
            };
        });
        // console.log("rows ", formattedRows)

        res.status(200).json(formattedRows);
    } catch (error) {
        console.error('Error fetching visits:', error);
        res.status(500).json({ error: 'Failed to fetch visits data' });
    }
});





////////////////////////////////////////////////
// Updated route: Fetch all visits






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

router.post('/updateAttend', async (req, res) => {
    const { visiteId, attend } = req.body;

    console.log("check",visiteId, attend)
    // Check if visiteId and attend are provided
    // if (!visiteId && (attend == "false")) {
    //     console.log("failed")
    //     return res.status(400).json({ message: 'Missing or invalid data' });
    // }

    try {
        // Query to update the 'attend' column in the database
        const updateQuery = 'UPDATE lead_descriptions SET attend = ? WHERE id = ?';

        // Execute the query to update the attend status

        console.log("updateQuery ",updateQuery )
        console.log(" attend, visiteId",attend, visiteId )

        const [result] = await db.execute(updateQuery, [attend, visiteId]);

        console.log(" result",result)

        // Check if the row was updated
        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Attend status updated successfully' });
        } else {
            return res.status(404).json({ message: 'Visit not found' });
        }
    } catch (error) {
        console.error('Error updating attend status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;