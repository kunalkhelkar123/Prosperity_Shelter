const express = require('express');
const router = express.Router();

const db = require('../db')


router.post('/adddailyscrum', async (req, res) => {
    const { description, date,name} = req.body;

    // Validation for description and date
    if (!description || !date || !name) {
        return res.status(400).json({ message: 'Description and date are required' });
    }

    try {
        const query = 'INSERT INTO dailyscrums_master (description, date,name) VALUES (?, ?,?)';
        const [result] = await db.execute(query, [description, date,name]);

        if (result.affectedRows > 0) {
            return res.status(200).json({ message: 'Daily scrum added successfully' });
        } else {
            return res.status(500).json({ message: 'Failed to add scrum' });
        }
    } catch (error) {
        console.error('Error adding scrum:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/getdailyscrum', async (req, res) => {
    try {
        const query = 'SELECT * FROM dailyscrums_master ORDER BY created_at DESC';
        const [scrums] = await db.execute(query);

        return res.status(200).json(scrums);
    } catch (error) {
        console.error('Error fetching scrums:', error);
        return res.status(500).json({ message: 'Failed to load scrums' });
    }
});








module.exports = router;