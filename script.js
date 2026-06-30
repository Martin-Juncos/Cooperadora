const GOOGLE_CLIENT_ID =
  "479787254850-3pect6imgqpi8c8opmjlhj90o6es97pe.apps.googleusercontent.com";
const SESSION_KEY = "cooperadora.googleUser";
const scriptUrl =
  "https://script.google.com/macros/s/AKfycbw7074u4ndayDA1X_uPIBMAneuBTXsnDJI_LCORP_jpb48LcWSCjgzgcjD_5hrWWXOS/exec";
const ALLOWED_EMAILS = new Set([
  "prof.mcjuncos@gmail.com",
  "modo.beta.developer@gmail.com",
  "josexeneise12@gmail.com",
  "lela29q@gmail.com",
  "clauce80.cz@gmail.com",
  "cfjuncos2001@gmail.com",
]);
const SUMMARY_ALLOWED_EMAILS = new Set([
  "prof.mcjuncos@gmail.com",
  "josexeneise12@gmail.com",
  "lela29q@gmail.com",
]);

const loginView = document.getElementById("loginView");
const appView = document.getElementById("appView");
const loginHelp = document.getElementById("loginHelp");
const metricsPanel = document.getElementById("metricsPanel");
const metricsCards = document.getElementById("metricsCards");
const metricsStatus = document.getElementById("metricsStatus");
const confirmSummaryButton = document.getElementById("confirmSummaryButton");
const userPicture = document.getElementById("userPicture");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const logoutButton = document.getElementById("logoutButton");
const form = document.forms["cooperadora-form"];
const tabsNav = document.querySelector(".tabs");
const tabs = document.querySelectorAll(".tab");
const summaryTab = document.querySelector(".summary-tab");
const movementType = document.getElementById("movementType");
const formContext = document.getElementById("formContext");
const paymentTypeSwitch = document.getElementById("paymentTypeSwitch");
const concepto = document.getElementById("concepto");
const otroConcepto = document.getElementById("otroConcepto");
const otroConceptoField = document.getElementById("otroConceptoField");
const comprobante = document.getElementById("comprobante");
const fechaSalida = document.getElementById("fechaSalida");
const razonSocial = document.getElementById("razonSocial");
const conceptoSalida = document.getElementById("conceptoSalida");
const monto = document.getElementById("monto");
const submitButton = form.querySelector(".submit");

const BIBLIOTECA_CONCEPTS = new Set([
  "Inscripciones",
  "Cooperadora libreta",
  "Título",
  "Kiosco",
]);

let currentUser = getStoredUser();
let googleButtonRendered = false;
let paymentType = "efectivo";

function isGoogleClientConfigured() {
  return GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes("PEGAR_CLIENT_ID");
}

function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function isUserAllowed(email) {
  return ALLOWED_EMAILS.has(normalizeEmail(email));
}

function canViewSummary(email) {
  return SUMMARY_ALLOWED_EMAILS.has(normalizeEmail(email));
}

function decodeJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(""),
  );

  return JSON.parse(jsonPayload);
}

function getStoredUser() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  } catch (error) {
    sessionStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function storeUser(user) {
  currentUser = user;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearUser() {
  currentUser = null;
  sessionStorage.removeItem(SESSION_KEY);
}

function showLogin() {
  loginView.classList.remove("hidden");
  appView.classList.add("hidden");
  clearMetrics();
}

function showApp(user) {
  userPicture.src = user.picture || "";
  userPicture.alt = user.name
    ? `Foto de perfil de ${user.name}`
    : "Foto de perfil";
  userName.textContent = user.name || "Usuario";
  userEmail.textContent = user.email || "";
  configureSummaryAccess(user);
  loginView.classList.add("hidden");
  appView.classList.remove("hidden");
}

function handleCredentialResponse(response) {
  const profile = decodeJwt(response.credential);
  const email = normalizeEmail(profile.email);

  if (!isUserAllowed(email)) {
    clearUser();
    showLogin();

    Swal.fire({
      title: "Acceso no autorizado",
      text: "Tu cuenta no está habilitada para cargar movimientos.",
      icon: "error",
    });

    return;
  }

  const user = {
    name: profile.name,
    email,
    picture: profile.picture,
    token: response.credential,
  };

  storeUser(user);
  showApp(user);
}

function initGoogleSignIn() {
  if (!isGoogleClientConfigured()) {
    if (currentUser) {
      showApp(currentUser);
      return;
    }
    showLogin();
    loginHelp.classList.remove("hidden");
    return;
  }

  if (!window.google?.accounts?.id) {
    if (currentUser) {
      showApp(currentUser);
      return;
    }
    showLogin();
    loginHelp.textContent =
      "No se pudo cargar Google Identity Services. Revisá la conexión e intentá nuevamente.";
    loginHelp.classList.remove("hidden");
    return;
  }

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleCredentialResponse,
  });

  if (!googleButtonRendered) {
    google.accounts.id.renderButton(
      document.getElementById("googleSignInButton"),
      {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "pill",
        width: 280,
      },
    );
    googleButtonRendered = true;
  }

  if (currentUser) {
    if (isUserAllowed(currentUser.email)) {
      showApp(currentUser);
    } else {
      clearUser();
      showLogin();
    }
  } else {
    showLogin();
  }
}

