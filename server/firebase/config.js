const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://capstone-421cb-default-rtdb.firebaseio.com"
});

const auth = admin.auth();
const firestore = admin.firestore();

module.exports = {
  auth,
  firestore,
}; 