const scriptUrl =
  "https://script.google.com/macros/s/AKfycbw7074u4ndayDA1X_uPIBMAneuBTXsnDJI_LCORP_jpb48LcWSCjgzgcjD_5hrWWXOS/exec";

const form = document.forms["cooperadora-form"];
const tabs = document.querySelectorAll(".tab");
const movementType = document.getElementById("movementType");
const concepto = document.getElementById("concepto");
const otroConcepto = document.getElementById("otroConcepto");
const otroConceptoField = document.getElementById("otroConceptoField");
const comprobante = document.getElementById("comprobante");
const razonSocial = document.getElementById("razonSocial");
const conceptoSalida = document.getElementById("conceptoSalida");
const monto = document.getElementById("monto");
const submitButton = form.querySelector(".submit");

function setRequired(fields, required) {
  fields.forEach((field) => {
    field.required = required;
    if (!required) field.value = "";
  });
}

function updateOtherConcept() {
  const isOther = concepto.value === "Otros";
  otroConceptoField.classList.toggle("hidden", !isOther);
  otroConcepto.required = isOther;
  if (!isOther) otroConcepto.value = "";
}

function setActiveTab(tabName) {
  const isEntrada = tabName === "entrada";

  tabs.forEach((tab) => {
    const active = tab.dataset.tab === tabName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  document.querySelectorAll(".entrada-field, .entrada-copy").forEach((item) => {
    item.classList.toggle("hidden", !isEntrada);
  });

  document.querySelectorAll(".salida-field, .salida-copy").forEach((item) => {
    item.classList.toggle("hidden", isEntrada);
  });

  movementType.value = isEntrada ? "Entrada" : "Salida";
  submitButton.textContent = isEntrada
    ? "Registrar entrada"
    : "Registrar salida";
  submitButton.classList.toggle("income-submit", isEntrada);
  submitButton.classList.toggle("expense-submit", !isEntrada);

  setRequired([concepto], isEntrada);
  setRequired([comprobante, razonSocial, conceptoSalida], !isEntrada);
  updateOtherConcept();
}

function getTodayForSheet() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function buildSheetPayload() {
  const isEntrada = movementType.value === "Entrada";
  const conceptoFinal =
    isEntrada && concepto.value === "Otros"
      ? otroConcepto.value
      : isEntrada
        ? concepto.value
        : conceptoSalida.value;

  const payload = new FormData();
  payload.append("fecha", getTodayForSheet());
  payload.append("comprobante", isEntrada ? "recibo" : comprobante.value);
  payload.append("razon social", isEntrada ? "Instituto" : razonSocial.value);
  payload.append("Concepto", conceptoFinal);
  payload.append("entrada", isEntrada ? monto.value : "");
  payload.append("salida", isEntrada ? "" : monto.value);

  return payload;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

concepto.addEventListener("change", updateOtherConcept);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitButton.disabled = true;
  submitButton.textContent = "Enviando...";

  try {
    await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      body: buildSheetPayload(),
    });

    await Swal.fire({
      title: "Movimiento registrado",
      text: "La información fue enviada correctamente.",
      icon: "success",
    });

    form.reset();
    setActiveTab("entrada");
  } catch (error) {
    console.error("Error", error);

    Swal.fire({
      title: "No se pudo enviar",
      text: "Revisá la URL publicada de Apps Script e intentá de nuevo.",
      icon: "error",
    });
  } finally {
    submitButton.disabled = false;
    submitButton.textContent =
      movementType.value === "Entrada"
        ? "Registrar entrada"
        : "Registrar salida";
  }
});

setActiveTab("entrada");
