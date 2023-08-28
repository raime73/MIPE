window.onload = () => {
    const fechaInicioInput = document.getElementById('fechaInicio');
    const fechaFinalInput = document.getElementById('fechaFinal');
    const hoy = new Date();
    const inicioDeAno = new Date(hoy.getFullYear(), 0, 1);  // 1 de enero del año actual

    // Establecer las fechas de inicio y final por defecto
    fechaInicioInput.value = inicioDeAno.toISOString().split('T')[0];
    fechaFinalInput.value = hoy.toISOString().split('T')[0];

    const calcularGastos = () => {
        const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
        const fechaInicio = new Date(fechaInicioInput.value);
        const fechaFinal = new Date(fechaFinalInput.value);
        fechaFinal.setDate(fechaFinal.getDate() + 1);  // Para incluir el día final completo

        const gastosFiltrados = gastos.filter(gasto => {
            const fechaGasto = new Date(gasto.fecha);
            return fechaGasto >= fechaInicio && fechaGasto < fechaFinal;
        });

        // Calcular los totales
        let rawTotales = 0;
        let opTotal = 0;
        let nomTotal = 0;
        let pubTotal = 0;
        let otroTotal = 0;

        gastosFiltrados.forEach(gasto => {
            if (gasto.tipoGastos === 'MateriaPrima') {
                rawTotales += parseFloat(gasto.cantidadGasto);
            } else if (gasto.tipoGastos === 'Operacion') {
                opTotal += parseFloat(gasto.cantidadGasto);
            } else if (gasto.tipoGastos === 'Nomina') {
                nomTotal += parseFloat(gasto.cantidadGasto);
            } else if (gasto.tipoGastos === 'Publicidad') {
                pubTotal += parseFloat(gasto.cantidadGasto);
            } else if (gasto.tipoGastos === 'Otro') {
                otroTotal += parseFloat(gasto.cantidadGasto);
            }
        });

        // Calcular los totales de gastos
        const gastosTotales = rawTotales + opTotal + nomTotal + pubTotal + otroTotal;

        // Calcular los porcentajes
        const rawTotalesPorcentaje = (rawTotales / gastosTotales) * 100;
        const opTotalPorcentaje = (opTotal / gastosTotales) * 100;
        const nomTotalPorcentaje = (nomTotal / gastosTotales) * 100;
        const pubTotalPorcentaje = (pubTotal / gastosTotales) * 100;
        const otroTotalPorcentaje = (otroTotal / gastosTotales) * 100;

        // Actualizar los valores y las barras
        document.getElementById('raw-menu').style.width = `${rawTotalesPorcentaje}%`;
        document.getElementById('raw').textContent = `${rawTotales.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}  ( ${rawTotalesPorcentaje.toFixed(2)}% )`;

        document.getElementById('op-menu').style.width = `${opTotalPorcentaje}%`;
        document.getElementById('op').textContent = `${opTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}  ( ${opTotalPorcentaje.toFixed(2)}% )`;

        document.getElementById('nom-menu').style.width = `${nomTotalPorcentaje}%`;
        document.getElementById('nom').textContent = `${nomTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}  ( ${nomTotalPorcentaje.toFixed(2)}% )`;

        document.getElementById('pub-menu').style.width = `${pubTotalPorcentaje}%`;
        document.getElementById('pub').textContent = `${pubTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}  ( ${pubTotalPorcentaje.toFixed(2)}% )`;

        document.getElementById('otro-menu').style.width = `${otroTotalPorcentaje}%`;
        document.getElementById('otro').textContent = `${otroTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}  ( ${otroTotalPorcentaje.toFixed(2)}% )`;

        // Agregar Gastos Totales al final
        document.getElementById('gastosTotales').textContent = `Gastos Totales: ${gastosTotales.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
    };

    document.getElementById('aplicarRango').addEventListener('click', calcularGastos);

    // Calcular y mostrar los gastos iniciales
    calcularGastos();
};
