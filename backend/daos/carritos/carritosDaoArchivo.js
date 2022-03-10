import ContenedorArchivo from "../../contenedores/contenedorArchivo.js"
//_Timestamp
import moment from "moment"
const date = moment().format("D-MMM-YY,h:mm a")
//ID
import {customAlphabet} from "nanoid"
import ProductosDaoArchivo from "../productos/productosDaoArchivo.js"
let nanoid = customAlphabet("123456789abcdzyxw", 4)
const pdb = new ProductosDaoArchivo()

class CarritosDaoArchivo extends ContenedorArchivo {
   constructor() {
      super("./cartlist.json")
   }
   async addCart() {
      const newCart = {id: `cart_${nanoid()}`, timestamp: date, productos: []}
      const cartlist = await this.readAll()
      cartlist.push(newCart)

      await this.writeFile(cartlist, "Se agregó carrito nuevo...")
      return cartlist
   }
   ///
   async addToCart(idCart, producto) {
      const prodAgregado = await pdb.readID(producto.id)
      if (!prodAgregado) {
         return false
      }
      const cartlist = await this.readAll()
      const actualCart = cartlist.findIndex((d) => d.id == idCart)
      //console.log("indexCarrito", actualCart)
      if (actualCart >= 0) {
         cartlist[actualCart].products.push(prodAgregado)

         await this.writeFile(cartlist, `Se Agregó ${prodAgregado.name} al carrito`)

         return cartlist[actualCart]
      } else {
         return false
      }
   }
   ///
   async deleteCart(cartID) {
      const cartlist = await this.readAll()
      const filteredCartlist = cartlist.filter((c) => c.id !== cartID)
      await this.writeFile(filteredCartlist, `Se borro el carrito con el ID: ${cartID}`)
      return filteredCartlist
   }
   async deleteProdByID(cartID, productID) {
      const cartlist = await this.readAll()
      const actualCart = cartlist.findIndex((d) => d.id == cartID)
      if (actualCart >= 0) {
         const prodExist = cartlist[actualCart].products.findIndex(
            (p) => p.id == productID
         )
         //console.log(prodExist)
         if (prodExist >= 0) {
            const cartProduct = cartlist[actualCart].products[prodExist]
            cartProduct.qty -= 1
            if (cartProduct.qty == 0) {
               cartlist[actualCart].products.splice(prodExist, 1)
            }
         } else {
            return false
         }
         //
         //Recalcular Total
         let total = cartlist[actualCart].products.reduce((total, current) => {
            return total + current.price * current.qty
         }, 0)
         cartlist[actualCart].totalPrice = total
         await this.writeFile(cartlist, "Se borró producto")
         return cartlist[actualCart]
      } else {
         return false
      }
   }
}

export default CarritosDaoArchivo
