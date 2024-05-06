# Formulario con Firebase  

Se desarrollo un Formulario con Javascript y Firebase, la web lo puedes encontrar en el siguiente link: [Ver formulario en la web](https://formwhitejs.netlify.app/)


### Configuración de Firebase
Antes de comenzar, asegúrate de obtener los datos de configuración necesarios de Firebase. Debes tener una cuenta de [Firebase](https://firebase.google.com/?gad_source=1&gclid=Cj0KCQjw_-GxBhC1ARIsADGgDjt4emsb9HoY-FEwXNFMr4l7IHDF5Uf2VIthCXuUPQYxOACWwR95XYEaAok-EALw_wcB&gclsrc=aw.ds&hl=es-419)  y un proyecto configurado. Luego, reemplaza los valores de `API_KEY`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId` y `measurementId` en el objeto `firebaseConfig` con los valores correspondientes proporcionados por Firebase.

	const firebaseConfig = {
	  apiKey: "API_KEY",
	  authDomain: "authDomain",
	  projectId: "form-js",
	  storageBucket: "form-js.appspot.com",
	  messagingSenderId: "messagingSenderId",
	  appId: "appId",
	  measurementId: "measurementId"
	};

## Inicialización de Firebase
	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);

	// Initialize Cloud Firestore and get a reference to the service
	const  db  = firebase.firestore();
### Validación del nombre
Debes revisar el **id** que asignaste a cada etiqueta en el html.

	let  name  =  document.getElementById('name')
	let  errorName  =  document.getElementById('nameError')

	validationName(name, errorName);

### Validación del correo electrónico
Para validar un correo electrónico se utilizó expresiones regulares para tener más información de expresiones regulares [Visita este sitio](https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions)

	let  email  =  document.getElementById('email')
	let  emailError  =  document.getElementById('emailError')
	let  emailPattern  =  /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

	validationEmail(email, emailError, emailPattern); 

### Validación de la contraseña
Se utilizo expresiones regulares para validar la contraseña.			

    let  password  =  document.getElementById('password')
	let  passwordError  =  document.getElementById('passwordError')
	let  passwordPattern  =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

	validationPassword(password, passwordError, passwordPattern);

### Agregamos los datos del formulario a Firebase
Si no hay errores en ninguno de los campos se llama a una función para enviar el formulario:

	if (!errorName.textContent  &&  !emailError.textContent  &&  !passwordError.textContent) {
		addUserToDatabase(name, email, password);
	}
Se utilizo la función `add()` de Firestore para agregar un nuevo documento a la colección "users" en la base de datos de Firebase. El documento contiene los valores ingresados en los campos del formulario.
Si el envío es exitoso, mostramos una alerta con un mensaje de éxito y restablecemos el formulario. Si ocurre algún error, mostramos una alerta con el mensaje de error.

    function addUserToDatabase(name, email, password) {
		db.collection("users").add({
		name: name.value,
		email: email.value,
		password: password.value
		})
		.then(() => {
			alert('El formulario se ha enviado con éxito');
			document.getElementById('form').reset();
		}).catch((error) => {
			alert('Ocurrió un error: '  +  error.message);
			console.log(error);
		});

	}
