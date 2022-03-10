import {initializeApp, applicationDefault} from "firebase-admin/app"
import amdin from "firebase-admin"

export async function getFirestore() {
   try {
      await initializeApp({
         credential: applicationDefault(),
      })
      console.log("conectado a firebase")
   } catch (error) {
      console.log(error)
   }
}
getFirestore()

export const db = amdin.firestore()
//ecommercefirebase-5711d-firebase-adminsdk-oxyak-e77754d777.json
