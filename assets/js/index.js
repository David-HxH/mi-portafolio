$(function () {
  const $contactForm = $("#contactForm");
  const $inputName = $("#contactInputName");
  const $inputEmail = $("#contactInputEmail");
  const $inputMsg = $("#contactTextArea");
  const $divResults = $("#div-resultsForm");
  const $btnSend = $("#BTN-contactSend");

  function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  // --- Validación del formulario ---
  $contactForm.on("submit", function (event) {
    event.preventDefault();

    const nameValue = $inputName.val().trim();
    const emailValue = $inputEmail.val().trim();
    const messageValue = $inputMsg.val().trim();

    // Validación simple
    if (nameValue === "" || emailValue === "" || messageValue === "") {
      $divResults.html(`
                <div class="alert alert-danger" role="alert">
                    Error: Todos los campos son obligatorios.
                </div>
            `);

      $btnSend
        .removeClass("btn-success")
        .addClass("btn-primary")
        .html(`<i class="bi bi-send"></i> Enviar`)
        .prop("disabled", false);

      return;
    }

    // 💡 Validación de email
    if (!isValidEmail(emailValue)) {
      $divResults.html(`
                <div class="alert alert-danger" role="alert">
                    Error: Ingresa un email válido.
                </div>
            `);

      return;
    }

    // Mensaje de éxito
    $divResults.html(`
            <div class="alert alert-success" role="alert">
                Gracias por tu mensaje, <strong>${nameValue}</strong>. ¡Lo hemos recibido correctamente!
            </div>
        `);

    // Modo enviado
    $btnSend
      .removeClass("btn-primary")
      .addClass("btn-success")
      .html(`<i class="bi bi-check-circle"></i> Enviado`)
      .prop("disabled", true);

    $contactForm.trigger("reset");
  });

  // Smooth Scroll SOLO para enlaces del menú
  $('.navbar a[href^="#"]').on("click", function (event) {
    const destino = $(this.getAttribute("href"));

    if (this.getAttribute("href") === "#") return;

    if (destino.length) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: destino.offset().top,
        },
        800,
        "swing"
      );
    }
  });
});
