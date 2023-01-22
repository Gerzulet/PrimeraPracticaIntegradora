import express from 'express'
import productRoutes from './src/routes/products.routes.js'
import handlebars from 'express-handlebars'
import cartRoutes from './src/routes/carts.routes.js'
import mongoose from 'mongoose'
import __dirname from './src/utils/dirname.js'
import { Server } from 'socket.io'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Inicializacion de websocket por lado de servidor
const httpServer = app.listen(8080, () => console.log("Listening on port 8080"))
const io = new Server(httpServer)


// CONFIGURACION DE HANDLEBARS ✅ 
app.engine('hbs', handlebars.engine({
  extname: 'hbs', 
  defaultLayout: 'main'
}))
app.set('views', __dirname + '/views/')
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '+/public'))


// ROUTES ✅
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)

// APLICACION DE BASE DE DATOS CON MONGOOSE ✅
mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://CoderGermancho:coderBackend2023@codercluster.dzpfie2.mongodb.net/?retryWrites=true&w=majority', (error) => {
  if (error) {
    console.log('Cannot connect to database' + error)
    process.exit()
  }
})

// SOCKET IO ✅ 
io.on('connection', (socket) => {
  console.log("Se ha conectado el socket con id : !", socket.id)
  // Para carga de productos al inicio de pagina realtimeproducts

  // Para agregar productos nuevos
  socket.on("newProduct", (data) => {
 })

  //Para eliminar productos 
  socket.on("eliminarProducto", id => {
 })

})




