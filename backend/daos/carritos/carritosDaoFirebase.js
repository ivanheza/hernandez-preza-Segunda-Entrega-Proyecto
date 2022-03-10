import ContenedorFirebase from "../../contenedores/contenedorFirebase.js"
import moment from "moment"
import firebase from "firebase-admin"

import {customAlphabet} from "nanoid"
import {db} from "../../config/firebase-config.js"
import ProductosDaoFirebase from "../productos/productosDaoFirebase.js"
let nanoid = customAlphabet("18273645abcfdzyxw", 6)
const date = moment().format("D-MMM-YY,h:mm a")

///Firestore
const firestore = firebase.firestore.FieldValue
const Carrito = db.collection("carritos")

class CarritosDaoFirebase extends ContenedorFirebase {
   constructor() {
      super(Carrito)
   }
   async addCart() {
      try {
         let carrito = {
            timestamp: date,
            productos: [],
         }
         const model = await Carrito.doc(`cart-${nanoid()}`)
         await model.create(carrito)
         return {status: 200, msg: "Carrito creado con éxito"}
      } catch (error) {
         console.log(error)
      }
   }
   //----
   async addToCart(idCart, producto) {
      const docRef = await Carrito.doc(idCart)
      console.log(producto)
      /* if (!docRef.exist) {
         return false
      } */

      const newArray = await docRef.update({
         productos: firestore.arrayUnion(producto),
      })

      return {status: 200, msg: `Se agrego al carrito ${producto.nombre}`}
   }

   async deleteCart(cartID) {
      try {
         const docRef = await this.model.doc(cartID).get()
         if (!docRef.exists) {
            return false
         } else {
            await this.model.doc(cartID).delete()
            return {status: 200, msg: "Carrito borrado con éxito"}
         }
      } catch (error) {
         console.log(error)
      }
   }

   async deleteProdByID(idCart, productID) {
      try {
         const docRef = await Carrito.doc(idCart)
         const existe = (await docRef.get()).exists
         if (!existe) {
            return false
         }
         const dbprod = new ProductosDaoFirebase()
         const buscado = await dbprod.readID(productID)
         console.log(buscado)
         const newArray = await docRef.update({
            productos: firestore.arrayRemove(buscado),
         })
         return {status: 200, msg: "Producto borrado con éxito"}
      } catch (error) {
         console.log("ocurrio un error...", error)
      }
   }
}

export default CarritosDaoFirebase
