// 자료 제공: https://www.google.com/search?q=bulk+upload+firestore&sxsrf=ALiCzsbjxNmyoYeb54FZ3_JdIOkoxL5XYg%3A1655597611258&source=hp&ei=K2quYqqHDu-Hr7wP5q2PmAQ&iflsig=AJiK0e8AAAAAYq54O4xSMySGFO66_cPJuQADDLZhk_oR&ved=0ahUKEwjqyIjcnbj4AhXvw4sBHebWA0MQ4dUDCAc&uact=5&oq=bulk+upload+firestore&gs_lcp=Cgdnd3Mtd2l6EAMyBwghEAoQoAEyCAghEB4QFhAdOgQIIxAnOgQIABBDOgoILhDHARDRAxBDOgUILhCABDoLCC4QgAQQxwEQ0QM6BQgAEIAEOg4ILhCABBDHARDRAxDUAjoICC4QgAQQ1AI6CwguEIAEEMcBEK8BOgsILhCABBDHARCjAjoFCAAQywE6BggAEB4QFjoGCAAQHhANOggIABAeEA8QFjoFCCEQoAE6BAghEBVQAFj4FWClFmgAcAB4AIABjAGIAbMRkgEEMC4xOZgBAKABAQ&sclient=gws-wiz#kpvalbx=_LmquYqTeKtSohwOB1rO4Dg16

var admin = require("firebase-admin");

var serviceAccount = require("./service_key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_DATABASE_URL,
});

const firestore = admin.firestore();
const path = require("path");
const fs = require("fs");
const directoryPath = path.join(__dirname, "files");

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }

  files.forEach(function (file) {
    var lastDotIndex = file.lastIndexOf(".");

    var item = require("./files/" + file);

    item.forEach(function (obj) {
      firestore
        .collection(file.substring(0, lastDotIndex))
        .doc(`${obj.id}`)
        .set(obj)
        .then(function (docRef) {
          console.log("Document written");
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    });
  });
});
