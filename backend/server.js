import express from "express"
import dotenv from "dotenv"
import rutasProductos from "./router/routes-productos.js"
import rutasCarrito from "./router/routes-carrito.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
dotenv.config()
//connectDB()

app.use("/api/productos", rutasProductos)
app.use("/api/carrito", rutasCarrito)
// Default route
app.use("*", (req, res) => {
   // Here user can also design an
   // error page and render it
   res.status(400).json({error: 0, descripcion: "La ruta que buscas no existe"})
})
const PORT = process.env.PORT || 8080

app.listen(PORT, (err) => {
   if (err) {
      throw new Error(`Error en el Servidor ${err}`)
   }

   console.log(`Servidor Funcionando en el Puerto ${PORT}`)
})
