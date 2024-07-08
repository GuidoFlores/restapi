require('dotenv').config()

 const express = require('express');
 const bodyParser = require('body-parser');
 const admin = require('firebase-admin');
 const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_API)

 admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
 });

 const app = express();
 app.use(bodyParser.json());

 const PORT = process.env.PORT || 5000;

 app.use('/api', require('./routes/api'));

 app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
 });