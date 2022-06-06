from smbus import SMBus
import RPi.GPIO as GPIO
from time import sleep
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

Ena,In1,In2,In3,In4 = 17,27,22,23,24
GPIO.setup(Ena,GPIO.OUT)
GPIO.setup(In1,GPIO.OUT)
GPIO.setup(In2,GPIO.OUT)
GPIO.setup(In3,GPIO.OUT)
GPIO.setup(In4,GPIO.OUT)
pwm = GPIO.PWM(Ena,100)
pwm.start(0)

addr = 0x8
bus = SMBus(1)
send = 1
print("Running")
try:
 while True:
    i22c = bus.read_byte(addr)
   
    if i22c == 50:
        pwm.start(0)
        GPIO.output(In1,GPIO.LOW)
        GPIO.output(In2,GPIO.HIGH)
        pwm.ChangeDutyCycle(100)
        sleep(10)
        pwm.stop(0)

    else:
       
        print("k co")
except KeyboardInterrupt:
 GPIO.cleanup();