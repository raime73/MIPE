window.onload = () => {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const operationSelect = document.getElementById('operation');
    const formContainer = document.getElementById('formContainer');

    

    const cargarProductos = (callback) => {
        formContainer.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo de Unidades</th>
                        <th>Comentarios</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    ${productos.map((producto, index) => `
                        <tr>
                            <td>${producto.nombre}</td>
                            <td>${producto.tipoUnidades}</td>
                            <td>${producto.comentarios}</td>
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
                <h2>Alta de Producto</h2>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" required>

                <label for="tipoUnidades">Tipo de Unidades:</label>
                <select id="tipoUnidades" required>
                    <option value="piezas">Piezas</option>
                    <option value="cajas">Cajas</option>
                    <option value="kg">Kg</option>
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
            const tipoUnidades = document.getElementById('tipoUnidades').value;
            const comentarios = document.getElementById('comentarios').value;

            // Verificar si el producto ya existe
            if (productos.some(producto => producto.nombre === nombre)) {
                alert('El producto ya existe. Por favor, ingresa un nombre de producto diferente.');
                return;
            }

            productos.push({ nombre, tipoUnidades, comentarios });
            localStorage.setItem('productos', JSON.stringify(productos));

            cargarProductos();
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
                cargarProductos((index) => `<button class="btn btn-1" onclick="deleteProducto(${index})">Eliminar</button>`);
                break;
            case 'consulta':
                cargarProductos();
                break;
            default:
                formContainer.innerHTML = '<p>Selecciona una opción válida.</p>';
                break;
        }
    });

    window.deleteProducto = (index) => {
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        cargarProductos((index) => `<button class="btn btn-1" onclick="deleteProducto(${index})">Eliminar</button>`);
    };
};
