/*
    Rutas de usuarios/Auth
    host /api/eventos

*/


const express=require('express');
const router=express.Router();
const {obtenerEventos,crearEvento,ActualizarEvento,BorrarEvento}=require('../Controllers/events');
const {validarJWT}=require('../middlewares/validar-JWT');
const {check}=require('express-validator');
const {validarCampos}=require('../middlewares/validarCampos');
const {isDate}=require('../Helpers/isDate');

router.use(validarJWT);

router.get('/',obtenerEventos);

router.post('/crear',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ]
    ,crearEvento);

router.put('/actualizar/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ]
    ,ActualizarEvento);

router.delete('/borrar/:id',BorrarEvento);

module.exports=router;