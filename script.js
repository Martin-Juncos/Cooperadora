const GOOGLE_CLIENT_ID =
  "479787254850-3pect6imgqpi8c8opmjlhj90o6es97pe.apps.googleusercontent.com";
const SESSION_KEY = "cooperadora.googleUser";
const scriptUrl =
  "https://script.google.com/macros/s/AKfycbw7074u4ndayDA1X_uPIBMAneuBTXsnDJI_LCORP_jpb48LcWSCjgzgcjD_5hrWWXOS/exec";

const loginView = document.getElementById("loginView");
const appView = document.getElementById("appView");
const loginHelp = document.getElementById("loginHelp");
const userPicture = document.getElementById("userPicture");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const logoutButton = document.getElementById("logoutButton");
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

let currentUser = getStoredUser();
let googleButtonRendered = false;

function isGoogleClientConfigured() {
  return GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes("PEGAR_CLIENT_ID");
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
}

function showApp(user) {
  userPicture.src = user.picture || "";
  userPicture.alt = user.name
    ? `Foto de perfil de ${user.name}`
    : "Foto de perfil";
  userName.textContent = user.name || "Usuario";
  userEmail.textContent = user.email || "";
  loginView.classList.add("hidden");
  appView.classList.remove("hidden");
}

function handleCredentialResponse(response) {
  const profile = decodeJwt(response.credential);
  const user = {
    name: profile.name,
    email: profile.email,
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
    showApp(currentUser);
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
  payload.append("usuario email", currentUser?.email || "");
  payload.append("usuario nombre", currentUser?.name || "");
  payload.append("google id token", currentUser?.token || "");

  return payload;
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

concepto.addEventListener("change", updateOtherConcept);
logoutButton.addEventListener("click", logout);
window.addEventListener("load", initGoogleSignIn);

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!currentUser) {
    showLogin();
    return;
  }

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
