
#include <ThingSpeak.h>
#include <Wire.h>
#include <Adafruit_DHT.h>

TCPClient client;
unsigned long myChannelNumber = 1738980;        //Thingspeak channel id
const char * myWriteAPIKey = "8D9MOXJY6LDGYSNK";  //Channel's write API key

DHT dht(D2, DHT11);
int boardLed = D7; 
int moisture_pin = A1;
int moisture_pin_2 = A2;
int Val = 0;




void setup() {
  ThingSpeak.begin(client);
  pinMode(boardLed,OUTPUT); 
  pinMode(moisture_pin,INPUT); 
  pinMode(moisture_pin_2,INPUT); 
  dht.begin();
  Wire.begin(8);                // join i2c bus with address #8
Wire.onRequest(platform1); 
Particle.function("red", Red);
}

void loop() {
    delay(500);
	float humidity = dht.getHumidity();
	float temperature = dht.getTempCelcius();
	
     if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return; 
     }
    // moisture sensor
    int moisture_analog = analogRead(moisture_pin);
    int moisture_analog_2 = analogRead(moisture_pin_2);
    
    float moisture_percentage = (100 - ( (moisture_analog/4095.00) * 100 ) );
    float moisture_percentage_2 = (100 - ( (moisture_analog_2/4095.00) * 100 ) );
    
    digitalWrite(boardLed,LOW);
    ThingSpeak.setField(1, humidity);
    ThingSpeak.setField(2,temperature);
    ThingSpeak.setField(3,moisture_percentage);
    ThingSpeak.setField(4,moisture_percentage_2);
    
    ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
    delay(20000);
  

}
int Red(String test){
 Val = 1;
 return 0;
}

void platform1() {
 if(Val == 1){
   Wire.write("2");
   Val = 0;
 }
 else{
    
 }
}
