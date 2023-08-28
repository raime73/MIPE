window.onload = () => {
    const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
    const ventasTableBody = document.getElementById('ventas').querySelector('tbody');

    ventas.forEach(venta => {
        const row = document.createElement('tr');

        const columns = ['producto', 'cliente', 'precioUnitario', 'cantidad', 'costoExtras', 'costoEntrega', 'comentarios', 'total', 'fecha'];
        columns.forEach(column => {
            const cell = document.createElement('td');
            cell.textContent = venta[column];
            row.appendChild(cell);
        });

        ventasTableBody.appendChild(row);
    });
};