function logout() {
  clearUser();
  if (window.google?.accounts?.id) {
    google.accounts.id.disableAutoSelect();
  }
  showLogin();
}

function configureSummaryAccess(user) {
  const summaryAllowed = canViewSummary(user?.email);
  summaryTab.classList.toggle("hidden", !summaryAllowed);
  tabsNav.classList.toggle("has-summary", summaryAllowed);

  if (!summaryAllowed) {
    metricsPanel.classList.add("hidden");
    clearMetrics();
    if (document.querySelector(".tab.active")?.dataset.tab === "resumen") {
      setActiveTab("entrada");
    }
  }
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker
    .register("sw.js")
    .then((registration) => registration.update())
    .catch((error) => {
      console.warn("No se pudo registrar el service worker", error);
    });
}

function getScriptUrlWithParams(params) {
  const url = new URL(scriptUrl);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}

function requestJsonp(params) {
  return new Promise((resolve, reject) => {
    const callbackName = `metricasCallback_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}`;
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Tiempo de espera agotado al leer Metricas2026"));
    }, 12000);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (data) => {
      cleanup();
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("No se pudo leer Metricas2026"));
    };

    script.src = getScriptUrlWithParams({
      ...params,
      callback: callbackName,
      _: String(Date.now()),
    });
    document.body.appendChild(script);
  });
}

function clearMetrics() {
  if (metricsCards) metricsCards.replaceChildren();
}

function setMetricsStatus(message) {
  if (metricsStatus) metricsStatus.textContent = message;
}

function renderMetrics(totals) {
  if (!metricsCards) return;

  metricsCards.replaceChildren();
  totals.forEach((metric) => {
    const card = document.createElement("article");
    const label = document.createElement("strong");
    const value = document.createElement("span");

    card.className = "metric-card";
    label.textContent = metric.label;
    value.textContent = metric.displayValue || metric.value || "0";

    card.append(label, value);
    metricsCards.appendChild(card);
  });
}

async function confirmSummary() {
  if (!currentUser?.token || !canViewSummary(currentUser.email)) return;

  const confirmation = await Swal.fire({
    title: "Confirmar resumen",
    text: "¿El resumen financiero es correcto hasta el momento?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ok",
    cancelButtonText: "No",
    reverseButtons: true,
  });

  if (!confirmation.isConfirmed) return;

  confirmSummaryButton.disabled = true;
  confirmSummaryButton.setAttribute("aria-busy", "true");

  try {
    const response = await requestJsonp({
      action: "confirmarResumen",
      "google id token": currentUser.token,
    });

    if (response.result !== "success") {
      throw new Error(response.error || "No se pudo confirmar");
    }

    await Swal.fire({
      title: "Resumen confirmado",
      text: `Se guardó la fecha y hora: ${response.confirmedAt}`,
      icon: "success",
    });
    loadMetrics();
  } catch (error) {
    console.warn(error);
    Swal.fire({
      title: "No se pudo confirmar",
      text: "Revisá la publicación de Apps Script e intentá nuevamente.",
      icon: "error",
    });
  } finally {
    confirmSummaryButton.disabled = false;
    confirmSummaryButton.removeAttribute("aria-busy");
  }
}

