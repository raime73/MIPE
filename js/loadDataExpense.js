

window.onload = () => {
    const Gastos = JSON.parse(localStorage.getItem('Gastos')) || [];

    const cargarGastos = () => {
        // Assuming you have a dedicated element to display the expenses
        const expenseContainer = document.getElementById('expenseContainer'); 
        expenseContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo de Gastos</th>
                        <th>Comentarios</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${Gastos.map((gasto, index) => `
                        <tr>
                            <td>${gasto.nombre}</td>
                            <td>${gasto.tipoGastos}</td>
                            <td>${gasto.comentarios}</td>
                            <td><button class="btn btn-1" onclick="deleteGasto(${index})">Eliminar</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    };

    const gastoForm = document.getElementById('gastoForm');
    gastoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const tipoGastos = document.getElementById('tipoGastos').value;
        const comentarios = document.getElementById('comentarios').value;

        if (Gastos.some(gasto => gasto.nombre === nombre)) {
            alert('El gasto ya existe. Por favor, ingresa un gasto diferente.');
            return;
        }

        Gastos.push({ nombre, tipoGastos, comentarios });
        localStorage.setItem('Gastos', JSON.stringify(Gastos));

        cargarGastos();
        gastoForm.reset();
    });

    window.deleteGasto = (index) => {
        Gastos.splice(index, 1);
        localStorage.setItem('Gastos', JSON.stringify(Gastos));
        cargarGastos();
    };

    cargarGastos();
};
