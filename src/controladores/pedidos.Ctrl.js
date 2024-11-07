import { json } from 'express'
import{conmysql} from '../db.js'

export const getPedidos=
async (req,res) =>{
    try {
        const [result]= await conmysql.query('select * from pedidos')
        res.json(result)
    } catch (error) {
        return res.status(500).json({message:"Error al consultar Pedidos"})
    }
}
export const getPedidosxid=
async(req, res)=>{
   try {
    const [result]=await conmysql.query('select * from pedidos where ped_id=?',[req.params.id])
    if(result.length<=0)return res.status(404).json({
        prod_id:0,
        message:"Pedido no encontrado"
    })
    res.json(result[0])
   } catch (error) {
    return res.status(500).json({message: 'Error en el servidor'})
    
   }

}


export const postPedido= 
async(req, res)=>{
    try{
    //console.log(req.body)
    const{cli_id,ped_fecha,usr_id, ped_estado }=req.body
    //console.log(cli_nombre)
    const[rows]=await conmysql.query('insert into pedidos (cli_id, ped_fecha, usr_id, ped_estado )values(?,?,?,?)',
        [cli_id, ped_fecha, usr_id, ped_estado ]
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
export const putPedido=
async(req, res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)           
    const{cli_id,ped_fecha,usr_id, ped_estado }=req.body
    console.log(cli_id)
    const[result]=await conmysql.query('update pedidos set cli_id=?,ped_fecha=?, usr_id=?, ped_estado=?',
        [cli_id,ped_fecha,usr_id, ped_estado,id]) 
        
        if(result.affectedRows<=0)return res.status(400).json({
            message:"Pedido no encontrado"
        })

        const[rows]=await conmysql.query('select * from pedidos where ped_id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:'Error en el servidor'})
    }
}

 //PATCH MODIFICAR

export const patchPedido=     //PATCH MODIFICAR
async(req, res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)           
    const{cli_id,ped_fecha,usr_id, ped_estado }=req.body
    console.log(cli_id)
    const[result]=await conmysql.query('update pedidos set cli_id=IFNULL(?,cli_id),ped_fecha=IFNULL(?,ped_fecha), usr_id=IFNULL(?,usr_id), ped_estado=IFNULL(?,ped_estado) where ped_id=?',
        [cli_id,ped_fecha,usr_id, ped_estado,id]) 
        
        if(result.affectedRows<=0)return res.status(400).json({
            message:"pedido no encontrado"
        })

        const[rows]=await conmysql.query('select * from pedidos where ped_id=?',[id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({message:'Error en el servidor'})
    }
}

export const deletePedido= //DELETE ELIMINAR
async(req, res)=>{
    try {
        const [result]=await conmysql.query(' delete from pedidos where ped_id=?', [req.params.id])
        if (rows.affectedRows>=0) return res.status(404).json({
            id:0,
            message:"NO PUDO ELIMINAR AL PEDIDO"
        })
        res.sendStatus(202)
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
        
    }
}
