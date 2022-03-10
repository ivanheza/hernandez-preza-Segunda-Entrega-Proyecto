import idGenerate from "../helpers/idGenerate.js"
import mongoose from "mongoose"

const carritoSchema = mongoose.Schema(
   {
      productos: {
         type: Array,
         required: true,
      },
   },
   {timestamps: true}
)

//const Productos = mongoose.model("Productos", productoSchema)

export default carritoSchema
