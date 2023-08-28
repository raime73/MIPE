window.onload = () => {
    const clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    const operationSelect = document.getElementById('operation');
    const formContainer = document.getElementById('formContainer');

    const cargarClientes = (callback) => {
        formContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Zona</th>
                        <th>Comentarios</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${clientes.map((cliente, index) => `
                        <tr>
                            <td>${cliente.nombre}</td>
                            <td>${cliente.telefono}</td>
                            <td>${cliente.direccion}</td>
                            <td>${cliente.zona}</td>
                            <td>${cliente.comentarios}</td>
                            <td>${callback ? callback(index) : ''}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    };

    const createForm = () => {
        formContainer.innerHTML = `
            <form id="altaForm" class="form">
                <h2>Alta de Cliente</h2>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" required>

                <label for="telefono">Teléfono:</label>
                <input type="text" id="telefono" required>

                <label for="direccion">Dirección:</label>
                <input type="text" id="direccion" required>

                <label for="zona">Zona:</label>
                <select id="zona" required>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                </select>

                <label for="comentarios">Comentarios:</label>
                <textarea id="comentarios" rows="3"></textarea>

                <button type="submit" class="btn btn-1">Guardar</button>
            </form>
        `;

        const altaForm = document.getElementById('altaForm');
        altaForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre').value;

            // Verificar si el cliente ya existe
            if (clientes.some(cliente => cliente.nombre === nombre)) {
                alert('El cliente ya existe. Por favor, ingresa un nombre de cliente diferente.');
                return;
            }

            const telefono = document.getElementById('telefono').value;
            const direccion = document.getElementById('direccion').value;
            const zona = document.getElementById('zona').value;
            const comentarios = document.getElementById('comentarios').value;

            clientes.push({ nombre, telefono, direccion, zona, comentarios });
            localStorage.setItem('clientes', JSON.stringify(clientes));

            cargarClientes();
            altaForm.reset();
        });
    };

    operationSelect.addEventListener('change', () => {
        formContainer.innerHTML = '';

        switch (operationSelect.value) {
            case 'alta':
                createForm();
                break;
            case 'baja':
                cargarClientes((index) => `<button class="btn btn-1" onclick="deleteCliente(${index})">Eliminar</button>`);
                break;
            case 'consulta':
                cargarClientes();
                break;
            default:
                formContainer.innerHTML = '<p>Selecciona una opción válida.</p>';
                break;
        }
    });

    window.deleteCliente = (index) => {
        clientes.splice(index, 1);
        localStorage.setItem('clientes', JSON.stringify(clientes));
        cargarClientes((index) => `<button class="btn btn-1" onclick="deleteCliente(${index})">Eliminar</button>`);
    };
};