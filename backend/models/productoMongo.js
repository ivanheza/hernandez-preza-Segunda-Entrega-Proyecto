import idGenerate from "../helpers/idGenerate.js"
import mongoose from "mongoose"

const productoSchema = mongoose.Schema(
   {
      nombre: {
         type: String,
         required: true,
         trim: true,
      },
      precio: {
         type: Number,
         required: true,
      },
      foto: {
         type: String,
         required: true,
      },
      descripcion: {
         type: String,
         default: null,
         trim: true,
      },
      codigo: {
         type: String,
         default: idGenerate(),
      },
      stock: {
         type: Number,
         required: true,
      },
   },
   {timestamps: true}
)

//const Productos = mongoose.model("Productos", productoSchema)

export default productoSchema
