const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const { encrypt } = require('./Helper/crypt');

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'practica'
});


app.post("/Login", async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const passHash = await encrypt(password)
    console.log(passHash)
    console.log("h")
    db.query('INSERT INTO `usernew`(`email`, `name`, `password`) VALUES (?,?,?)',[email,name, passHash],
    (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("User Created")
        }
    }
    
    );
});

app.get("/api/Login", (req, res) => {
    const email = req.body.email
    const password = req.body.password
    db.query('SELECT * FROM usernew WHERE email = ? AND password = ?',[email, password],
    (err, result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Success")
        }
    }
    
    );
});

app.listen(3001,()=> {
    console.log("Corriendo en el puerto 3001")
});