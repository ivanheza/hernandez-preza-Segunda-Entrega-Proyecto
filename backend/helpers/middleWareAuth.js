//Middleware para checar si se es administrador y puede realizar cambios. En caso de serlo pasa a la ruta. Cambiar la variable Admin a true para acceder a las rutas y metodos
import dotenv from "dotenv"

dotenv.config()

let administrador = JSON.parse(process.env.ADMIN)
console.log("Administrador: ", administrador)

const authAdmin = (req, res, next) => {
   if (!administrador) {
      console.log(req.path)
      res.status(403)
      return res.send({
         error: 403,
         descripcion: `Ruta autorizada solo para Administradores`,
      })
   }
   next()
}
export default authAdmin
