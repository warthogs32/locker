import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate('slohacks-269509-firebase-adminsdk-dun4x-9342e5bf13.json')
firebase_admin.initialize_app(cred)

db = firestore.client()
doc_ref = db.collection(u'log').document(u'test')
doc_ref.set(
{
    u'first' : u'jason'
})
