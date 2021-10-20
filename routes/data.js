const express = require('express');
const data = express.Router();
const db = require('../config/database')

data.post('/addUser', async (req,resp,next) =>{
    const {employee_name,employee_lastName,employee_phone,employee_mail,employee_homeAddress} = req.body
    if(employee_name && employee_lastName && employee_phone && employee_mail && employee_homeAddress){
        let query = `INSERT INTO Employee(employee_name,employee_lastName,employee_phone,employee_mail,employee_homeAddress) VALUES('${employee_name}','${employee_lastName}','${employee_phone}','${employee_mail}','${employee_homeAddress}')`
        const rows = await db.query(query)
        rows.affectedRows == 1 ? resp.status(201).json({code: 201, message:'Empleado insertado correctamente.'}) : resp.status(500).json({code: 500, message: 'Ocurrio un error.'});
        
    }
    return resp.status(500).json({code: 500, message:'Campos incompletos'});
})

data.delete('/:id([0-9]{1,3})', async (req,resp,next)=>{    
    const query = `DELETE FROM Employee WHERE employee_id = ${req.params.id}`;
    const rows = await db.query(query)

    rows.affectedRows == 1 ? resp.status(200).json({code: 200, message: 'Empleado eliminado'}) : resp.status(404).json({code: 404,message: 'Empleado no encontrado'});
})


data.put('/:id([0-9]{1,3})', async (req,resp,next) =>{
    const {employee_name,employee_lastName,employee_phone,employee_mail,employee_homeAddress} = req.body;
    
    if(employee_name && employee_lastName && employee_phone && employee_mail && employee_homeAddress){
        let query = `UPDATE Employee SET employee_name= '${employee_name}', employee_lastName= '${employee_lastName}', employee_phone= '${employee_phone}', employee_mail= '${employee_mail}', employee_homeAddress= '${employee_homeAddress}' WHERE employee_id = ${req.params.id};`;

        const rows = await db.query(query);

        rows.affectedRows == 1 ? resp.status(200).json({code: 200, message:'Empleado modificado correctamente.'}) : resp.status(500).json({code: 500, message: 'Ocurrio un error.'});
    }

    return resp.status(500).json({code: 500, message:'Campos incompletos'});
})

data.get('/', async (req,resp,next)=>{
    const allData = await db.query('SELECT * FROM Employee;')
    allData ? resp.status(200).json({code: 200,message: allData}) : resp.status(500).json({code: 500, message: 'Ocurrio un error'}) 
})

module.exports = data