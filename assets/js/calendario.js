
let MyCalendar = new calendar();
const NewCalendar = MyCalendar.CreateCalendar();
let Booking_date = JSON.parse(sessionStorage.getItem('Booking')) || [];
let button = '';
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
                        for(let day of Dias){
                            button = document.createElement('a');
                            let ListaDias = document.createElement('tr');
                            const id_day = `${NombreMes.charAt(0)}${day.dayName.charAt(0)}${day.day_id}`;
                            button.setAttribute('id', `${id_day}`);
                            button.setAttribute('data-fecha', `${day.dayName} ${day.day_id} ${NombreMes} ${y}` );
                            button.classList.add('day_a')
                            button.appendChild(ListaDias);
                            ListaDias.textContent = `${day.dayName} ${day.day_id}`;
                            Trtable.appendChild(button);
                            // console.log(button);
                            evenClic();
                            // console.log(day);
                        };
            }
                }
        }
    }
}
function evenClic(){
            // console.log(button);
            button.addEventListener("click",()=>{
            let fecha = button.getAttribute('data-fecha');
            Booking_date.push(fecha);
            SaveBooking();
            GetBooking();
            // console.log(Booking_date);
        });
    return Booking_date;
}
function SaveBooking(){
    const Bookings = JSON.stringify(evenClic());
    let NumberDay = localStorage.setItem('TotalDays',`${Bookings}`);
    let AllBooking = sessionStorage.setItem('Booking',`${Bookings}`);
    return AllBooking, NumberDay;
}
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
            // console.log(TotalDays);
    } else {
        DayNumber.textContent = '0';
    }
}
document.addEventListener('DOMContentLoaded',()=>{
    CreateCaledar();
    GetBooking();
    evenClic();
})