const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const dotenv = require("dotenv");
dotenv.config();

// initialize Firebase
const firebaseapp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASEURL,
});

const db = getFirestore(firebaseapp);
const Customer = db.collection("customers");

module.exports = Customer;
