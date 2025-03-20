const nodemailer = require('nodemailer');

const sendAnniversaryWishEmail = async (email, clientName, message) => {
    try {
        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Replace with your email service provider (e.g., Gmail, Outlook)
            auth: {
                user: 'kunalkhelkar123@gmail.com', // Replace with your email
                pass: 'kzfp gofh ling sbgp', // Replace with your email password or app-specific password
            },
        });

        // Construct the email
        const mailOptions = {
            from: '"homigrow@gmail.com', // Replace with your email
            to: email,
            subject: `Wishing You a Wonderful Birthday!`,
            text: `Dear ${clientName},\n\n${message}\n\nBest Regards,\nHomi Grow Team`,
            html: `<p>Dear <strong>${clientName}</strong>,</p><p>${message}</p><p>Best Regards,<br>Homi Grow Team</p>`,
        };

        // // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error in sendWishEmail:', error);
        throw new Error('Failed to send email');
    }
};

module.exports = sendAnniversaryWishEmail;
