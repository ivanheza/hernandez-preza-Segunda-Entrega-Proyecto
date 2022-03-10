import moment from "moment"
import {customAlphabet} from "nanoid"
import ContenedorArchivo from "../../contenedores/contenedorArchivo.js"
let nanoid = customAlphabet("123456789abcdzyxw", 8)
const date = moment().format("D-MMM-YY,h:mm a")

class ProductosDaoArchivo extends ContenedorArchivo {
   constructor() {
      super("./productos.json")
   }
   async newProduct(nombre, precio, foto, descripcion, codigo, stock) {
      const producto = {
         id: nanoid(),
         timestamp: date,
         nombre,
         precio,
         foto,
         descripcion,
         codigo,
         stock,
      }
      const productos = await this.readAll()
      productos.push(producto)
      //console.log(producto)

      await this.writeFile(productos)
      return productos
   }
   async editByID(id, producto) {
      const {nombre, precio, foto, descripcion, codigo, stock} = producto
      const productos = await this.readAll()
      const buscar = productos.findIndex((p) => p.id == id)
      if (buscar >= 0) {
         const edited = productos.map((p) => {
            if (p.id == id) {
               p.timestamp = date
               p.nombre = nombre ? nombre : p.nombre
               p.precio = precio ? precio : p.precio
               p.foto = foto ? foto : p.foto
               p.descripcion = descripcion ? descripcion : p.descripcion
               p.codigo = codigo ? codigo : p.codigo
               p.stock = stock ? stock : p.stock
            }
            return p
         })
         await this.writeFile(edited, `Se edito con exito el producto con el ID ${id}`)
         return edited[buscar]
      } else {
         const error = new Error("El Producto No Existe")
         return res.status(400).json({msg: error.message})
      }
   }

   async deleteByID(id) {
      const productos = await this.readAll()
      const deleted = productos.filter((p) => p.id !== id)
      //console.log(deleted)
      await this.writeFile(
         deleted,
         `Se borro el producto con el ID:${id} de la base de datos`
      )
      return deleted
   }
}

export default ProductosDaoArchivo
