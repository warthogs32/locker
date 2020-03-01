import serial
import pyrebase

ser = serial.Serial('COM7')
ser.baudrate = 9600

config = {
"apiKey": "AIzaSyDXHTIuyXFoHfzDM0nkRmkVMEa2B2H8hxY",
"authDomain": "slohacks-269509.firebaseapp.com",
"databaseURL": "https://slohacks-269509.firebaseio.com",
"storageBucket": "slohacks-269509.appspot.com"
}

firebase = pyrebase.initialize_app(config)
db = firebase.database()

def ardToDb():
    serialInput = str(ser.readline(), 'utf-8')
    list1 = serialInput.split('*')
    for i in range(len(list1)):
        list1[i] = list1[i].rstrip()
    if len(list1[0]) > 0:
        distance = int(str(list1[0]))
    else:
        distance = 0
    if len(list1) > 1 and len(list1[1])>0:
        boxOpen = bool(int(list1[1]))
    else:
        boxOpen = True

    db.update({"distance":distance})
    db.update({"boxOpen": boxOpen})


def dbToArd():
    boxLocked = db.child("boxLocked").get().val()
    if boxLocked:
        ser.write('l'.encode('utf-8'))
    else:
        ser.write('u'.encode('utf-8'))

while True:
    ardToDb()
    dbToArd()

