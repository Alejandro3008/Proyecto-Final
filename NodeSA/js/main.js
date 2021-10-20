window.onload = init
var header = {}
    url = 'http://localhost:3000'

function init(){
    if(localStorage.getItem('token')){
        headers = {
            headers :{
                'Authorization': "bearer " + localStorage.getItem('token')
            }
        }
        loadData();
        let btnAddEmployee =document.getElementById('btn-addEmployee').addEventListener('click',displayAddEmployee),
        btnCancel = document.getElementById('btn-Cancel').addEventListener('click',cancelInformation),
        btnSendInfo = document.getElementById('btn-sendInfo').addEventListener('click',addEmployee),
        btnCancelEdit = document.getElementById('btn-CancelEdit').addEventListener('click',cancelEditInfo),
        btnCloseSession = document.getElementById('btnCloseSession').addEventListener('click', () => {
            localStorage.removeItem('token')
            location.reload()
        })
    }else{
        window.location.href = 'index.html'
    }
}

function loadData(){
    axios.get(url +'/employee', headers)
    .then(resp =>{
        displayData(resp.data.message);
    }).catch(error =>{
        console.error(error)
    })
}

const displayData = (dataList) =>{
    const docFragment = document.createDocumentFragment();
    const dataContainer = document.querySelector('.containerContent');
    for(let i=0; i<dataList.length;i++){
        let  employeeContainer = document.createElement('DIV'),
        containerEmployeeInformation = document.createElement('DIV'),
        employeeInformation1 = document.createElement('ARTICLE'),
        employeeInformation2 = document.createElement('ARTICLE'),
        employeeInformation3 = document.createElement('ARTICLE'),
        employeeInformation4 = document.createElement('ARTICLE'),
        employeeInformation5 = document.createElement('ARTICLE'),
        employeeInformation6 = document.createElement('ARTICLE'),
        employeeActions = document.createElement('DIV'),
        buttonEdit = document.createElement('BUTTON'),
        buttonDelete = document.createElement('BUTTON') 
        employeeContainer.classList = 'employeeContainer'
        containerEmployeeInformation.classList = 'containerEmployeeInformation'
        employeeInformation1.classList = 'employeeInformation'
        employeeInformation2.classList = 'employeeInformation'
        employeeInformation3.classList = 'employeeInformation'
        employeeInformation4.classList = 'employeeInformation'
        employeeInformation5.classList = 'employeeInformation'
        employeeInformation6.classList = 'employeeInformation'
        employeeActions.classList = 'employeeActions'
        buttonEdit.classList = 'btn-employeeAction'
        buttonDelete.classList = 'btn-employeeAction'
        buttonEdit.innerText = 'Editar';
        buttonDelete.innerText = 'Eliminar';
        buttonEdit.setAttribute('id',`EditEmployee`)
        buttonDelete.setAttribute('id',`DeleteId`)
        employeeActions.appendChild(buttonEdit)
        employeeActions.appendChild(buttonDelete)
        employeeInformation1.innerHTML = `<p class="information bold">ID: </p>
        <p class="information idValue">${dataList[i].employee_id}</p>`
        employeeInformation2.innerHTML = `<p class="information bold">Nombre: </p>
        <p class="information nameValue">${dataList[i].employee_name}</p>`
        employeeInformation3.innerHTML = `<p class="information bold">Apellidos: </p>
        <p class="information lastNameValue">${dataList[i].employee_lastName}</p>`
        employeeInformation4.innerHTML = `<p class="information bold">Telefono: </p>
        <p class="information phoneValue">${dataList[i].employee_phone}</p>`
        employeeInformation5.innerHTML = `<p class="information bold">Email: </p>
        <p class="information mailValue">${dataList[i].employee_mail}</p>`
        employeeInformation6.innerHTML = `<p class="information bold">Direccion: </p>
        <p class="information homeAddressValue">${dataList[i].employee_homeAddress}</p>`
        containerEmployeeInformation.appendChild(employeeInformation1)
        containerEmployeeInformation.appendChild(employeeInformation2)
        containerEmployeeInformation.appendChild(employeeInformation3)
        containerEmployeeInformation.appendChild(employeeInformation4)
        containerEmployeeInformation.appendChild(employeeInformation5)
        containerEmployeeInformation.appendChild(employeeInformation6)
        employeeContainer.appendChild(containerEmployeeInformation)
        employeeContainer.appendChild(employeeActions)
        docFragment.appendChild(employeeContainer)
    }
    dataContainer.appendChild(docFragment)  
}

