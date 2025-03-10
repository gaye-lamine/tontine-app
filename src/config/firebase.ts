import * as admin from 'firebase-admin';

const serviceAccount = require("../services/externalService/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const auth = admin.auth();
