const admin = require('firebase-admin');
const fs = require('fs-extra');
const yaml = require('yamljs');

admin.initializeApp({
    credential: admin.credential.cert(require('./credentials.json')),
});
const db = admin.firestore();


const toFile = async(id) => {

    const ref = db.collection('tasks').doc(id);

    const data = await ref.get().then(v => v.data());

    const str = yaml.stringify(data, 8);

    await fs.outputFile(`tasks/${id}.yaml`, str);

    console.log('DONE')

}

const topics = [
    'task1'
]


for (const x of topics) {
    toFile(x);
}