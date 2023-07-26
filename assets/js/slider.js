
let carrusel = new sliderconstructor();
alert('Bienvenido al creador de slider, sigue los pasos para obtener tu slider');
let sliders = carrusel.genedaorslider();
let activo = carrusel.activeelement();
let i = 0;
let activeslider;
while ((activeslider = activo.find(active => active.activado !== false ,i)) !== false){
    let elemento = Object.keys(activeslider)[0];
    let contenido = activeslider[elemento];
    alert(`Estos son tus Slider Activo: ${elemento}:${contenido}`);
    i++;
}
console.log(activeslider);