const admin = require('firebase-admin');
const fs = require('fs-extra');
const yaml = require('yamljs');

admin.initializeApp({
    credential: admin.credential.cert(require('./credentials.json')),
});
const db = admin.firestore();


const toFile = async(id) => {

    const ref = db.collection('topics').doc(id);
    // const ref = db.collection('quizzes').doc(id);

    const data = await ref.get().then(v => v.data());

    const str = yaml.stringify(data, 8);

    await fs.outputFile(`topics/${id}.yaml`, str);
    // await fs.outputFile(`quizzes/${id}.yaml`, str);

    console.log('DONE')

}

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


for (const x of topics) {
    toFile(x);
}