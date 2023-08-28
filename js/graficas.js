

window.onload = () => {
    const fechaInicioInput = document.getElementById('fechaInicio');
    const fechaFinalInput = document.getElementById('fechaFinal');
    const hoy = new Date();
    const inicioDeAno = new Date(hoy.getFullYear(), 0, 1);  // 1 de enero del año actual

    // Establecer las fechas de inicio y final por defecto
    fechaInicioInput.value = inicioDeAno.toISOString().split('T')[0];
    fechaFinalInput.value = hoy.toISOString().split('T')[0];

    const calcularVentas = () => {
        const ventas = JSON.parse(localStorage.getItem('ventas')) || [];
        const fechaInicio = new Date(fechaInicioInput.value);
        const fechaFinal = new Date(fechaFinalInput.value);
        fechaFinal.setDate(fechaFinal.getDate() + 1);  // Para incluir el día final completo

        const ventasFiltradas = ventas.filter(venta => {
            const fechaVenta = new Date(venta.fecha);
            return fechaVenta >= fechaInicio && fechaVenta < fechaFinal;
        });

        // Calcular los totales
        let ventasTotales = 0;
        let costoExtraTotal = 0;
        let costoEntregaTotal = 0;
        ventasFiltradas.forEach(venta => {
            ventasTotales += venta.total;
            costoExtraTotal += venta.costoExtras;
            costoEntregaTotal += venta.costoEntrega;
        });

        // Calcular las ventas (ventas totales menos costos extra y de entrega)
        const ventasNetas = ventasTotales - costoExtraTotal - costoEntregaTotal;

        // Calcular los porcentajes
        const ventasNetasPorcentaje = ventasNetas / ventasTotales * 100;
        const costoExtraPorcentaje = costoExtraTotal / ventasTotales * 100;
        const costoEntregaPorcentaje = costoEntregaTotal / ventasTotales * 100;

        // Actualizar los valores y las barras
        document.getElementById('sales-menu').style.width = `${ventasNetasPorcentaje}%`;
        document.getElementById('sales').textContent = `${ventasNetas.toLocaleString('en-US', {style: 'currency', currency: 'USD'} )}  ( ${ventasNetasPorcentaje.toFixed(2)}% )`;

        document.getElementById('ecost-menu').style.width = `${costoExtraPorcentaje}%`;
        document.getElementById('ecost').textContent = `${costoExtraTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'} )}  ( ${costoExtraPorcentaje.toFixed(2)}% )`;
        
        document.getElementById('dcost-menu').style.width = `${costoEntregaPorcentaje}%`;
        document.getElementById('dcost').textContent = `${costoEntregaTotal.toLocaleString('en-US', {style: 'currency', currency: 'USD'} )}  ( ${costoEntregaPorcentaje.toFixed(2)}% )`;

        // Agregar Ventas Totales al final
        document.getElementById('ventasTotales').textContent = `Ventas Totales: ${ventasTotales.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}`;
    };

    document.getElementById('aplicarRango').addEventListener('click', calcularVentas);

    // Calcular y mostrar las ventas iniciales
    calcularVentas();

    
};
