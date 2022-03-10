class ContenedorFirebase {
   constructor(model) {
      this.model = model
   }

   async readAll() {
      try {
         let products
         const data = await this.model.get()
         if (data.docs.length > 0) {
            products = data.docs.map((p) => {
               let product = p.data()
               return {id: p.id, ...product}
            })
            return products
         } else {
            return false
         }
      } catch (error) {
         console.log(error)
      }
   }
   async readID(id) {
      try {
         const result = await this.model.doc(id).get()
         //const result = await this.model.where("id", "==", id).get()
         /*  let product = result.docs.map((p) => {
            return p.data()
         }) */
         if (!result.exists) {
            return false
         } else {
            return {id: result.id, ...result.data()}
         }
      } catch (error) {
         console.log(error)
         return false
      }
   }
}

export default ContenedorFirebase
