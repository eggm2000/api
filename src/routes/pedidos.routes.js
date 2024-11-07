import { Router } from 'express'
import {getPedidos, getPedidosxid, postPedido, putPedido, patchPedido, deletePedido} from '../controladores/pedidos.Ctrl.js'
const router=Router()
// armar nuestras rutas

router.get('/pedidos', getPedidos) //select
router.get('/pedidos/:id', getPedidosxid) //select x id
router.post('/pedidos', postPedido) //insert
router.put('/pedidos/:id', putPedido) //update
router.patch('/pedidos/:id', patchPedido) //update
router.delete('/pedidos/:id', deletePedido) //delete

export default router