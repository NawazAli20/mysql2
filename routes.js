import con from './connection.js';
//import app from './server.js';
import express from 'express'; 

const router = express.Router();



// let app = express();
// let port = 8080;

// app.use(express.urlencoded({extended:false}));
// app.use(express.static("public"));



router.get("/",async function(req,res){
let q = "select * from student";

try{
    const [results] = await con.query(q);
    res.status(200).json(results);
}catch(err){
    res.status(500).send(err);
}

});

//Information for a specific student
router.get("/student/:id",async (req,res)=>{
let id = req.params.id;
let q = "select * from student where ID=?";
try{
    const [rows,fields] = await con.query(q,[id]);
    res.json(rows);
}catch(err){
    res.status(500).json(err);
}
});

//add a new student
router.post("/add",async (req,res)=>{
    let name = req.body.name;
    if(name){
        try{
        let q = "insert into student (name) values(?)";
        const [result] = await con.query(q,[name]);
        res.json(result);
        }catch(err){
            res.status(500).json(err);
        }
    }else{ //no name entered
        res.send("Enter a student name");
    }
})

//update a student 
router.post("/update",async (req,res)=>{
    let name = req.body.name;
    let id = req.body.id;
    if(name && id){
        try{
        let q = "update student set name=? where ID=?";
        const [result] = await con.query(q,[name,id]);
        if(result.affectedRows==0)
            res.json("Enter a valid student name and id");
        else
            res.json(result);
        }catch(err){
            res.status(500).json(err);
        }
    }else{//name or id is missing
        res.send("Enter a student name and id");
    }
})

//delete a student
router.post("/delete",async (req,res)=>{
    let id = req.body.id;
    if(id){
        try{
        let q = "delete from student where id=?";
        const [ result] = await con.query(q,[id]);
            if(result.affectedRows==0){
                res.json("No student with ID: "+id+" is found");
            }
            else
                res.json(result.affectedRows+" student is deleted with ID: "+id);
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.send("Enter a student id");
    }
})

export default router;