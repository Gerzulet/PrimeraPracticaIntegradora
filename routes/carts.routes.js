
import { Router } from 'express'
import CartManager from '../utils/CartManager.js'

const router = Router()

router.get('/:cid', (req, res) => {
  const cid = parseInt(req.params.cid)
  CartManager.getCart(cid) 
  ? res.status(200).json(CartManager.getCart(cid))
  : res.status(404).json({Error:"No se ha encontrado el carrito"})
})

 router.post('/', (req,res) => {
  CartManager.createCart()
  res.status(200).send({Info: "Carrito creado"})
}) 

router.post('/:cid/product/:pid', async (req,res) => {
  const {cid, pid} = req.params;
  const {quantity} = req.body; 
  await CartManager.addToCart(Number(cid),Number(pid),quantity) 
  ? res.status(201).json({Info:`Elementos agregados a carrito numero ${Number(cid)}`})
  : res.status(400).json({error:"Ha ocurrido un error agregado productos, asegurese de proveer el numero de carrito correcto"})
})

export default router; 
