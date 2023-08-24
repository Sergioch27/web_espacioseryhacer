// let NewLogin = new login();
// const MyLogin = NewLogin.PedirDatos(data);
function getData(){
    let LoginForm = document.getElementById('InicioSesion');
    LoginForm.addEventListener('submit', e => {
        e.preventDefault();
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        const Mylogin = new  login(data);
       Mylogin.EnviarDatos();
        console.log(data);
    })
}
getData();
