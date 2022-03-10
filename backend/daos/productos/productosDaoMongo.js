import ContenedorMongo from "../../contenedores/contenedorMongo.js"
import mongoose from "mongoose"
import productoSchema from "../../models/productoMongo.js"

const Productos = mongoose.model("Productos", productoSchema)

class ProductosDaoMongo extends ContenedorMongo {
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
         }
         console.log(product)
         const existe = await Productos.findOne({nombre})
         if (existe) {
            return false
         }

         const prodSaveModel = new Productos(product)
         const saved = await prodSaveModel.save()
         return saved
      } catch (error) {
         console.log(error)
      }
   }
   ////EDIT
   async editByID(id, productoData) {
      const {nombre, precio, foto, descripcion, codigo, stock} = productoData
      //console.log(productoData)
      const productoActual = await this.readID(id)
      if (!productoActual) {
         return false
      }
      productoActual.nombre = nombre ? nombre : productoActual.nombre
      productoActual.precio = precio ? precio : productoActual.precio
      productoActual.foto = foto ? foto : productoActual.foto
      productoActual.descripcion = descripcion ? descripcion : productoActual.descripcion
      productoActual.codigo = codigo ? codigo : productoActual.codigo
      productoActual.stock = stock ? stock : productoActual.stock

      //console.log(productoActual)
      const productoGuardado = await productoActual.save()
      return productoGuardado
   }
   ////
   async deleteByID(id) {
      try {
         const existe = await Productos.findOne({_id: id})
         if (!existe) {
            return false
         }
         const productos = await Productos.deleteOne({id})
         //console.log(productos)
         return "El Producto Fue Borrado con éxito"
      } catch (error) {
         console.log(error)
      }
   }

   async desconectar() {}
}

export default ProductosDaoMongo
