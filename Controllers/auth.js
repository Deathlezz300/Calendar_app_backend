const express=require('express');
const {validationResult}=require('express-validator');
const Usuario=require('../models/UsuarioModel');
const bcrypt=require('bcryptjs');
const {generarJWT}=require('../Helpers/JWT')

//Se importar express y se iguala a expres.responde para tener
//la ayuda de los metodos

const crearUsuario=async(req=express.request,res=express.response)=>{

    const {email,password}=req.body;
    try{

        let usuario1= await Usuario.findOne({email})

        if(usuario1){
            return res.status(400).json({
                ok:false,
                message:'Un usuario existe con este correo'
            })
        } 

        const usuario=new Usuario(req.body);

        //Encriptar contraseña

        const salt=bcrypt.genSaltSync();

        usuario.password=bcrypt.hashSync(password,salt);

        await usuario.save();

        //Generar JWT

        const token=await generarJWT(usuario.id,usuario.name);

        res.status(201).json({
            ok:true,
            uid:usuario.id,
            name:usuario.name,
            token
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            message:'Por favor hable con el administrador'
        })
    }
};

const LoginUsuario=async(req=express.request,res=express.response)=>{
    
    const {email,password}=req.body;

    try{

        let usuario1= await Usuario.findOne({email})

        if(!usuario1){
            return res.status(400).json({
                ok:false,
                message:'No existe un usuario con este correo'
            })
        }

        //Confirmar las contraseñas

        const validaPassword=bcrypt.compareSync(password,usuario1.password);

        if(!validaPassword){
            return res.status(400).json({
                ok:false,
                message:'Credenciales incorrectas'
            })
        }

        //Generar JWT

        const token= await generarJWT(usuario1.id,usuario1.name);

        res.json({
            ok:true,
            uid:usuario1.id,
            name:usuario1.name,
            token:token
        })

    }catch(error){
        res.status(500).json({
            ok:false,
            message:error
        })
    }

}

//Si se valida el token con el middleware se da paso a crear
//un nuevo token con el uid y nombre del usuario
const RenovarToken=async(req=express.request,res=express.response)=>{
    
    const uid=req.uid;
    const name=req.name;

    const token=await generarJWT(uid,name)

    res.json({
        ok:true,
        uid,
        name,
        token
    })
}

module.exports={
    crearUsuario,
    LoginUsuario,
    RenovarToken
}