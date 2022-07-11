const admin = require('firebase-admin');
var account = require("./beelzy-firebase-adminsdk-52z12-754b9fa467.json")
const fs = require('fs-extra');
const yaml = require('yamljs');

admin.initializeApp({
    credential: admin.credential.cert(account),
    databaseURL: "https://beelzy-default-rtdb.firebaseio.com"
});
const db = admin.firestore();

const topics = [
    'animation',
    'cupertino',
    'foundation',
    'gestures',
    'material',
    'painting',
    'physics',
    'rendering',
    'scheduler',
    'semantics',
    'services',
    'widgets'
  ];


const update = async() => {
    var json = null
    try{
        json = yaml.load(`flutter_api/libraries.yaml`); //${id}
    }
    catch (err) {
        console.log(err);
    }
    //console.log(json);
    //console.log(JSON.stringify(json));
    const ref = db.collection('libs').doc('libraries');
    await ref.set(json, { merge: true });
    //console.log('DONE');
}


//for (const topic of topics) {
update();
//}