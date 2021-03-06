const { Router } = require('express');
const { login, register, infoUser } = require('../controllers/auth.controller');
const { validationResultExpress } = require('../middlewares/validationResult');
const { body } = require('express-validator');
const { requireToken } = require('../middlewares/jwtRequire');
const router = Router();

router.post('/register', [
    body('email', 'El formato del email no es válido').trim().isEmail().normalizeEmail(),
    body('password', 'La contraseña debe de tener mínimo 6 carácteres').trim().isLength({ min: 6 }),
    body('password', 'La contraseña tiene un formato inválido').custom((value, { req }) => {
        if (value !== req.body.confirmpassword) {
            throw new Error('Las contraseñas no coinciden');
        }
        return value;
    })

], validationResultExpress, register);

router.post('/login',
    [
        body('email', 'El formato del email no es válido').trim().isEmail().normalizeEmail(),
        body('password', 'La contraseña debe de tener mínimo 6 carácteres').trim().isLength({ min: 6 }),
    ],
    validationResultExpress,
    login);

router.get('/protected', requireToken ,infoUser);


module.exports = router;

