document.addEventListener('DOMContentLoaded', () => {

    const contactForm = document.getElementById("contactForm");
    const inputName = document.getElementById("contactInputName");
    const inputEmail = document.getElementById("contactInputEmail");
    const inputMessage = document.getElementById("contactTextArea");
    const divResults = document.getElementById("div-resultsForm");
    const btnSend = document.getElementById("BTN-contactSend");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); 

        // Obtener valores de los campos del formulario
        const nameValue = inputName.value.trim();
        const emailValue = inputEmail.value.trim();
        const messageValue = inputMessage.value.trim();

        // Validación de campos vacíos 
        if (nameValue === "" || emailValue === "" || messageValue === "") {

            // Mostrar mensaje de error usando innerHTML 
            divResults.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Error: Todos los campos son obligatorios.
                </div>
            `;

            // Restaurar botón al estado original
            btnSend.classList.remove("btn-success");
            btnSend.classList.add("btn-primary");
            btnSend.innerHTML = `<i class="bi bi-send"></i> Enviar`;
            btnSend.disabled = false;

            return;
        }

        // Mensaje de éxito usando innerHTML 
        divResults.innerHTML = `
            <div class="alert alert-success" role="alert">
                Gracias por tu mensaje, <strong>${nameValue}</strong>. ¡Lo hemos recibido correctamente!
            </div>
        `;

        // Cambiar el botón a "Enviado" + success
        btnSend.classList.remove("btn-primary");
        btnSend.classList.add("btn-success");
        btnSend.innerHTML = `<i class="bi bi-check-circle"></i> Enviado`;
        btnSend.disabled = true;

        // Limpiar formulario
        contactForm.reset();
    });

});
