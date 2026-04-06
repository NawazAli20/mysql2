
import express, { json } from 'express';
import routes from './routes.js'; 


let app = express();
let port = 8080;

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));



//start the server
app.listen(port,(err)=>{
    if(err) throw err; 
    console.log("Server is listening at port:"+port);
});

 app.use("/api",routes);
 
export default app;