document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault(); // Evita el envío normal

            const formData = new FormData(form);
            const data = {
                nombre: formData.get("nombre"),
                email: formData.get("email"),
                mensaje: formData.get("mensaje")
            };

            console.log("📩 Enviando datos:", data); // Verifica en la consola que los datos están bien

            try {
                const response = await fetch("http://localhost:5000/enviar-correo", {  // 🔹 Cambia la URL
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error("Error en la respuesta del servidor");
                }

                const result = await response.json();
                console.log("✅ Respuesta del servidor:", result);

                formMessage.textContent = "✅ Mensaje enviado con éxito";
                formMessage.classList.add("text-green-600");
                form.reset(); // Limpia el formulario
            } catch (error) {
                console.error("❌ Error al enviar:", error);
                formMessage.textContent = "❌ Hubo un problema al enviar el mensaje";
                formMessage.classList.add("text-red-600");
            }
        });
    } else {
        console.error("⚠️ No se encontró el formulario con ID 'contactForm'");
    }
});
