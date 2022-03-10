import express from "express"
const router = express.Router()
import {
   getProducts,
   getByID,
   addProduct,
   editByID,
   deleteById,
} from "../controllers/controller-productos.js"
import authAdmin from "../helpers/middleWareAuth.js"

////////>>> ADMIN AND USERS
///GET ALL
router.get("/", authAdmin, getProducts)
///GET BY ID
router.get("/:id", getByID)

/////>>>PRUEBAS INSTANCIAS //ADMIN

//POST
router.post("/", authAdmin, addProduct)

///PUT Edit Product
router.put("/:id", authAdmin, editByID)

///DELETE
router.delete("/:id", authAdmin, deleteById)

export default router
