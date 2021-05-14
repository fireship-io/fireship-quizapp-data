const admin = require('firebase-admin');
const fs = require('fs-extra');
const yaml = require('yamljs');

admin.initializeApp({
    credential: admin.credential.cert(require('./credentials.json')),
});
const db = admin.firestore();

const topics = [
    'angular',
    'flutter',
    'cf',
    'firebase',
    'firestore',
    'flutter',
    'rxjs',
    'js',
    'ts'
]

const update = async(topicId) => {

    const json = yaml.load(`topics/${topicId}.yaml`);

    const ref = db.collection('topics').doc(topicId);

    await ref
        .set(json, { merge: true })
        .catch(e => console.log(`'${topicId}' upload failed with error: ${e.details}`));

    console.log(`'${topicId}' is DONE`);
}

for (const topic of topics) {
    update(topic);
}



