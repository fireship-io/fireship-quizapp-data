const admin = require('firebase-admin');
const fs = require('fs-extra');
const yaml = require('yamljs');

admin.initializeApp({
    credential: admin.credential.cert(require('./credentials.json')),
});
const db = admin.firestore();

const quizzes = [
    'angular-basics',
    'flutter-scroll',
    'cf-basics',
    'cf-triggers',
    'firebase-perf',
    'firestore-basics',
    'flutter-basics',
    'flutter-containers',
    'flutter-flex',
    'flutter-gestures',
    'flutter-material',
    'flutter-scroll',
    'js-basics',
    'js-variables',
    'rxjs-basics',
    'ts-basics'
]

const update = async(quizId) => {

    const json = yaml.load(`quizzes/${quizId}.yaml`);

    const ref = db.collection('quizzes').doc(quizId);

    await ref
        .set(json, { merge: true })
        .catch(e => console.log(`'${quizId}' upload failed with error: ${e.details}`));

    console.log(`'${quizId}' is DONE`);
}

for (const quiz of quizzes) {
    update(quiz);
}



