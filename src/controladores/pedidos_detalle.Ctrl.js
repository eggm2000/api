import { json } from 'express'
import{conmysql} from '../db.js'

export const getPedidos_detalle=
async (req,res) =>{
    try {
        const [result]= await conmysql.query('select * from pedidos_detalle')
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:"Error al consultar Pedidos_detalle"})
    }
}
export const getPedidos_detallexid=
async(req, res)=>{
   try {
    const [result]=await conmysql.query('select * from pedidos_detalle where det_id=?',[req.params.id])
    if(result.length<=0)return res.status(404).json({
        prod_id:0,
        message:"Pedido_detalle no encontrado"
    })
    res.json(result[0])
   } catch (error) {
    return res.status(500).json({message: 'Error en el servidor'})
    
   }

}


export const postPedidod_detalle= 
async(req, res)=>{
    try{
    //console.log(req.body)
    const{prod_id,ped_id, det_cantidad,det_precio}=req.body
    //console.log(cli_nombre)
    const[rows]=await conmysql.query('insert into pedidos_detalle ( prod_id, ped_id, det_cantidad, det_precio )values(?,?,?,?)',
        [prod_id, ped_id, det_cantidad, det_precio]
    )
    res.send({
        id:rows.insertId
    })
    {}
} catch (error){
    return res.status(500).json({message:'error del lado del servidor '})
}
}
//PUT REEMPLAZAR
export const putPedidos_detalle=
async(req, res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)           
    const{prod_id,ped_id, det_cantidad,det_precio }=req.body
    console.log(prod_id)
    const[result]=await conmysql.query('update pedidos_detalle set prod_id=?,ped_id=?, det_cantidad=?,det_precio=?',
        [prod_id,ped_id, det_cantidad,det_precio,id]) 
        
        if(result.affectedRows<=0)return res.status(400).json({
            message:"Pedido_detaalle no encontrado"
        })

        const[rows]=await conmysql.query('select * from pedidos_detalle where det_id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:'Error en el servidor'})
    }
}

 //PATCH MODIFICAR

export const patchPedidos_detalle=     //PATCH MODIFICAR
async(req, res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)           
    const{prod_id,ped_id, det_cantidad,det_precio}=req.body
    console.log(prod_id)
    const[result]=await conmysql.query('update pedidos_detalle set prod_id=IFNULL(?,prod_id),ped_id=IFNULL(?,ped_id), det_cantidad=IFNULL(?,det_cantidad),det_precio=IFNULL(?,det_precio) where det_id=?',
        [prod_id,ped_id, det_cantidad,det_precio,id]) 
        
        if(result.affectedRows<=0)return res.status(400).json({
            message:"pedido no encontrado"
        })

        const[rows]=await conmysql.query('select * from pedidos_detalle where det_id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:'Error en el servidor'})
    }
}

export const deletePedidos_detalle= //DELETE ELIMINAR
async(req, res)=>{
    try {
        const [result]=await conmysql.query(' delete from pedidos_detalle where det_id=?', [req.params.id])
        if (rows.affectedRows>=0) return res.status(404).json({
            id:0,
            message:"NO PUDO ELIMINAR AL PEDIDO_DETALLE"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
        
    }
}