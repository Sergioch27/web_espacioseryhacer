// funcion pra el manejo del inicio de sesion.
function LogingetData(){
    const LoginForm = document.getElementById('InicioSesion');
    LoginForm.addEventListener('submit', async e => {
        e.preventDefault();
        //se coloca un loader mientras se ejecuta la promesa, luego se regresa a valor original.
        const buttonZone = document.getElementById('ButtonSubmit');
        buttonZone.innerHTML = '<span class="loader"></span>';
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        const Mylogin = new  loginAndRegister(data);
        try {
            const Login = await Mylogin.LogiDatos();
            localStorage.setItem('SesionToken',`${Login['jwt']}`);
            localStorage.setItem('UserName', `${Login['user']['username']}`);
            const UserZone = document.getElementById('user');
            UserZone.childNodes[2].nodeValue = `${Login['user']['username'].toUpperCase()}`;
            const myModal = document.getElementById('LoginModal');
            const buttonClose = myModal.childNodes[1];
            buttonClose.childNodes[3].click();
            document.getElementById('logout').classList.remove('hide');
            document.getElementById('register').style.display = 'none';
            e.preventDefault();
            console.log(Login);
        } catch (error) {
            console.error("Error de Login", error);
            const buttonZone = document.getElementById('ButtonSubmit');
            buttonZone.innerHTML = 'INICIAR SESION';
            const LoginRes = document.getElementById('LoginRes');
            LoginRes.innerText = "Error de Usuario y Contraseña";
        } finally {
            LoginForm.reset();
            buttonZone.innerHTML = 'INICIAR SESION';
        }
    })
}
//verifica que un usuario ya este con sesion iniciada esto es por que se guarda un token en el localStorege y se consulta si existe. 
function VerifyLogin(){
    if(localStorage.getItem('SesionToken')){
        let UserData = localStorage.getItem('UserName');
        const UserZone = document.getElementById('user');
        document.getElementById('logout').classList.remove('hide');
        document.getElementById('register').style.display = 'none';
        UserZone.childNodes[2].nodeValue = `${UserData.toUpperCase()}`;
    }
}
//funcion para el cierre de sesion limpiando el localstorege.
function logout(){
    document.getElementById('logout').addEventListener('click', e=>{
        e.preventDefault();
        localStorage.removeItem('SesionToken', );
        localStorage.removeItem('UserName');
        document.getElementById('logout').classList.add('hide');
        document.getElementById('register').removeAttribute('style');
        const UserZone = document.getElementById('user');
        UserZone.childNodes[2].nodeValue = 'ENTRAR';
    })
}
//funcion para el registro de nuevos usuarios.
function register(){
    const RegisterForm = document.getElementById('RegisterUser');
    RegisterForm.addEventListener('submit', async e => {
        e.preventDefault();
        const buttonZone = document.getElementById('ResSubmit');
        buttonZone.innerHTML = '<span class="loader"></span>';
        const data = Object.fromEntries(
            new FormData(e.target)
        )
        const MyRegister = new loginAndRegister(data);
        try {
            const NewUser = await MyRegister.RegisterUser();
            console.log(NewUser);
            //se cambia el contenido del modal.
            const ZoneBody = document.getElementById('ResBody');
            ZoneBody.innerHTML = `<div>REGISTRO EXITOSO</div> <div>${NewUser['user']['username']}</div> <div><button id="ButtonSubmitRes" type="submit" class="btn btn-primary mb-3" data-bs-toggle="offcanvas" data-bs-target="#LoginModal">INICIAR SESIÓN</button>
            </div>`
            const RegisterModalClose = document.getElementById('ButtonSubmit');
            RegisterModalClose.addEventListener('click', e=>{
                e.defaultPrevented();
                const MyRegisterModal = document.getElementById('RegisterModal');
                const buttonClose = MyRegisterModal.childNodes[1];
                buttonClose.childNodes[3].click();
            })
        } catch (error) { //manejo de errores.
            console.error("Error de Registro", error);
            const buttonZone = document.getElementById('ResSubmit');
            buttonZone.innerHTML = 'REGISTRARSE';
            const LoginRes = document.getElementById('RegisterRes');
            LoginRes.innerText = "Error en Registro por favor verifique sus datos";
        }
        })
}
document.addEventListener('DOMContentLoaded',()=>{
    register();
    LogingetData();
    VerifyLogin();
    logout();
});


