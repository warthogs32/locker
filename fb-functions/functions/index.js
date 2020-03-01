const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');
const imageToBase64 = require('image-to-base64');
const admin = require('firebase-admin');


// Firebase setup
// This is needed for both rtdb and firestore
let serviceAccount = require("./service-account-file.json");
let app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://slohacks-269509.firebaseio.com"
});


const imageDetectionclient = new vision.ImageAnnotatorClient();



// Use this for firebase realtime db
let db = app.database();
let ref = db.ref();

ref.on("value", (snapshot) => {
  console.log(snapshot.val())
});

let imgDataRef = db.ref("image_data")
imgDataRef.on("value", (snapshot) => {
  console.log("image data changed")
  console.log("img data", snapshot.val())
});


const getFacesFromImage = async function (base64Img) {
  const [ result ] = await imageDetectionclient
    .faceDetection(Buffer.from(base64Img, 'base64'));

  const faces = result.faceAnnotations;
  console.log('Faces:');
  faces.forEach((face, i) => {
    console.log(`  Face #${i + 1}:`);
    console.log(`    Joy: ${face.joyLikelihood}`);
    console.log(`    Anger: ${face.angerLikelihood}`);
    console.log(`    Sorrow: ${face.sorrowLikelihood}`);
    console.log(`    Surprise: ${face.surpriseLikelihood}`);
  });

  return faces;
}




// Test helloWorld cloud function that triggers on http request
exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Goodbye from Firebase!");
  console.log("hello")
});

// Cloud function to handle face detection
// Listens for changes in images object in rtdb and  
// runs face detection stuff on that imgs
exports.handleFaceDetection = functions.database.ref('/image_data/{id}')
  .onCreate((snapshot, context) => {


    console.log('updated rtdb');
    console.log("new value ", snapshot.val())

    return getFacesFromImage(snapshot.val())

  });
  

