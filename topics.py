import firebase_admin
from firebase_admin import credentials, firestore
import yaml
import asyncio

# Initialize Firebase Admin SDK
cred = credentials.Certificate('./credentials.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

topics = [
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

async def update(topic_id):
    with open(f'topics/{topic_id}.yaml', 'r') as file:
        yaml_data = yaml.safe_load(file)

    print(yaml_data)

    ref = db.collection('topics').document(topic_id)

    await ref.set(yaml_data, merge=True)

    print('DONE')

# Loop through topics and update Firestore
async def main():
    tasks = [update(topic) for topic in topics]
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    asyncio.run(main())
