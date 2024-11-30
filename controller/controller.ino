#include <DHT.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>

// const char* ssid = "Instant Tethering c2950";  
// const char* password = "230401Ar";

const char* ssid = "AliWifi";  
const char* password = "123e5678";

const char* host = "192.168.1.13";
const int port = 8000; 

DHT dht(0, DHT11);

ESP8266WebServer server(80); 

void handleLEDOn() {
  digitalWrite(LED_BUILTIN, LOW);  
  server.send(200, "text/plain", "LED is ON");
}

void handleLEDOff() {
  digitalWrite(LED_BUILTIN, HIGH);
  server.send(200, "text/plain", "LED is OFF");
}

void handleTempHum() {
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity)) {
    server.send(500, "application/json", "{\"error\": \"Failed to read from DHT sensor\"}");
    return;
  }

  String jsonResponse = "{";
  jsonResponse += "\"temperature\": " + String(temperature, 2) + ",";
  jsonResponse += "\"humidity\": " + String(humidity, 2);
  jsonResponse += "}";

  server.send(200, "application/json", jsonResponse);
}


void setup() {
  Serial.begin(115200);
  dht.begin();

  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);  

  WiFi.begin(ssid, password);
  Serial.print("Connecting to Wi-Fi");

  unsigned long startAttemptTime = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 10000) {
    delay(500);
    Serial.print(".");
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("");
    Serial.println("Connected to Wi-Fi");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("Failed to connect to Wi-Fi");
  }

  server.on("/LED_ON", handleLEDOn);
  server.on("/LED_OFF", handleLEDOff);
  server.on("/Temp_Hum", handleTempHum);

  server.begin();
}

void loop() {
  server.handleClient(); 

}
