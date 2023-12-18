import firebase_admin
from firebase_admin import credentials, firestore
import yaml
import asyncio

# Initialize Firebase Admin SDK
cred = credentials.Certificate('./credentials.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

quizzes = [
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

async def update(quiz_id):
    with open(f'quizzes/{quiz_id}.yaml', 'r') as file:
        yaml_data = yaml.safe_load(file)

    print(yaml_data)

    ref = db.collection('quizzes').document(quiz_id)

    await ref.set(yaml_data, merge=True)

    print('DONE')

# Loop through quizzes and update Firestore
async def main():
    tasks = [update(quiz) for quiz in quizzes]
    await asyncio.gather(*tasks)

if __name__ == "__main__":
    asyncio.run(main())
