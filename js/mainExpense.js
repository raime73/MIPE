

const calcularTotal = () => {
    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
    let total = 0;
    gastos.forEach(gasto => {
        total += parseFloat(gasto.cantidadGasto);
    });
    document.getElementById('total').textContent = total.toFixed(2);
};

document.getElementById('gastoForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
    gastos.push({
        tipoGastos: document.getElementById('tipoGastos').value,
        cantidadGasto: document.getElementById('cantidadGasto').value,
        comentarios: document.getElementById('comentarios').value,
        fecha: new Date().toISOString().split('T')[0]
    });

    localStorage.setItem('gastos', JSON.stringify(gastos));
    alert('Gasto guardado');
    event.target.reset();
    calcularTotal();
});

document.getElementById('tipoGastos').addEventListener('change', calcularTotal);
document.getElementById('cantidadGasto').addEventListener('input', calcularTotal);

window.onload = () => {
    calcularTotal();
};