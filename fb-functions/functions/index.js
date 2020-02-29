const functions = require('firebase-functions');
const vision = require('@google-cloud/vision');
const imageToBase64 = require('image-to-base64');


const faceDetectionTest = async function () {
  const client = new vision.ImageAnnotatorClient();

  const fileName = './2uglies.jpg'; 


  imageToBase64(fileName)
  .then(async (response) => {
    const [result] = await client.faceDetection(fileName);

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


exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Goodbye from Firebase!");
});