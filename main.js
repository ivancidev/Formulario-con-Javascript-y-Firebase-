const firebaseConfig = {
  apiKey: "AIzaSyCvDguTJDDV6qScJ_g_nFuow6hlApy1g6Y",
  authDomain: "register-web-8d231.firebaseapp.com",
  projectId: "register-web-8d231",
  storageBucket: "register-web-8d231.appspot.com",
  messagingSenderId: "123381169266",
  appId: "1:123381169266:web:53a6e6ec998c28197d16eb",
  measurementId: "G-DE2THGCTT5",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById("form").addEventListener("submit", async (event) => {
  event.preventDefault();
  let name = document.getElementById("name");
  let errorName = document.getElementById("nameError");

  validationName(name, errorName);

  let email = document.getElementById("email");
  let emailError = document.getElementById("emailError");
  let emailPattern =
    /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

  validationEmail(email, emailError, emailPattern);

  let password = document.getElementById("password");
  let passwordError = document.getElementById("passwordError");
  let passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

  validationPassword(password, passwordError, passwordPattern);

  //Si todos los campos son válidos enviar formulario
  if (
    !errorName.textContent &&
    !emailError.textContent &&
    !passwordError.textContent
  ) {
    await addUserToDatabase(name, email, password);
  }
});

function validationName(name, errorName) {
  if (name.value == "") {
    errorName.textContent = "Por introduce tu nombre";
    errorName.classList.add("error-message");
  } else if (name.value.length < 3 || name.value.length > 12) {
    errorName.textContent =
      "Tu nombre solo debe tener 3 caracteres como minimo y 12 como maximo";
    errorName.classList.add("error-message");
  } else {
    errorName.textContent = "";
    errorName.classList.remove("error-message");
  }
}

function validationEmail(email, emailError, emailPattern) {
  if (!emailPattern.test(email.value)) {
    emailError.textContent = "Por favor, introducí un email válido";
    emailError.classList.add("error-message");
  } else {
    emailError.textContent = "";
    emailError.classList.remove("error-message");
  }
}

function validationPassword(password, passwordError, passwordPattern) {
  if (!passwordPattern.test(password.value)) {
    passwordError.textContent =
      "La contraseña debe tener al menos 8 caracteres y máximo 15, números, caracteres especiales, mayúsculas y minúsculas";
    passwordError.classList.add("error-message");
  } else {
    passwordError.textContent = "";
    passwordError.classList.remove("error-message");
  }
}

async function addUserToDatabase(name, email, password) {
  try {
    await db.collection("users").add({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    alert("El formulario se ha enviado con éxito");
    document.getElementById("form").reset();
  } catch (error) {
    alert("Ocurrió un error: " + error.message);
    console.log(error);
  }
}
