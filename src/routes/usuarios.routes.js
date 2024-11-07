import { Router } from 'express'
import {getUsuarios,getUsuariosxid,postUsuario,putUsuarios,patchUsuarios, deleteUsuarios,login} from '../controladores/usuarios.Ctrl.js'
import { verifyToken } from '../token/token.js';
const router=Router()

// armar nuestras rutas
router.get('/usuarios',verifyToken, getUsuarios) //select
router.get('/usuarios/:id',verifyToken, getUsuariosxid) //select x id
router.post('/usuarios',verifyToken, postUsuario) //insert
router.put('/usuarios/:id',verifyToken, putUsuarios) //update
router.patch('/usuarios/:id', verifyToken, patchUsuarios) //update
router.delete('/usuarios/:id', verifyToken, deleteUsuarios) //update

//login
router.post('/login',login);


export default router