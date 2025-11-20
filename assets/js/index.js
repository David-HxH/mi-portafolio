$(function () {
  const $contactForm = $("#contactForm");
  const $inputName = $("#contactInputName");
  const $inputEmail = $("#contactInputEmail");
  const $inputMsg = $("#contactTextArea");
  const $divResults = $("#div-resultsForm");
  const $btnSend = $("#BTN-contactSend");
  const $btnReset = $('button[type="reset"]');

  function showAlert(type, message) {
    // detener animaciones previas, ocultar, cambiar contenido y aparecer con fade
    $divResults
      .stop(true, true)
      .hide()
      .html(
        `
      <div class="alert alert-${type}" role="alert">
        ${message}
      </div>
    `
      )
      .fadeIn(250);
  }

  // Oculta y limpia el div de resultados
  function clearAlert() {
    $divResults.stop(true, true).fadeOut(200, function () {
      $(this).html("");
    });
  }

  // Animación shake visible
  function shakeForm() {
    $contactForm
      .animate({ left: "-10px" }, 80)
      .animate({ left: "10px" }, 80)
      .animate({ left: "-5px" }, 60)
      .animate({ left: "5px" }, 60)
      .animate({ left: "0px" }, 60);
  }

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
      shakeForm();
      showAlert("danger", "Error: Todos los campos son obligatorios.");

      $btnSend
        .removeClass("btn-success")
        .addClass("btn-primary")
        .html(`<i class="bi bi-send"></i> Enviar`)
        .prop("disabled", false);

      return;
    }

    // Validación de email
    if (!isValidEmail(emailValue)) {
      shakeForm();
      showAlert("danger", "Error: Ingresa un email válido.");
      return;
    }

    // Mensaje de éxito (fade in)
    showAlert(
      "success",
      `Gracias por tu mensaje, <strong>${nameValue}</strong>. ¡Lo hemos recibido correctamente!`
    );

    // Modo enviado
    $btnSend
      .removeClass("btn-primary")
      .addClass("btn-success")
      .html(`<i class="bi bi-check-circle"></i> Enviado`)
      .prop("disabled", true);

    $contactForm.trigger("reset");
  });

  // --- Botón LIMPIAR: restaura estado de enviar y limpia mensajes ---
  $btnReset.on("click", function () {
    $btnSend
      .removeClass("btn-success")
      .addClass("btn-primary")
      .html(`<i class="bi bi-send"></i> Enviar`)
      .prop("disabled", false);

    // Limpiar mensajes con fade
    clearAlert();
  });

  // Smooth Scroll SOLO para links del menú
  $('.navbar a[href^="#"]').on("click", function (event) {
    const destino = $(this.getAttribute("href"));

    if (this.getAttribute("href") === "#") return;

    if (destino.length) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: destino.offset().top,
        },
        700,
        "swing"
      );
    }

    // Cerrar el navbar si está abierto (modo móvil)
    const navbarCollapse = $("#navbarNavAltMarkup");

    if (navbarCollapse.hasClass("show")) {
      const bsCollapse = bootstrap.Collapse.getInstance(
        document.getElementById("navbarNavAltMarkup")
      );
      bsCollapse.hide();
    }
  });
});
