// Logica para traer la data del calendario creada en la clase calendar, y modificar el DOM para mostrar, se colocan varias funciones que hacen que el calendario se pueda mostrar y usar.
let MyCalendar = new calendar();
const NewCalendar = MyCalendar.CreateCalendar();
let Booking_date = JSON.parse(sessionStorage.getItem('Booking')) || [];
function CreateCaledar(){
    const calendaElement_1 = document.getElementById('calendar_section');
    let Calendario = document.createElement('table');
    Calendario.classList.add('style_table');
    calendaElement_1.appendChild(Calendario);
    const CaleEncabezado  = document.createElement('thead');
    const ThTable = document.createElement('tr');
    Calendario.appendChild(CaleEncabezado);
    CaleEncabezado.append(ThTable);

    const BodyTable = document.createElement('tbody');
    Calendario.appendChild(BodyTable);
// cada uno de los cliclos que me permiten iterar sobre el objeto calendario que trae los años mes y dias de cada mes. 
    for (let YearData of NewCalendar){
        for (let y in YearData) {
            let MounthsData = YearData[y];
            for (let Mounthdata of MounthsData) {
                for (let m in Mounthdata){
                    let NombreMes = m;
                    let Dias = Mounthdata[m];
                    let listaMeses = document.createElement('th');
                    listaMeses.innerHTML = NombreMes;
                    ThTable.appendChild(listaMeses);
                        console.log(NombreMes);
                        const Trtable = document.createElement('td');
                        Trtable.classList.add('td_day');
                        BodyTable.append(Trtable);
                        // se muestran los dias dentro de los tr de la tabla y dentro del los mismo existen etiquetas a para hacer de cada tr un boton. se setean los atrivutos que seran los value de cada boton.
                        //el id de cada boton es la inicial del MES la INICIAL DEL DIA  Y EL DIA EN NUMERO.
                        for(let day of Dias){
                            const button = document.createElement('a');
                            let ListaDias = document.createElement('tr');
                            const id_day = `${NombreMes.charAt(0)}${day.dayName.charAt(0)}${day.day_id}`;
                            button.setAttribute('id', `${id_day}`);
                            button.setAttribute('data-fecha', `${day.dayName} ${day.day_id} ${NombreMes} ${y}` );
                            // se agrega una clase para manejar los estilos. 
                            button.classList.add('day_a')
                            button.appendChild(ListaDias);
                            //se estable el contenido de cada boton. cada celda de la tabla. 
                            ListaDias.textContent = `${day.dayName} ${day.day_id}`;
                            Trtable.appendChild(button);
                            // console.log(button);
                            // console.log(day);
                        };
            }
                }
        }
    }
    evenClic();
}
//Creamos cada unos de los botones sobre las fechas, extrayendo el value de cada boton. 
function evenClic(){
    const buttons = document.querySelectorAll('.day_a');

    buttons.forEach(button=>{
        button.addEventListener("click",()=>{
            let fecha = button.getAttribute('data-fecha');
            Booking_date.push(fecha);
            if(localStorage.getItem('SesionToken')){
                SaveBooking();
                GetBooking();
            } else{
                Swal.fire({
                    icon: 'error',
                    title: 'INICIA SESION',
                    text: 'DEBES INICIAR SESION PARA RESERVAR',
                  })

            }
            console.log(button);
            console.log(Booking_date);
    })
        });
}
//guardamos la seleccion del cliente en el locaStorege.
function SaveBooking(){
    const Bookings = JSON.stringify(Booking_date);
    localStorage.setItem('TotalDays',`${Bookings}`); 
    sessionStorage.setItem('Booking',`${Bookings}`);
}
// se uso entregas anteriores permitia saber cuantos dias seleciono el cliente. ahora no se muestra por que esta funcionando con el API, ese contenido es sustituido mas abajo. 
function GetBooking(){
    let OldLocalStore =  sessionStorage.getItem('Booking');
    const TotalDaySection = document.getElementById('Total_Day');
    TotalDaySection.classList.add('text_size');
    TotalDaySection.innerHTML = '<span>Dias Selecionados: </span>';
    const DayNumber = document.createElement('span');
    TotalDaySection.appendChild(DayNumber);
    if (OldLocalStore) {
        const TotalDays = JSON.parse(OldLocalStore).length;
        DayNumber.textContent =  `${TotalDays}`;
            console.log(TotalDays);
    } else {
        DayNumber.textContent = '0';
    }
}
//Funcion para enviar las reservas realizadas por el cliente al API.
function SendBooking(){
    const buttonSend = document.getElementById('sendbooking');
    buttonSend.addEventListener('click', async e=>{
        e.preventDefault();
        buttonSend.innerHTML = '<span class="loader"></span>';
        const user =localStorage.getItem('UserName');
        //Se usa la clase Couponalphanumerico creada como una entrega anterior para crear un id numerico ramdom.
        const code = new Couponalphanumerico(4);
        const bookingId = code.generador();
        console.log(bookingId);
        //Se toma el array de dias seleccionados de la funcion GetBooking que retorna esos dias sacandolos del sessionStorage.
        const bookingDate = JSON.parse(sessionStorage.getItem('Booking'));
        //Se llama  la clase para envio de datos de la reserva.
        const SendUserBooking = new Reservations(user, bookingDate,bookingId);
        try {
            if(bookingDate != null){
                const UserBooking = await SendUserBooking.RequestData();
                const SendReservation = document.getElementById('mensaje'); //donde mostraremos el mensaje luego de reservar.
                const createDate = UserBooking.data.attributes.createdAt;
                const NewFormatCreateDate = new Date(createDate);
                const Year = NewFormatCreateDate.getFullYear();
                const Mes = (NewFormatCreateDate.getMonth() + 1).toString().padStart(2, '0');
                const Dia = NewFormatCreateDate.getDate().toString().padStart(2, '0');
                const hora = NewFormatCreateDate.getHours().toString().padStart(2, '0');
                const Minutos = NewFormatCreateDate.getMinutes().toString().padStart(2, '0');
                const NewDateCreate = `${Year}-${Mes}-${Dia} ${hora}:${Minutos}`;
                Swal.fire({
                    icon: 'success',
                    title: 'RESERVA EXITOSA',
                    text: SendReservation.innerHTML = `${UserBooking.data.attributes.user.toUpperCase()} SU RESEVA A SIDO CREADA CON EXITO EL ${NewDateCreate}`,
                    showConfirmButton: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  })
                  sessionStorage.removeItem('Booking');
                  localStorage.removeItem('TotalDays');
                console.log(UserBooking); //probamos lo que recibimos del API repuesta.
            }else{
                const buttonSend = document.getElementById('sendbooking');
                buttonSend.innerHTML = "RESERVAR";
                Swal.fire({
                    icon: 'error',
                    title: 'FALTAN DATOS',
                    text: 'DEBES SELECIONAR LOS DIAS QUE DESEAS RESERVAR',
                  })
            }
            //formateamos la fecha de creacion recibida como la respuesta 200 del API.
        } catch (error){ // manejo de errores. 
            console.error("Error en proceso de reserva", error);
            const buttonSend = document.getElementById('sendbooking');
            buttonSend.innerHTML = "RESERVAR";
            const ZoneMassage = document.getElementById('mensaje');
            ZoneMassage.innerHTML = 'Debe Iniciar Sesion para poder reservar'
        } 
        finally { // manejamos que sucede luego de la respuesta. por ahora esta asi se debe optimizar para hacer un manejo por separado, ya que esto se ejecuta independientemente de la respuesta recibida es decir si falla o si es saticfactoria. 
            const buttonSend = document.getElementById('sendbooking');
            buttonSend.innerHTML = "RESERVAR";
        }
    })
}
// ejecutamos luego de que todo el DOM sea cargado, asi aseguramos que todos los elementos fijos necesario esten disponibles. 
document.addEventListener('DOMContentLoaded',()=>{
    CreateCaledar();
    GetBooking();
    SendBooking()
})