// let NewLogin = new login();
// const MyLogin = NewLogin.PedirDatos(data);
function LogingetData(){
    let LoginForm = document.getElementById('InicioSesion');
    LoginForm.addEventListener('submit', async e => {
        e.preventDefault();
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        const Mylogin = new  login(data);
        const Login = await Mylogin.EnviarDatos();
        localStorage.setItem('SesionToken',`${Login['jwt']}`);
        localStorage.setItem('UserName', `${Login['user']['username']}`);
        const UserZone = document.getElementById('user');
        UserZone.childNodes[2].nodeValue = `${Login['user']['username'].toUpperCase()}`;
        const myModal = document.getElementById('LoginModal');
        const buttonClose = myModal.childNodes[1];
        buttonClose.childNodes[3].click();

        console.log(Login);
    })
}
function VerifyLogin(){
    if(localStorage.getItem('SesionToken')){
        let UserData = localStorage.getItem('UserName');
        const UserZone = document.getElementById('user');
        UserZone.childNodes[2].nodeValue = `${UserData.toUpperCase()}`;
    }
}
LogingetData();
VerifyLogin();


