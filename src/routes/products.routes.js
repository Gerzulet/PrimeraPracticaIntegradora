import { Router } from 'express'
import { uploader } from '../utils/multer.js'
import { productModel } from '../dao/models/products.models.js'


// ☐ IMPLEMENTAR MONGO PARA REGISTRAR TODO POR ATLAS



const router = Router()

// METODO GET PARA LISTAR PRODUCTOS
router.get('/', async (req, res) => {
  let limit = parseInt(req.query.limit)
  try {
    if (limit === 0 || !limit) {
      res.status(200).json(await productModel.find({}))
    } else {
      res.status(202).json(await productModel.find({}).limit(limit))
    }
  } catch (error) {
    res.status(400).json({ info: "Ha ocurrido un error", error })
  }
})

//METODO PARA OBTENER PRODUCTO POR ID
router.get('/:pid', async (req, res) => {
  let pid = (req.params.pid);
  let response = await productModel.findById(pid)
  try {
    res.json(response || { "Error": "Producto no encontrado" })
  } catch {
    res.json({ info: 'Ingrese un id correcto' })
  }
})

router.post('/', uploader.single('thumbnail'), async (req, res) => {
  const { title, description, category, price, thumbnail, code, stock } = req.body;
  !req.file && res.status(400).send({ status: "error", error: "No se pudo guardar la imagen" })

  let thumbnailName = req.file.filename;
  try {
    let addedProduct = await productModel.create({
      title, description, category, price, thumbnailName, code, stock
    })
    res.status(201).json({ info: 'Producto Agregado', addedProduct })
  } catch (error) {
    console.log("Ha ocurrido un error: \n", error)
    res.status(400).json({ info: `Ha ocurrido un error: ${error}` })
  }
})

router.put('/:pid', async (req, res) => {
  const pid = (req.params.pid)
  const updatedValue = req.body
  await productModel.updateOne({ _id: pid }, updatedValue)
  res.send({ status: 200, payload: updatedValue })
})

router.delete('/:pid', async (req, res) => {
  let pid = (req.params.pid)
  let result = await productModel.deleteOne({ _id: pid })
  res.send({ status: 200, payload: result })
})

export default router;


