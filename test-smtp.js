require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // false para 587, true para 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "benjaminontiveros35@gmail.com",
    subject: "🚀 Prueba de correo con Nodemailer",
    text: "¡Hola! Este es un correo de prueba enviado desde Node.js con una Contraseña de Aplicación."
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("❌ Error al enviar el correo:", error);
    } else {
        console.log("✅ Correo enviado con éxito:", info.response);
    }
    
});
