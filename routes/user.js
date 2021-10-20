const express = require('express')
const user = express.Router();
const jwt = require('jsonwebtoken')
const db = require('../config/database')

user.post('/signin', async (req,resp,next )=>{
    const {admin_name,admin_mail,admin_password} = req.body;

    if(admin_name && admin_mail && admin_password){
        let query = `INSERT INTO Administrators (admin_name, admin_mail, admin_password) VALUES ('${admin_name}', '${admin_mail}', '${admin_password}');`
        const rows = await db.query(query);

        rows.affectedRows == 1 ? resp.status(201).json({code: 200, message: 'Usuario agregado.'}) : resp.status(500).json({code: 500, message: 'Hubo un error.'});

    }
    resp.status(500).json({code: 500,message:'Campos incompletos.'})
});

user.post('/login', async (req,resp,next) =>{
    const {admin_mail,admin_password} = req.body;
    const query = `SELECT * FROM Administrators WHERE admin_mail = '${admin_mail}' AND admin_password = '${admin_password}';`;
    const rows = await db.query(query);

    if(admin_mail && admin_password){
        if(rows.length == 1){
            const token = jwt.sign({
                admin_id : rows[0].admin_id,
                admin_mail : rows[0].admin_mail
            },'debugkey')
            return resp.status(200).json({code: 200, message: token});
        }else{
            return resp.status(401).json({code: 401, message: 'email y/o contraseña incorrectos.'});
        }
    }
    return resp.status(500).json({code: 500, message: 'Campos incompletos'});
})

module.exports = user;