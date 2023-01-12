const mysql2=require('mysql2')
const pool=mysql2.createPool({
    host:'localhost',
    user:'root',
    port:3307,
    password:'123456',
    database:'studentRegister',
    waitForConnections:true,
})
module.exports=pool