class ContenedorMongo {
   constructor(model) {
      this.model = model
   }

   async readAll() {
      try {
         const data = await this.model.find({})
         //console.log(data)
         return data
      } catch (error) {
         console.log(error)
      }
   }
   async readID(id) {
      try {
         const data = await this.model.findOne({_id: id})

         if (!data) {
            //console.log("Dif de Data")
            return "Ocurrio un error..."
         }
         //console.log(data)
         return data
      } catch (error) {
         console.log(error)
         return false
      }
   }

   async stock(idProd) {
      try {
         const prod = await this.model.findOneAndUpdate(
            {_id: idProd},
            {$inc: {stock: -1}}
         )

         return "Se actualizo el stock"
      } catch (error) {
         console.log(error)
      }
   }
}

export default ContenedorMongo