async function loadMetrics() {
  if (
    !currentUser?.token ||
    !canViewSummary(currentUser.email) ||
    !metricsCards ||
    !metricsStatus
  ) {
    return;
  }

  setMetricsStatus("Cargando datos de Metricas2026...");

  try {
    const response = await requestJsonp({
      action: "metricas",
      "google id token": currentUser.token,
    });

    if (response.result !== "success") {
      throw new Error(response.error || "Respuesta inválida");
    }

    renderMetrics(response.metrics.totals || []);
    setMetricsStatus("Actualizado desde Google Sheets");
  } catch (error) {
    console.warn(error);
    clearMetrics();
    setMetricsStatus("No se pudo cargar el resumen");
  }
}

function setRequired(fields, required) {
  fields.forEach((field) => {
    field.required = required;
    if (!required) field.value = "";
  });
}

function setPaymentType(nextPaymentType) {
  paymentType = nextPaymentType;
  const isTransfer = paymentType === "transferencia";
  paymentTypeSwitch.classList.toggle("is-transfer", isTransfer);
  paymentTypeSwitch.setAttribute("aria-pressed", String(isTransfer));
  paymentTypeSwitch.setAttribute(
    "aria-label",
    `Tipo de movimiento: ${paymentType}`,
  );
}

function togglePaymentType() {
  setPaymentType(paymentType === "efectivo" ? "transferencia" : "efectivo");
}

function updateOtherConcept() {
  const isOther = concepto.value === "Otros";
  otroConceptoField.classList.toggle("hidden", !isOther);
  otroConcepto.required = isOther;
  if (!isOther) otroConcepto.value = "";
  updateFormContext();
}

function getTodayForInput() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function updateFormContext() {
  if (!formContext) return;

  if (movementType.value === "Salida") {
    formContext.textContent =
      "La salida se registrará con la fecha seleccionada y el comercio indicado.";
    return;
  }

  if (!concepto.value) {
    formContext.textContent =
      "Seleccioná un concepto para definir el destino contable.";
    return;
  }

  formContext.textContent = `Esta entrada se imputará a ${getRazonSocialEntrada(
    concepto.value,
  )}.`;
}

function setActiveTab(tabName) {
  const safeTabName =
    tabName === "resumen" && !canViewSummary(currentUser?.email)
      ? "entrada"
      : tabName;
  const isEntrada = safeTabName === "entrada";
  const isSalida = safeTabName === "salida";
  const isResumen = safeTabName === "resumen";

  tabs.forEach((tab) => {
    const active = tab.dataset.tab === safeTabName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });

  document.querySelectorAll(".entrada-field, .entrada-copy").forEach((item) => {
    item.classList.toggle("hidden", !isEntrada);
  });

  document.querySelectorAll(".salida-field, .salida-copy").forEach((item) => {
    item.classList.toggle("hidden", !isSalida);
  });

  form.classList.toggle("hidden", isResumen);
  metricsPanel.classList.toggle("hidden", !isResumen);

  if (isResumen) {
    loadMetrics();
    return;
  }

  movementType.value = isEntrada ? "Entrada" : "Salida";
  form.classList.toggle("is-entrada", isEntrada);
  form.classList.toggle("is-salida", isSalida);
  submitButton.textContent = isEntrada
    ? "Registrar entrada"
    : "Registrar salida";
  submitButton.classList.toggle("income-submit", isEntrada);
  submitButton.classList.toggle("expense-submit", isSalida);

  if (isSalida && !fechaSalida.value) {
    fechaSalida.value = getTodayForInput();
  }

  setRequired([concepto], isEntrada);
  setRequired(
    [comprobante, fechaSalida, razonSocial, conceptoSalida],
    isSalida,
  );
  updateOtherConcept();
  updateFormContext();
}