const displayAddEmployee = () =>{
    let addEmployee = document.getElementById('addEmployee'),
    btnmenuContainer = document.getElementById('menuContainer'),
    btncontainerContent = document.getElementById('containerContent'),
    employeeContainer = document.querySelector('.employeeContainer')
    addEmployee.classList.toggle('none')
    btnmenuContainer.classList.toggle('blur')
    btncontainerContent.classList.toggle('blur')
    employeeContainer.classList.toggle('blur')
    
}

const cancelInformation = () =>{
    let addEmployee = document.getElementById('addEmployee'),
    btnmenuContainer = document.getElementById('menuContainer'),
    btncontainerContent = document.getElementById('containerContent'),
    employeeContainer = document.querySelector('.employeeContainer')
    addEmployee.classList.toggle('none')
    btnmenuContainer.classList.toggle('blur')
    btncontainerContent.classList.toggle('blur')
    employeeContainer.classList.toggle('blur')
}

function addEmployee(){
    let name = document.getElementById('name-Employee').value,
    lastName = document.getElementById('lastName-Employee').value, 
    phone = document.getElementById('phone-Employee').value,
    mail = document.getElementById('mail-Employee').value,
    homeAddress = document.getElementById('homAddress-Employee').value
    phone = parseInt(phone)

    respName = verifyString(name)
    respLastName = verifyString(lastName)
    respPhone = verifyNumber(phone)
    respMail = verifyString(mail)
    respHomeAddress = verifyString(homeAddress)

    if((respName && respLastName && respPhone && respMail && respHomeAddress) == true){
        Swal.fire({
            title: '¿Seguro que deseas agregar al empleado?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Acepto'
        }).then(resp =>{
            if(resp.isConfirmed){
                axios({
                    headers :{
                        'Authorization': "bearer " + localStorage.getItem('token')
                    },
                    method: 'post',
                    url: 'http://localhost:3000/employee/addUser',
                    data: {
                        employee_name: name,
                        employee_lastName: lastName,
                        employee_phone: phone,
                        employee_mail: mail,
                        employee_homeAddress: homeAddress
                    }
                }).then(resp =>{
                    console.log(resp)
                    Swal.fire(
                        'Añadido!',
                        'Empleado añadido',
                        'succes'
                    )
                    cancelInformation()
                    loadData();
                }).catch(error => console.log(error))
            }
        })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Verifica los datos.',
            showConfirmButton: true,
            allowOutsideClick: false
        })
    }
}

const deleteEmployee = (element,event,selector,handler) =>{
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

deleteEmployee(document,'click','#DeleteId',e =>{
    const row = e.target.parentNode.parentNode
    deleteID = row.querySelector('.idValue').innerHTML
    Swal.fire({
        title: '¿Estas seguro?',
        text: 'No podras recuperar el registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
    }).then(resp =>{
        if(resp.isConfirmed){
            axios({
                headers :{
                    'Authorization': "bearer " + localStorage.getItem('token')
                },
                method: 'delete',
                url: `http://localhost:3000/employee/${deleteID}`
            }).then(resp =>{
                console.log(resp)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Empleado Eliminado!',
                    showConfirmButton: false,
                    timer: 1000
                })
                
            })
            .then(() => location.reload())
            .catch(error => console.log(error))
        }
    })
})

