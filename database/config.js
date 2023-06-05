const mongoose=require('mongoose');

const DBconection=async()=>{

    try{

        await mongoose.connect(process.env.DB_CNN);


        console.log('Base de datos iniciada');

    } catch(error){
        console.log(error);
        throw new Error('Error al inicializar la base de datos');
    }

}

module.exports={
    DBconection
}