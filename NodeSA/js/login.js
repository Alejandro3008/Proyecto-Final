window.onload = init;

function init(){
    if(!localStorage.getItem('token')){
        document.querySelector('#btn-signin').addEventListener('click',()=>{
            window.location.href = 'signin.html';
        })

    document.querySelector('#btn-send').addEventListener('click', login)
    }else{
        window.location.href = 'main.html';
    }
}

function login(){
    let mail = document.getElementById('input-email').value,
        password = document.getElementById('input-password').value;
    let respMail = verifyString(mail),
        respPassword = verifyString(password);
        console.log(respMail, respPassword)
    if(respMail && respPassword)
    {
        axios({
            method: 'post',
            url : 'http://localhost:3000/user/login',
            data:{
                admin_mail : mail,
                admin_password : password
            }
        }).then(resp =>{
            if(resp.data.code === 200){
                localStorage.setItem('token', resp.data.message)
                console.log(resp.data.message)
                window.location.href='main.html'
                console.log('Redireccionando a main.html')
            }else{
                console.error('Usuario y/o contraseña incorrectos.')
            }
        }).catch(error =>{
            console.error(error)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Usuario y/o contraseña incorrectos.',
                showConfirmButton: true,
                allowOutsideClick: false
            })
        })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Rellena los campos o inserta valores aceptados.',
            showConfirmButton: true,
            allowOutsideClick: false
        })
    }
}

const verifyString = (value) =>{
    if(!value) return false
    if(typeof value !== 'string' ) return false
    return true
}