function displayEditInfo(){
    let addEmployee = document.getElementById('EditEmployeeContainer'),
    btnmenuContainer = document.getElementById('menuContainer'),
    btncontainerContent = document.getElementById('containerContent'),
    employeeContainer = document.querySelector('.employeeContainer')
    addEmployee.classList.toggle('none')
    btnmenuContainer.classList.toggle('blur')
    btncontainerContent.classList.toggle('blur')
    employeeContainer.classList.toggle('blur')
}

function cancelEditInfo(){
    let addEmployee = document.getElementById('EditEmployeeContainer'),
    btnmenuContainer = document.getElementById('menuContainer'),
    btncontainerContent = document.getElementById('containerContent'),
    employeeContainer = document.querySelector('.employeeContainer')
    addEmployee.classList.toggle('none')
    btnmenuContainer.classList.toggle('blur')
    btncontainerContent.classList.toggle('blur')
    employeeContainer.classList.toggle('blur')
}

const editEmployee = (element,event,selector,handler) =>{
    element.addEventListener(event, e =>{
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

editEmployee(document,'click','#EditEmployee', e =>{
    const row = e.target.parentNode.parentNode
    console.log(row)
    let name = row.querySelector('.nameValue').innerHTML,
        id = row.querySelector('.idValue').innerHTML,
        lastName = row.querySelector('.lastNameValue').innerHTML,
        phone = row.querySelector('.phoneValue').innerHTML,
        mail = row.querySelector('.mailValue').innerHTML,
        homeAddress = row.querySelector('.homeAddressValue').innerHTML;
    document.querySelector('#inputName').value=name
    document.querySelector('#inputLastName').value=lastName
    document.querySelector('#inputPhone').value=phone
    document.querySelector('#inputMail').value=mail
    document.querySelector('#inputHomeAddress').value=homeAddress

    displayEditInfo()

    console.log(name,lastName,phone,mail,homeAddress)

    let btnSendInfoEdited = document.getElementById('btn-sendInfoEdited').addEventListener('click', () => sendEditInfo(id))
})

function sendEditInfo(id){
    let nameEdited = document.querySelector('#inputName').value,
        lastNameEdited = document.querySelector('#inputLastName').value,
        phoneEdited = document.querySelector('#inputPhone').value,
        mailEdited = document.querySelector('#inputMail').value,
        homeAddressEdited = document.querySelector('#inputHomeAddress').value;
    phoneEdited = parseInt(phoneEdited)

    respName = verifyString(nameEdited)
    respNameOnlyLetters = onlyLetters(nameEdited)
    respLastName = verifyString(lastNameEdited)
    respLastNameOnlyLetters = onlyLetters(lastNameEdited)
    respPhone = verifyNumber(phoneEdited)
    respMail = verifyString(mailEdited)
    respHomeAddress = verifyString(homeAddressEdited)

    if((respName && respNameOnlyLetters && respLastNameOnlyLetters && respLastName && respPhone && respMail && respHomeAddress) == true){
        Swal.fire({
            title: '¿Estas seguro?',
            text: 'No podras recuperar el registro',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceptar'
        }).then(resp =>{
            if(resp.isConfirmed){
                axios({
                    headers :{
                        'Authorization': "bearer " + localStorage.getItem('token')
                    },
                    method: 'put',
                    url: `http://localhost:3000/employee/${id}`,
                    data: {
                        employee_name: nameEdited,
                        employee_lastName: lastNameEdited,
                        employee_phone: phoneEdited,
                        employee_mail: mailEdited,
                        employee_homeAddress: homeAddressEdited
                    }
                }).then(resp =>{
                    console.log(resp)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Empleado Actualizado',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    
                })
                .then(() => location.reload())
                .catch(error => console.log(error))
            }
        })
    }else{
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Verifica los datos.',
            showConfirmButton: true,
            allowOutsideClick: false
        })
    }
}

// * Verificaciones 

const verifyString = (value) =>{
    if(!value) return false
    if(typeof value !== 'string' ) return false
    return true
}

const verifyNumber = (value) =>{
    if(!value) return false
    if(typeof value !== 'number') return false
    return true
}

const onlyLetters = value => (!/^[a-zA-Z\ áéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) ? false : true 