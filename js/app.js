const container = document.querySelector(".container");
const coffees = [
  {
    name: "Ventas",
    image: "images/ventas.jpg",
    link: "Ingresos/ventas.html"
  },
  {
    name: "Gastos",
    image: "images/gastos.jpg",
    link: "Gastos/index.html"
  },
  {
    name: "Alta de productos",
    image: "images/registro.jpg",
    link: "Productos/index.html"
  },
  {
    name: "Reportes",
    image: "images/reporte.jpg",
    link: "Reportes/index.html"
  },
  {
    name: "Clientes",
    image: "images/clientes.jpg",
    link: "Clientes/index.html"
  },
  {
    name: "Chat",
    image: "images/apoyo.jpg",
    link: "Chat/index.html"
  },
  {
    name: "Historial Ventas",
    image: "images/objetivo.jpg",
    link: "HistoriaV/index.html"
  },
  {
    name: "Historial Gastos",
    image: "images/motivo.jpg",
    link: "HistoriaG/index.html"
  },
  {
    name: "Actualizar",
    image: "images/actualiza.jpg",
    link: "Actualizar/index.html"
  }
];
const showCoffees = () => {
  let output = "";
  coffees.forEach(
    ({ name, image, link}) =>
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

document.addEventListener("DOMContentLoaded", showCoffees);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
