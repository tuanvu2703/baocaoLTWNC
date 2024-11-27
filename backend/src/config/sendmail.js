import nodemailer from 'nodemailer';

const sendMail = async (email, html) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,  
        auth: {
            user: process.env.EMAIL,
            pass: process.env.APP_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: '"NEMO SHOP👻" <no-reply@tienyeuai2200@gmail.com>',
            to: email,
            subject: "OTP USE TO RESET PASSWORD ✔",
            text: "Please do not share this OTP with anyone",
            html: html,
        });

        console.log(`Message sent: ${info.messageId}`);
        console.log(`Email sent successfully to: ${email}`);
        return info;
    } catch (error) {
        console.error(`Error sending email to ${email}: ${error}`);
    }
};

export { sendMail };
