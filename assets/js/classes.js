
const BaseUrl = "https://api.espacioseryhacer.com/api/";
class loginAndRegister {
    constructor(data) {
        this.identifier = data['User'];
        this.password = data['Password'];
        this.username = data['username'];
        this.email = data['email'];
    }
    async LogiDatos() {
        const loginUrl = BaseUrl + "auth/local";
         try {
            const LoginData = await fetch(loginUrl, {
                method: 'POST',
                body: JSON.stringify({
                    identifier: this.identifier,
                    password: this.password,
                }),
                headers: {
                    'Content-type': 'application/json',
                },
            })
            const response = await LoginData.json();
            if(LoginData.ok) {
                return response;
            } else {
                throw new Error(response.message || "Error de Usuario o Contraseña");
            }
         }
         catch (err) {
            console.log(err)
            throw err;
         }
        };
    async RegisterUser(){
        const RegisterUrl = BaseUrl + "auth/local/register";
        try {
            const RegisterData = await fetch(RegisterUrl, {
                method:'POST',
                body: JSON.stringify({
                    username: this.username,
                    email: this.email,
                    password: this.password
                }),
                headers: {
                    'Content-type': 'application/json',
                },
            })
            const response = await RegisterData.json();
            if (RegisterData.ok){
                return response;
            }else{
                throw new Error(response.message || "Error en el Registro Verifique sus datos");
            }
        } catch (err) {
            console.log(err)
            throw err;
        }
        }
    }
// Clase donde se define el tamaño del codigo (cupon) y los caracteres que se utilizan para crearlo.
// donde length = tamaño del codigo (cupon) un numero entero
/* el cupon se genera tomando un numero aleatorio entre 0 y 1 (Math.random()) y multiplicandolo por la longitud de la cadena de caracteres, se  redondea hacia abajo devolviendo el entero menor o igual al numero generado = Math.floor. El resultado lo tomamos como la posicion que tenemos que seleccionar en la cadena de caracteres  y se selecciona con charAt() que  devuelve el caracter en esa posicion. asi usando el cliclo for las veces que se establezca el tamaño del codigo.
 */
class Couponalphanumerico {
    constructor(length) {
        this.length = length;
        this.caracteres = '0123456789';
    }
    generador () {
        let coupon = '';
        for (let i = 0; i < this.length; i++) {
            const randomcaracter = Math.floor(Math.random() * this.caracteres.length);
            coupon += this.caracteres.charAt(randomcaracter);
        }
        return coupon;
    }
}

/* Constructor de slider (carrusel), se pregunta la cantidad de elementos del slider, se valida que solo sean numeros. y luego se construye el contenido llenando un array vacio, que tendra de parametro si se activa o no el slider a la vista 
esto va a permitir luego cual de los elementos mostrar.
*/
class sliderconstructor {
    constructor() {
        this.length =  this.getLength();
        this.element = [];
    }
    getLength() {
        let length;
        while (isNaN(length)) {
            length = parseInt(prompt('Indica el número de elementos del slider'));
            if (isNaN(length)) {
                alert('Solo puede colocar valores numéricos');
            }
        }
        return length;
    }
    genedaorslider () {
            alert(`perfecto vamos a crear un slider con ${this.length} elementos, ahora vamos a darle nombre a esos elementos`);
            for(let i = 0; i < this.length; i++) {
                let elementos = prompt(`Indicame el Nombre del elemento ${i + 1}`);
                let contenido = prompt(`indicame el nombre del contenido del elemento ${elementos}`);
                let sliders = {
                    [elementos]: contenido
                };
                //llenamos el array con los objeto de cada elemento del slider definido.
                this.element.push(sliders)
            };
    }
    activeelement(){
        alert('Ahora te preguntaremos que Slider quieres dejar activos, Aceptar para activar y cancelar para dejarlo desactivado y no se muestre en la web.');
        this.element.forEach(slider => {
            let elemento = Object.keys(slider)[0];
            let slidercontent = slider[elemento];
            let activar = confirm(`¿Deseas activar el objeto con clave "${elemento}" y valor "${slidercontent}"?`);
            slider.activado = activar;
        });
        return this.element;
    }
}
class calendar {
    constructor(){
        this.DayAndMounth = [];
    }
    CreateCalendar(){
for (let Y = 2023; Y <=2023; Y++){
    const year = [];
    let Years = {
        [`${Y}`]: year,
    }
    this.DayAndMounth.push(Years);
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const MounthLetter = {};
    months.forEach((M)=>{MounthLetter[M] = []})
    for(let m=0; m < 12;m++){
        let month = [];
        let MounthName = months[m];
        let Mounths = {
            [`${MounthName}`]:month,
        }
        year.push(Mounths);
        const FirtsDay = new Date(Y,m,1).getDate();
        const LastDay = new Date(Y,m + 1, 0).getDate();
        const FDay = new Date(Y,m,1).getDay();
        const daysOfWeek = ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
        for (let d=FirtsDay; d <= LastDay; d++){
            let daysOfWeekIndex = (FDay + d - 1) % 7;
            // no se toman encuenta los domingos.
            if(daysOfWeekIndex != 0){
                let DayName = daysOfWeek[daysOfWeekIndex];
                let Day = {
                    day_id:d,
                    dayName: `${DayName}`
                }
                month.push(Day);
            };
        }
    }
}
    return this.DayAndMounth;
    }
}

class  Reservations {
    constructor(user, bookingDate,bookingId){
        this.data = {
            user : user,
            bookings : bookingDate,
            id_booking : bookingId
        };
    }
    async RequestData(){
        const BookingUrl = BaseUrl + 'bookings';
        try {
            const token = localStorage.getItem('SesionToken');
        if (token){
            const DataBooking = await fetch(BookingUrl,{
                method: 'POST',
                body: JSON.stringify({ data: this.data }),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const response = await DataBooking.json();
            if (DataBooking.ok){
                return response;
            }else{
                throw new Error(`Error en la respuesta de la API: ${DataBooking.status}`);
            }
        }else{
            throw new Error("DEBE INICIAR SESION PARA PODER RESERVAR");
        }
        }
        catch (err) {
            console.log("Error enviando los datos", err);
            throw err;
        }
    }
}



