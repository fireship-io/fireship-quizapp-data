const admin = require('firebase-admin');
const fs = require('fs-extra');
const yaml = require('yamljs');

admin.initializeApp({
    credential: admin.credential.cert(require('./credentials.json')),
});
const db = admin.firestore();


const toFile = async(id) => {

    const ref = db.collection('users').doc(id);

    const data = await ref.get().then(v => v.data());

    const str = yaml.stringify(data, 8);

    await fs.outputFile(`data/${id}.yaml`, str);

    console.log('DONE')

}

const topics = [
    'users'
]


for (const x of topics) {
    toFile(x);
}