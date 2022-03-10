import dotenv from "dotenv"
dotenv.config()
import connectDB from "../config/mongodb.js"

let mode = process.env.DATABASE
//console.log("variable de entorno", mode)

const productsDB = await import(`../daos/mainDaos.js`).then(
   ({daosArchivo, daosMongo, daosFirebase}) => {
      if (mode == "fs") {
         return new daosArchivo.ProductosDaoArchivo()
      } else if (mode == "mongo") {
         connectDB()
         return new daosMongo.ProductosDaoMongo()
      } else if (mode == "firebase") {
         return new daosFirebase.ProductosDaoFirebase()
      }
   }
)
///FOR USERS
const getProducts = async (req, res) => {
   const data = await productsDB.readAll()
   if (data == false) {
      const error = new Error("no hay datos")
      return res.status(400).json({msg: error.message})
   }
   res.json(data)
}

const getByID = async (req, res) => {
   const {id} = req.params
   //console.log(id)
   //const result = await db.readID(id)
   const result = await productsDB.readID(id)

   if (!result) {
      const error = new Error("El Producto No Existe")
      return res.status(400).json({msg: error.message})
   }
   res.json(result)
}

//ADMIN

const addProduct = async (req, res) => {
   const {nombre, precio, foto, descripcion, codigo, stock} = req.body
   //await db.addProduct(nombre, precio, foto, descripcion, codigo, stock)
   const producto = await productsDB.newProduct(
      nombre,
      precio,
      foto,
      descripcion,
      codigo,
      stock
   )
   if (producto == false) {
      const error = new Error("Ya hay un producto con ese nombre")
      return res.status(400).json({msg: error.message})
   }
   // console.log(data)
   res.json(producto)
}

const editByID = async (req, res) => {
   const id = req.params.id
   const {nombre, precio, foto, descripcion, codigo, stock} = req.body
   const producto = {
      nombre: nombre,
      precio: precio,
      foto: foto,
      descripcion: descripcion,
      codigo: codigo,
      stock: stock,
   }
   const editado = await productsDB.editByID(id, producto)

   res.json(editado)
}

const deleteById = async (req, res) => {
   const {id} = req.params
   /* 
   const buscar = await db.readID(id)
   if (!buscar) {
      const error = new Error("El Producto No Existe")
      return res.status(400).json({msg: error.message})
   }
   const result = await db.deleteByID(id) */
   const result = await productsDB.deleteByID(id)
   console.log(result)
   if (result == false) {
      const error = new Error("No se encontro el producto...")
      return res.status(400).json({msg: error.message})
   }

   res.status(200).json({msg: result})
   //console.log(id)
}

export {getProducts, getByID, addProduct, editByID, deleteById}
