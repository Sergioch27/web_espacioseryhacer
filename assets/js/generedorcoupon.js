
function coupon_new_user() {
    //Saludamos y obtenemos la informacion del visitante.
    const new_datos = new saludo();
    new_datos.pedirdatos();
    while (new_datos.Nombre === '' || new_datos.Apellido === '') {
        alert('Necesitamos los datos, son importantes Gracias!!')
       new_datos.pedirdatos();
    }
    const completedatos =  new_datos.datos_complete();
    let new_user = completedatos;
    console.log(`Nombre del nuevo usuario: ${new_user}`);
    // Creamos el cupon
    const code = new Couponalphanumerico(6);
    const coupon = code.generador();
    return alert(`Genial ${new_user} Aqui tienes tu cupon de descuento: ${coupon}`);
}
coupon_new_user();



