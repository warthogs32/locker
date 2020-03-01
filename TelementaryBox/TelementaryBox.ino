#include <Servo.h>
#include <NewPing.h>

//SLO Hacks 2020 Tele-Mentary Box

uint16_t unlockPos = 0;
uint16_t lockPos = 160;

const uint8_t unlockerServoPin = 9;
const uint8_t trigPin = 12;
const uint8_t echoPin = 11;
const uint8_t buttonPin = 7;

int distance;
bool boxOpen;
const uint16_t threshold = 30;

Servo unlocker;
NewPing sonar(trigPin, echoPin, 50);

void setup() {
  unlocker.attach(unlockerServoPin);
  Serial.begin(9600);
  pinMode(8, OUTPUT);
  digitalWrite(8,HIGH); //current source pin

  pinMode(buttonPin, INPUT_PULLUP);

}

void loop() {
  handle_serial();
  distance = sonar.convert_cm(sonar.ping_median(5));
  boxOpen = digitalRead(buttonPin);
  Serial.println(String(distance) + "*" + String(boxOpen));
}

void unlock(Servo myservo) {
  myservo.write(unlockPos);
}

void lock(Servo myservo) {
  myservo.write(lockPos);
}

void handle_serial() {
  if (Serial.available() > 0) {
    char incoming_char = Serial.read();
    switch (incoming_char) {
      case 'U':
        Serial.println("Door Unlocked");
        unlock(unlocker);
        break;
      case 'L':
        Serial.println("Door Locked");
        lock(unlocker);
        break;
    }
  }
}
