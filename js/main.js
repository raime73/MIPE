


const calcularTotal = () => {
    const cantidad = parseInt(document.getElementById('cantidad').value) || 0;
    const precioUnitario = parseFloat(document.getElementById('precioUnitario').value) || 0;
    const costoExtras = parseFloat(document.getElementById('costoExtras').value) || 0;
    const costoEntrega = parseFloat(document.getElementById('costoEntrega').value) || 0;

    const total = cantidad * precioUnitario + costoExtras + costoEntrega;
    document.getElementById('total').textContent = total.toFixed(2);
};

const updateCostoEntregaPlaceholder = () => {
    const selectedClientName = document.getElementById('clienteSelect').value;
    const clients = JSON.parse(localStorage.getItem('clientes')) || [];
    const selectedClient = clients.find(client => client.nombre === selectedClientName);

    if (selectedClient) {
        document.getElementById('costoEntrega').placeholder = `Zona ${selectedClient.zona}`;
    }
};

const cargarProductos = () => {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const productoSelect = document.getElementById('productoSelect');

    // Limpiar las opciones existentes
    productoSelect.innerHTML = '';

    // Agregar nuevas opciones de productos
    productos.forEach(producto => {
        const option = document.createElement('option');
        option.value = producto.nombre;
        option.textContent = producto.nombre;
        productoSelect.appendChild(option);
    });
};

const cargarClientes = () => {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const clienteSelect = document.getElementById('clienteSelect');

    // Limpiar las opciones existentes
    clienteSelect.innerHTML = '';

    // Agregar nuevas opciones de clientes
    clientes.forEach(cliente => {
        const option = document.createElement('option');
        option.value = cliente.nombre;
        option.textContent = cliente.nombre;
        clienteSelect.appendChild(option);
    });
};

document.getElementById('ventaForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventas.push({
        producto: document.getElementById('productoSelect').value,
        cliente: document.getElementById('clienteSelect').value,
        precioUnitario: parseFloat(document.getElementById('precioUnitario').value),
        cantidad: parseInt(document.getElementById('cantidad').value),
        costoExtras: parseFloat(document.getElementById('costoExtras').value),
        costoEntrega: parseFloat(document.getElementById('costoEntrega').value),
        comentarios: document.getElementById('comentarios').value,
        total: parseFloat(document.getElementById('total').textContent),
        fecha: new Date().toISOString().split('T')[0]  // Guarda la fecha de la venta
    });

    localStorage.setItem('ventas', JSON.stringify(ventas));
    alert('Venta guardada');
    event.target.reset();
    calcularTotal();
    updateCostoEntregaPlaceholder();
});

document.getElementById('productoSelect').addEventListener('change', calcularTotal);
document.getElementById('clienteSelect').addEventListener('change', updateCostoEntregaPlaceholder);
document.getElementById('precioUnitario').addEventListener('input', calcularTotal);
document.getElementById('cantidad').addEventListener('input', calcularTotal);
document.getElementById('costoExtras').addEventListener('input', calcularTotal);
document.getElementById('costoEntrega').addEventListener('input', calcularTotal);

// Calcular total al cargar la página
window.onload = () => {
    calcularTotal();
    updateCostoEntregaPlaceholder();
    cargarProductos();
    cargarClientes(); // Llama a la función cargarClientes cuando la página se carga
};
