var admin = require("firebase-admin");

// Fetch the service account key JSON file contents
var serviceAccount = require("./serviceAccountKey.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodeit-68f0e.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("server/saving-data/fireblog");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

// var usersRef = ref.child("users");
// usersRef.set({
//   amar: {
//     date_of_birth: "may 23, 1912",
//     full_name: "asd Turing"
//   },
//   vickram: {
//     date_of_birth: "june 9, 1906",
//     full_name: "Gracesadas Hopper"
//   }
// });

module.exports = ref;