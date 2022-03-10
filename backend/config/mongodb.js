import mongoose from "mongoose"

const uriMongo =
   "mongodb+srv://root:root@cluster0.sind5.mongodb.net/ecommerce?retryWrites=true&w=majority"
const connectDB = async () => {
   try {
      const db = await mongoose.connect(uriMongo, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })

      const url = `${db.connection.host}:${db.connection.port}`
      console.log(`Mongo DB conectado en: ${url}`)
   } catch (error) {
      console.log(`error: ${error.message}`)
      process.exit(1)
   }
}

export default connectDB
