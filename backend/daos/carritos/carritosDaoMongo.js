import mongoose from "mongoose"
import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import carritoSchema from "../../models/carritoMongo.js"
import ProductosDaoMongo from "../productos/productosDaoMongo.js"

const Carrito = mongoose.model("Carrito", carritoSchema)
const pdb = new ProductosDaoMongo()

class CarritosDaoMongo extends ContenedorMongo {
   constructor() {
      super(Carrito)
   }
   async addCart() {
      try {
         const model = await new Carrito()
         const savedCart = await model.save()
         return savedCart
      } catch (error) {
         console.log(error)
      }
   }
   //----
   async addToCart(idCart, producto) {
      const prodAgregado = await pdb.readID(producto._id)
      if (!prodAgregado) {
         return false
      }
      const actualCart = await this.readID(idCart)
      actualCart.productos.push(prodAgregado)

      await actualCart.save()

      return actualCart
   }

   async deleteCart(cartID) {
      try {
         const existe = await pdb.findOne({_id: cartID})
         if (!existe) {
            return false
         }
         const productos = await Productos.deleteOne({cartID})
         //console.log(productos)
         return "El Producto Fue Borrado con éxito"
      } catch (error) {
         console.log(error)
      }
   }

   async deleteProdByID(cartID, productID) {
      try {
         const existe = await this.readID(cartID)
         if (!existe) {
            return false
         }
         const borrados = existe.productos.filter((p) => {
            new String(p._id).trim() !== p._id
         })
         console.log("Se Borro", borrados)
      } catch (error) {
         console.log("ocurrio un error...", error)
      }
   }
}

export default CarritosDaoMongo
