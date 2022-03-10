import dotenv from "dotenv"
dotenv.config()
import connectDB from "../config/mongodb.js"

let mode = process.env.DATABASE
console.log("variable de entorno", mode)

const dbCarrito = await import(`../daos/mainDaos.js`).then(
   ({daosArchivo, daosMongo, daosFirebase}) => {
      if (mode == "fs") {
         return new daosArchivo.CarritosDaoArchivo()
      } else if (mode == "mongo") {
         connectDB()
         return new daosMongo.CarritosDaoMongo()
      } else if (mode == "firebase") {
         return new daosFirebase.CarritosDaoFirebase()
      }
   }
)
//const dbArchivo = new CarritosDaoArchivo()

const getAll = async (req, res) => {
   const carts = await dbCarrito.readAll()
   res.send(carts)
}

const addCart = async (req, res) => {
   let cartlist = await dbCarrito.addCart()
   res.json(cartlist)
   //console.log("Posting NewCart", cart)
}
//GET BY ID
const getCarrito = async (req, res) => {
   const id = req.params.id
   //console.log("IDCART", id)
   let cart = await dbCarrito.readID(id)
   if (!cart) {
      const error = new Error("El Carrito que buscas no existe...")
      return res.status(400).json({msg: error.message})
   }
   res.json(cart)
}

const addToCart = async (req, res) => {
   const {id} = req.params
   const product = req.body

   //console.log(product)
   const added = await dbCarrito.addToCart(id, product)
   //console.log(added)
   /* if (added == false) {
      const error = new Error(
         "Ocurrio un error no se encuentra el carrito o el prducto..."
      )

      return res.status(400).json({msg: error.message})
   } */

   res.json(added)
}

const deleteCart = async (req, res) => {
   const {id} = req.params
   const buscarCarrito = await dbCarrito.readID(id)
   if (!buscarCarrito) {
      const error = new Error("El Carrito que buscas no existe...")
      return res.status(400).json({msg: error.message})
   }
   const cart = await dbCarrito.deleteCart(id)
   res.json(cart)
}

const deleteProdByID = async (req, res) => {
   const {id} = req.params
   const {id_prod} = req.params
   //console.log(id, id_prod)
   const deleteProd = await dbCarrito.deleteProdByID(id, id_prod)
   if (deleteProd == false) {
      const error = new Error("El Carrito que buscas no existe...")
      return res.status(400).json({msg: error.message})
   }
   res.status(200).json(deleteProd)
}

export {getAll, addCart, getCarrito, addToCart, deleteCart, deleteProdByID}
