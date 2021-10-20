window.onload = init;

function init(){
    if(!localStorage.getItem('token')){
        document.querySelector('#btn-login').addEventListener('click', ()=>{
            window.location.href = 'login.html'
        });

        document.querySelector('#btn-send').addEventListener('click', signin);

    }else{
        window.location.href = 'main.html'
    }
}

function signin(){
    let name = document.getElementById('input-name').value,
        mail = document.getElementById('input-email').value,
        password = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
        data:{
            admin_name : name,
            admin_mail : mail,
            admin_password : password
        }
    }).then(resp =>{
        console.log(resp)
        window.location.href = 'login.html'
    }).catch(error =>{
        console.log(error)
    })

}