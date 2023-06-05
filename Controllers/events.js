


const express=require('express');
const Evento=require('../models/EventoModel');


const obtenerEventos=async(req=express.request,res=express.response)=>{


    //Con esto hago la peticion de todos los eventos y extraigo el name del usuario
    const eventos= await Evento.find().populate('user','name');

    res.status(200).json({
        ok:true,
        eventos
    });

}


const crearEvento=async(req=express.request,res=express.response)=>{


    const evento=new Evento(req.body);

    try{

        //Se extrae el UID que carga de forma interna el token JWT
        evento.user=req.uid;

        const eventoGuardado=await evento.save();

        res.status(201).json({
            ok:true,
            eventoGuardado
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            message:'Hable con el administrador'
        })
    }

}

const ActualizarEvento=async(req=express.request,res=express.response)=>{

    const eventoID=req.params.id;

    try{

        const evento=await Evento.findById(eventoID);

        if(!evento){
           return res.status(404).json({
                ok:false,
                message:'Este evento no existe'
            })
        }

        if(evento.user.toString()!=req.uid){
            return res.status(401).json({
                ok:false,
                message:'No tiene permiso de editar este evento'
            })
        }

        const nuevoEvento={
            ...req.body,
            user:req.uid
        }

        //Automaticamente retorna el viejo elemento en caso de querer comparar
        //Si se quiere el ultimo elemento agregado agregar ,{new:true}
        const eventoActualizado=await Evento.findByIdAndUpdate(eventoID,nuevoEvento,{new:true});

        res.status(200).json({
            ok:true,
            evento:eventoActualizado
        })


    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            message:'Hable con el administrador'
        })
    }
}

const BorrarEvento=async(req=express.request,res=express.response)=>{

    const eventoID=req.params.id;

    try{
        const evento=await Evento.findById(eventoID);

        if(!evento){
            return res.status(404).json({
                ok:false,
                message:'Este evento no existe'
            })
        }

        if(evento.user.toString()!=req.uid){
            return res.status(401).json({
                ok:false,
                message:'No tiene permiso de eliminar este evento'
            })
        }

        const eventoEliminado= await Evento.findByIdAndDelete(eventoID);

        res.status(200).json({
            ok:true,
            eventoEliminado
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            message:'Hable con el administrador'
        })
    }

}

module.exports={
    obtenerEventos,
    crearEvento,
    ActualizarEvento,
    BorrarEvento
}