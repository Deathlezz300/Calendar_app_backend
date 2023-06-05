const {Schema,model}=require('mongoose');

const EventoSchema=Schema({
    title:{
        type:String,
        required:true
    },
    notes:{
        type:String
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    //Se le dice a mongo que el user será un id de tipo ObjecId
    //y que el schema hace referencia a Usuario Schema
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:true
    }
});

//Con esto se modificar el nombre de la propiedad _id a id
EventoSchema.method('toJSON',function(){
    const {__v,_id,...object}=this.toObject();

    object.id=_id;
    return object;

});

module.exports=model('Evento',EventoSchema);