function formatDateForSheet(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function formatInputDateForSheet(inputDate) {
  if (!inputDate) return getTodayForSheet();

  const [year, month, day] = inputDate.split("-");
  return `${day}/${month}/${year}`;
}

function getTodayForSheet() {
  return formatDateForSheet(new Date());
}

function getRazonSocialEntrada(conceptoEntrada) {
  return BIBLIOTECA_CONCEPTS.has(conceptoEntrada) ? "Biblioteca" : "Secretaria";
}

function getMovementData() {
  const isEntrada = movementType.value === "Entrada";
  const conceptoFinal =
    isEntrada && concepto.value === "Otros"
      ? otroConcepto.value
      : isEntrada
        ? concepto.value
        : conceptoSalida.value;
  const razonSocialFinal = isEntrada
    ? getRazonSocialEntrada(concepto.value)
    : razonSocial.value;
  const fechaFinal = isEntrada
    ? getTodayForSheet()
    : formatInputDateForSheet(fechaSalida.value);

  return {
    tipo: isEntrada ? "Entrada" : "Salida",
    fecha: fechaFinal,
    comprobante: isEntrada ? "recibo" : comprobante.value,
    razonSocial: razonSocialFinal,
    concepto: conceptoFinal,
    entrada: isEntrada ? monto.value : "",
    salida: isEntrada ? "" : monto.value,
    medioPago: paymentType,
    usuario: currentUser?.name || "",
  };
}

function buildSheetPayload(movementData) {
  const payload = new FormData();
  payload.append("fecha", movementData.fecha);
  payload.append("comprobante", movementData.comprobante);
  payload.append("razon social", movementData.razonSocial);
  payload.append("concepto", movementData.concepto);
  payload.append("entrada", movementData.entrada);
  payload.append("salida", movementData.salida);
  payload.append("tipo de movimiento", movementData.medioPago);
  payload.append("usuario", movementData.usuario);
  payload.append("usuario email", currentUser?.email || "");
  payload.append("usuario nombre", currentUser?.name || "");
  payload.append("google id token", currentUser?.token || "");

  return payload;
}

function formatMoneyForConfirmation(value) {
  const amount = Number(value || 0);

  return amount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
}

function getConfirmationHtml(movementData) {
  const amount =
    movementData.tipo === "Entrada"
      ? movementData.entrada
      : movementData.salida;

  return `
    <div class="confirm-summary">
      <div><strong>Movimiento:</strong> ${movementData.tipo}</div>
      <div><strong>Fecha:</strong> ${movementData.fecha}</div>
      <div><strong>Medio de pago:</strong> ${movementData.medioPago}</div>
      <div><strong>Comprobante:</strong> ${movementData.comprobante}</div>
      <div><strong>Razón social:</strong> ${movementData.razonSocial}</div>
      <div><strong>Concepto:</strong> ${movementData.concepto}</div>
      <div><strong>Monto:</strong> ${formatMoneyForConfirmation(amount)}</div>
      <div><strong>Usuario:</strong> ${movementData.usuario}</div>
    </div>
  `;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

concepto.addEventListener("change", updateOtherConcept);
paymentTypeSwitch.addEventListener("click", togglePaymentType);
confirmSummaryButton.addEventListener("click", confirmSummary);
logoutButton.addEventListener("click", logout);
window.addEventListener("load", initGoogleSignIn);
window.addEventListener("load", registerServiceWorker);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!currentUser) {
    showLogin();
    return;
  }

  const movementData = getMovementData();
  const confirmation = await Swal.fire({
    title: "Confirmar movimiento",
    html: getConfirmationHtml(movementData),
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Confirmar y registrar",
    cancelButtonText: "Revisar",
    reverseButtons: true,
  });

  if (!confirmation.isConfirmed) return;

  submitButton.disabled = true;
  submitButton.setAttribute("aria-busy", "true");
  submitButton.textContent = "Enviando...";

  try {
    await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      body: buildSheetPayload(movementData),
    });

    await Swal.fire({
      title: "Movimiento registrado",
      text: "La información fue enviada correctamente.",
      icon: "success",
    });

    form.reset();
    setActiveTab("entrada");
    window.setTimeout(loadMetrics, 800);
  } catch (error) {
    console.error("Error", error);

    Swal.fire({
      title: "No se pudo enviar",
      text: "Revisá la URL publicada de Apps Script e intentá de nuevo.",
      icon: "error",
    });
  } finally {
    submitButton.disabled = false;
    submitButton.removeAttribute("aria-busy");
    submitButton.textContent =
      movementType.value === "Entrada"
        ? "Registrar entrada"
        : "Registrar salida";
  }
});

setActiveTab("entrada");
setPaymentType("efectivo");
