import mysql from 'mysql2/promise';


let con = await mysql.createConnection({
host:'localhost',
user:'root',
database: 'DB1',
password:""
});

 con.connect((err)=>{
    if(err) throw err; 
    console.log("Database is connected");
})

export default con; 
