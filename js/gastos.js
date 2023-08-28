
window.onload = () => {
    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
    const gastosTableBody = document.getElementById('gastos').querySelector('tbody');

    gastos.forEach(gasto => {
        const row = document.createElement('tr');

        const columns = ['tipoGastos', 'cantidadGasto','comentarios', 'fecha'];
        columns.forEach(column => {
            const cell = document.createElement('td');
            cell.textContent = gasto[column];
            row.appendChild(cell);
        });

        gastosTableBody.appendChild(row);
    });
};
