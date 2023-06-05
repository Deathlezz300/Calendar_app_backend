const jwt=require('jsonwebtoken');

//Se trabaja con promesas si o si, se importa jwt con require
//se hace el sign con el payload, la palabra secreta o firma
//en cuanto tiempo expira, por ultimo un callback, si se produce
//un error regresa el error, en caso contrario retorna el token

const generarJWT=(uid,name)=>{

    return new Promise((resolve,reject)=>{

        const payload={uid,name};

        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn:'2h'
        },(error,token)=>{

            if(error){
                console.log(error)
                reject('No se pudo generar el token');
            }

            resolve(token);
        });


    });
}


module.exports={
    generarJWT
}