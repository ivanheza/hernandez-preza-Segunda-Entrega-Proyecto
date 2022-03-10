# Segunda Entrega proyecto final: aplicación eCommerce Backend.

El desarrollo del backend de la api está dentro de la carpeta backend.

##### Inicializar desde la consola dentro de la carpeta backend con: _npm run start_

## _npm run dev_ inicializa en modo development

El proyecto esta programado para trabajar con 3 diferentes servicios de base de datos.

-  FileSystem
-  MongoDB (mongoose)
-  Google Firebase

## Variables de Entorno

º Para cambiar entre servicios de base de datos, dentro del archivo .env cambiar la variable de entorno _DATABASE_ por alguna de las siguientes opciones:

-  fs (FileSystem)
-  mongo (MongoDB)
-  firebase (google Firebase)

º Para acceder a las rutas de administrador cambiar la variable de entorno ADMIN:

-  true (se puede acceder)
-  false (acceso prohibido)

NOTA: _Si inicializaste con el script de start debes reiniciar la consola y volver a correr el npm run start para ver los cambios de las variables de entorno_

## RUTAS

El proyecto está dividio en dos grupos de rutas desde http://localhost:8080

#### PRODUCTOS "/api/productos"

-  GET "/" **Muestra todos los productos en la db productos.txt**
-  GET "/:idProducto" **Muestra el producto por ID**
-  POST "/" **Agrega un producto nuevo al archivo produtcos.txt**
-  PUT "/:idProducto" **Actualiza el producto solicitado por ID por el método PUT**
-  DELETE "/:idProducto" **Borra el producto con el ID selecicionado**

#### CARRITO "/api/carrito"

-  POST "/" **Agrega un carrito nuevo al archivo cartlist.txt**
-  DELETE "/:idcarrito" **Borra el carrito con el ID selecicionado**
-  GET "/:idcarrito/productos" **Muestra todos los productos dentro de un carrito con el ID solicitado**
-  POST "/:idcarrito/productos" **Agrega un producto específico al carrito con un ID específico**
-  DELETE "/:idcarrito/productos/:IDproducto" **Borra un producto específico(id) en el carrito con el ID selecicionado**

> > > > Importante > PARA LA PRUEBA DE ENDPOINTS POST, PUT Y DELETE SE UTILIZO POSTMAN

### Git Ignore

> > > node modules y archivos .DIR

### Dependencies

-  Para el servidor, manejo de rutas [Express JS](https://expressjs.com/es/ "Ver más")
-  Para el timestamp y fechas [Moment JS](https://momentjs.com/ "Ver más")
-  Para la asignación de IDs [uuid](https://www.npmjs.com/package/uuid "Ver más")
-  Se utilizo para la conexión a la instancia de MongoDB y realización de esquemas. [mongoose](https://mongoosejs.com/ "Ver más")
-  Se utilizó la dependencia de firebaseadmin para la configuración, conexión e implementacion de Cloud Firestore [firebase](https://www.npmjs.com/package/firebase-admin "Ver más")
-  Se utilizó la dependencia de dotenv para la implementacion y uso de variables de entorno .env [dotenv](https://www.npmjs.com/package/dotenv "Ver más")

#### Created by: **Ivan Hernández Preza**
