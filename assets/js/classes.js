
// Clase de inicio, donde se saluda y solicita los datos al visitante.
//  pedirdatos funcion (metodo), que solicita los datos, y valida que esten colocados, ya que son obligatorios para continuar.
// datos_complete funcion (metodo), que se ejecuta luego de completar los datos, y se concatena ambos datos para luego usarlo en la indentificacion del cupon.
class saludo {
    constructor() {
        this.Nombre = '';
        this.Apellido = '';
    }
    pedirdatos() {
        alert('Hola Bienvenido a Espacio Ser y Hacer, para continuar necesitamos saber como te llamas: ');
        do {
            this.Nombre = prompt('Podrias indicarnos tu nombre:');
            this.Apellido = prompt('Podrias indicarnos tu Apellido:');
            if (this.Nombre === null || this.Apellido === null) {
                alert('Necesitamos todo los datos para continuar Gracias!!')
            }
        } while (this.Nombre === null || this.Apellido === null);
        };
    datos_complete() {
        let NombreandApellido = `${this.Nombre} ${this.Apellido}`;
        return NombreandApellido;
    }
    }
// Clase donde se define el tamaño del codigo (cupon) y los caracteres que se utilizan para crearlo.
// donde length = tamaño del codigo (cupon) un numero entero
/* el cupon se genera tomando un numero aleatorio entre 0 y 1 (Math.random()) y multiplicandolo por la longitud de la cadena de caracteres, se  redondea hacia abajo devolviendo el entero menor o igual al numero generado = Math.floor. El resultado lo tomamos como la posicion que tenemos que seleccionar en la cadena de caracteres  y se selecciona con charAt() que  devuelve el caracter en esa posicion. asi usando el cliclo for las veces que se establezca el tamaño del codigo.
 */
class Couponalphanumerico {
    constructor(length) {
        this.length = length;
        this.caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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