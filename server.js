require("dotenv").config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Cargado" : "No cargado");


const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());


// Servir init.html primero cuando se acceda a "/"
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "init.html"));
});

// Nueva ruta "/benjaminontiveros" que carga index.html sin mostrar "index.html" en la URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 🔹 Luego, servir los archivos estáticos
app.use(express.static("public", { extensions: ["html"] }));

// Configuración de Nodemailer con variables de entorno
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

// Ruta para enviar correos con logs de depuración
app.post("/enviar-correo", (req, res) => {
    const { nombre, email, mensaje } = req.body;

    console.log(" Datos recibidos en el servidor:");
    console.log("Nombre:", nombre);
    console.log("Email:", email);
    console.log("Mensaje:", mensaje);

    if (!nombre || !email || !mensaje) {
        console.error("⚠️ Error: Falta información en la solicitud");
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER, // Usar el email configurado en las variables de entorno
        to: "benjaminontiveros35@gmail.com",
        subject: "Nuevo mensaje de contacto",
        text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("⚠️ Error al enviar el correo:", error);
            return res.status(500).json({ error: error.message });
        }
        console.log(" Correo enviado con éxito:", info.response);
        res.status(200).json({ message: "Correo enviado con éxito" });
    });
});

transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Error en la conexión con Gmail:", error);
    } else {
        console.log("✅ Servidor de correo listo para enviar mensajes.");
    }
});



async function enviarCorreoPrueba() {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "benjaminontiveros35@gmail.com",
            subject: "Correo de prueba",
            text: "Este es un correo de prueba desde el servidor."
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("📨 Correo de prueba enviado con éxito:", info.response);
    } catch (error) {
        console.error("❌ Error al enviar correo de prueba:", error);
    }
}

// Ejecutar prueba al iniciar el servidor
enviarCorreoPrueba();


// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
