import CarritosDaoArchivo from "./carritos/carritosDaoArchivo.js"
import CarritosDaoFirebase from "./carritos/carritosDaoFirebase.js"
import CarritosDaoMongo from "./carritos/carritosDaoMongo.js"
import ProductosDaoArchivo from "./productos/productosDaoArchivo.js"
import ProductosDaoFirebase from "./productos/productosDaoFirebase.js"
import ProductosDaoMongo from "./productos/productosDaoMongo.js"

export const daosArchivo = {
   ProductosDaoArchivo,
   CarritosDaoArchivo,
}

export const daosMongo = {
   ProductosDaoMongo,
   CarritosDaoMongo,
}
export const daosFirebase = {
   ProductosDaoFirebase,
   CarritosDaoFirebase,
}

/* const daosCarritos2 = await import(`./carritos/carritos${user.archivo}.js`).then(
   (module) => {
      return module
   }
) */

//import(`./productos/${user.mode}`).then(() => {})
