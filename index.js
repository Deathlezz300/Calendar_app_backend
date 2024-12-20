const express=require('express');
const {DBconection}=require('./database/config');
const cors=require('cors');

require('dotenv').config();

//Crear servidor de express

//console.log(process.env); //para ver las variables de entorno

const app=express();

//Directorio publico

//Inicializar conexion

DBconection();

//CORS

app.use(cors({
    origin:["https://calendar-app-react30.netlify.app"]
}));

app.use(express.static('public'))  //midleware funcion que se ejecute cuando se hace una peticion

//Lectura y parseo del body

app.use(express.json());

//Rutas

app.use('/api/auth',require('./Routes/auth'));  //Se crea una ruta y se importa una cantida x de rutas en un archivo

app.use('/api/eventos',require('./Routes/events'));

// app.get('/',(req,res)=>{
//     console.log("Se solicitó el /")
//     res.json({
//         ok:true,
//         message:"Sapo"
//     })
// })

//Escuchar peticiones
app.listen(process.env.PORT, () => console.log(`Servidor corriendo en puerto ${process.env.PORT}`));
