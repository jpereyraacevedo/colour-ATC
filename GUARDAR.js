useEffect(() => {
  const importeTotal = coloranteResultados.reduce((total, resultado) => {
      const importe = resultado.cantidad && resultado.precio ? resultado.cantidad * resultado.precio : 0;
      return total + importe;
  }, 0);
  setTotalImporte(importeTotal);
}, [coloranteResultados]);


{totalImporte.toFixed(2)}



    // Funcion de prueba para el match de codigo con letra
    // const buscarLetraPorCodigo = (codigoColorante) => {
    //     let pigmentosDos; 
    //     const pigmentoEncontrado = tablaPigmentos.find((pigmento) => {
    //        if (pigmento.Codigo === codigoColorante)
    //         {
    //             pigmentosDos=pigmento.Letra;
    //             return true;
    //         } else {
    //             return false
    //         }
    //     });

    //      if (!pigmentoEncontrado) return;

    //      console.log("ES POR ACA " + pigmentosDos)
    //      return pigmentosDos
    // };

     // MEJORAR ESTO ---> Por ahora es para matchear los colorantes con los litros y sus cantidades
    // const obtenerColorantes = (litros) => {
    //     if (!selectedSubProducto) return;

    //     const colorantes = [];

    //     // Verificamos cada CodigoColorante y agregamos su correspondiente cantidad
    //     if (selectedSubProducto.CodigoColorante1 && selectedSubProducto.CodigoColorante1 !== '0') {
    //         colorantes.push({
    //             colorante: buscarLetraPorCodigo(selectedSubProducto.CodigoColorante1),
    //             cantidad: selectedSubProducto[`Cantidad1_${litros}`],
    //         });
    //     }
    //     if (selectedSubProducto.CodigoColorante2 && selectedSubProducto.CodigoColorante2 !== '0') {
    //         colorantes.push({
    //             colorante: buscarLetraPorCodigo(selectedSubProducto.CodigoColorante2),
    //             cantidad: selectedSubProducto[`Cantidad2_${litros}`],
    //         });
    //     }
    //     if (selectedSubProducto.CodigoColorante3 && selectedSubProducto.CodigoColorante3 !== '0') {
    //         colorantes.push({
    //             colorante: buscarLetraPorCodigo(selectedSubProducto.CodigoColorante3),
    //             cantidad: selectedSubProducto[`Cantidad3_${litros}`],
    //         });
    //     }
    //     if (selectedSubProducto.CodigoColorante4 && selectedSubProducto.CodigoColorante4 !== '0') {
    //         colorantes.push({
    //             colorante: buscarLetraPorCodigo(selectedSubProducto.CodigoColorante4),
    //             cantidad: selectedSubProducto[`Cantidad4_${litros}`],
    //         });
    //     }
    //     if (selectedSubProducto.CodigoColorante5 && selectedSubProducto.CodigoColorante5 !== '0') {
    //         colorantes.push({
    //             colorante: buscarLetraPorCodigo(selectedSubProducto.CodigoColorante5),
    //             cantidad: selectedSubProducto[`Cantidad5_${litros}`],
    //         });
    //     }
    //     if (selectedSubProducto.CodigoColorante6 && selectedSubProducto.CodigoColorante6 !== '0') {
    //         colorantes.push({
    //             colorante: buscarLetraPorCodigo(selectedSubProducto.CodigoColorante6),
    //             cantidad: selectedSubProducto[`Cantidad6_${litros}`],
    //         });
    //     }

    //     setColoranteResultados(colorantes);

    //     // Busca los resultados y los compara con la columna de letra 
    //     colorantes.forEach(resultado => {
    //         buscarLetraPorCodigo(resultado.colorante);
    //     });
    // };