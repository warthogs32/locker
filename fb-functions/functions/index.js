const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');
const imageToBase64 = require('image-to-base64');
const admin = require('firebase-admin');



let serviceAccount = require("./service-account-file.json");

let app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://slohacks-269509.firebaseio.com"
});

//
// Use this for firebase realtime db
// let db = app.database();
// let ref = db.ref();

// ref.on("value", (snapshot) => {
//     console.log(snapshot.val())
//   });


//
// Use this for firestore
const db = admin.firestore();
const imageDataCollectionRef = db.collection('image-data'); 

imageDataCollectionRef.get()
  .then(snapshot => {
    snapshot.forEach((doc) => {
      // console.log(doc.id, '=>', doc.data());
      console.log(doc.data())
    });
  })


const faceDetectionTest = async function () {
  const client = new vision.ImageAnnotatorClient();

  const fileName = './test_images/2uglies.jpg'; 

  imageToBase64(fileName)
    .then(async (base64Img) => {
      const [ result ] = await client.faceDetection(Buffer.from(base64Img, 'base64'));

      const faces = result.faceAnnotations;
      console.log('Faces:');
      faces.forEach((face, i) => {
        console.log(`  Face #${i + 1}:`);
        console.log(`    Joy: ${face.joyLikelihood}`);
        console.log(`    Anger: ${face.angerLikelihood}`);
        console.log(`    Sorrow: ${face.sorrowLikelihood}`);
        console.log(`    Surprise: ${face.surpriseLikelihood}`);
      });
    });
  

}

faceDetectionTest()

// Test helloWorld cloud function that triggers on http request
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Goodbye from Firebase!");
});

// Cloud function to run facial detection processes on images
// Trigger on firebase image collection update
// exports.facialDetection = functions.