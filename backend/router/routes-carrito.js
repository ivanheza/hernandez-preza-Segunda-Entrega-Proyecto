import express from "express"
const router = express.Router()
import {
   getAll,
   addCart,
   getCarrito,
   addToCart,
   deleteCart,
   deleteProdByID,
} from "../controllers/controller-carrito.js"

//GET PRUEBA LISTA CARRITOS

router.get("/", getAll)

// POST NEW CART
router.post("/", addCart)

//GET CARRITO POR ID LISTADO DE PRODUCTOS DENTRO
router.get("/:id/productos", getCarrito)

///POST Add To Cart
router.post("/:id/productos", addToCart)

//DELETE CART BY ID
router.delete("/:id", deleteCart)

//DELETE PRODUCT BY ID IN CART
router.delete("/:id/productos/:id_prod", deleteProdByID)

//eExport
export default router
