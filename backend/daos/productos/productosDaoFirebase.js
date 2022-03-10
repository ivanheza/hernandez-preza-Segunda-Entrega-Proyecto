import amdin from "firebase-admin"
import {db} from "../../config/firebase-config.js"
import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"
import moment from "moment"
import {customAlphabet} from "nanoid"
let nanoid = customAlphabet("18273645abcfdzyxw", 6)
const date = moment().format("D-MMM-YY,h:mm a")

///db.settings({ignoreUndefinedProperties: true})
const Productos = db.collection("productos")

class ProductosDaoFirebase extends ContenedorFirebase {
   constructor() {
      super(Productos)
   }

   async newProduct(nombre, precio, foto, descripcion, codigo, stock) {
      try {
         const product = {
            nombre,
            precio,
            foto,
            descripcion,
            codigo,
            stock,
            timestamp: date,
         }
         //console.log(product)
         const nuevo = await Productos.doc(`pr-${nanoid()}`)

         const resultado = await nuevo.create(product)

         return {status: 200, msg: "Producto agregado con éxito"}
      } catch (error) {
         console.log(error)
      }
   }
   ////EDIT
   async editByID(id, productoData) {
      db.settings({ignoreUndefinedProperties: true})
      //console.log(productoData)
      const docRef = await this.model.doc(id)
      docRef.update({
         nombre: productoData.nombre,
         precio: productoData.precio,
         foto: productoData.foto,
         descripcion: productoData.descripcion,
         codigo: productoData.codigo,
         stock: productoData.stock,
      })

      return {status: 200, msg: "Producto editado con éxito"}
   }
   ////
   async deleteByID(id) {
      try {
         const docRef = await this.model.doc(id).get()
         if (!docRef.exists) {
            return false
         } else {
            await this.model.doc(id).delete()
            return {status: 200, msg: "Producto borrado con éxito"}
         }
      } catch (error) {
         console.log(error)
      }
   }
}

export default ProductosDaoFirebase
