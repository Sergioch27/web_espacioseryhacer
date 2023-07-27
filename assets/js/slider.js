
alert('Bienvenido al creador de slider, sigue los pasos para obtener tu slider');
let carrusel = new sliderconstructor();
let sliders = carrusel.genedaorslider();
let activo = carrusel.activeelement();
//fitramos por slider activo dentro del array
let slider = activo.filter(activeslider => activeslider.activado !== false );
//mostramos el slider.
function sliderdone(slider){
    for (let key in slider) {
        alert(`Este slider esta activo ${key}:${slider[key]}`);
        break;
    }
}
slider.forEach(sliderdone);
console.log(slider);