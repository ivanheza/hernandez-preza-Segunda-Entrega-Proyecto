import {promises as fs} from "fs"
import moment from "moment"

const date = moment().format("D-MMM-YY,h:mm a")
class ContenedorArchivo {
   constructor(ruta) {
      this.ruta = ruta
   }

   async readAll() {
      try {
         const data = await fs.readFile(this.ruta)
         return JSON.parse(data)
      } catch (error) {}
   }
   async readID(id) {
      const data = await this.readAll()
      //console.log(data)
      const find = data.find((p) => p.id == id)
      //console.log(find)
      return find
   }
   async writeFile(data, log) {
      try {
         const content = await fs.writeFile(this.ruta, JSON.stringify(data, null, 2))
         console.log(log ? log : "Guardado con Exito")

         return content
      } catch (error) {
         console.log("Error de escritura!", error)
      }
   }
}

export default ContenedorArchivo
