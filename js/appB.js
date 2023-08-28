const container = document.querySelector(".container");
const coffees = [
  {
    name: "Ventas",
    image: "images/ventas.jpg",
    link: "Ingresos/index.html"
  },
  // Resto de los objetos de café
];

const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image, link }) =>
      (output += `
              <div class="card">
                <img class="card--avatar" src=${image} />
                <h1 class="card--title">${name}</h1>
                <a class="card--link" href=${link}>IR</a>
              </div>
              `)
  );
  container.innerHTML = output;
};

// Cuando se carga la página
document.addEventListener("DOMContentLoaded", function() {
  // Obtén los elementos del DOM
  const registerForm = document.getElementById("registerForm");
  const mainContent = document.getElementById("mainContent");

  // Verifica si ya hay datos de registro en el almacenamiento local
  if (localStorage.getItem("registration")) {
    // Si hay datos, muestra el contenido principal
    mainContent.style.display = "block";
  } else {
    // Si no hay datos, muestra el formulario de registro
    registerForm.style.display = "block";
  }

  // Muestra los cafés
  showCoffees();
});

// Cuando se envía el formulario de registro
document.querySelector("#registerForm form").addEventListener("submit", function(event) {
  // Evita la recarga de la página
  event.preventDefault();

  // Obtén los datos del formulario
  const id = document.getElementById("id").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  // Guarda los datos en el almacenamiento local
  localStorage.setItem("registration", JSON.stringify({ id, email, phone }));

  // Oculta el formulario de registro y muestra el contenido principal
  registerForm.style.display = "none";
  mainContent.style.display = "block";
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
