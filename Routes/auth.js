/*
    Rutas de usuarios/Auth
    host /api/auth

*/


const express=require('express');
const router=express.Router();
const {check}=require('express-validator');
const {crearUsuario,LoginUsuario,RenovarToken}=require('../Controllers/auth')
const {validarCampos}=require('../middlewares/validarCampos');
const {validarJWT}=require('../middlewares/validar-JWT');

router.post('/',
    [
        check('email','El email es obligatorio').isEmail(),
        check('password','La contraseña debe ser de 6 o mas caracteres').isLength({min:6}),
        validarCampos
    ]
    ,LoginUsuario);

router.post('/register',
    [//midlewares para validar
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe ser de mas de 6 caracteres').isLength({min:6}),
        validarCampos
    ]
    ,crearUsuario);

    //Primero se usa el middleware validarJWT, si el token
    //es valido procedo a generar uno nuevo
router.get('/renew',validarJWT,RenovarToken);

module.exports=router;