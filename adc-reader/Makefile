
.PHONY: all clean
SRC = ./init.c main.c lib/adc/adc.c lib/uart/uart.c lib/uart_stdio/uart_stdio.c lib/gpio/gpio.c 
OBJS = init.o main.o adc.o uart.o uart_stdio.o gpio.o 
TARGET = main
MCU = atmega328p
CC = avr-gcc
OBJCOPY = avr-objcopy
CFLAGS = -mmcu=$(MCU) -Wall -g -Os -lm  -mcall-prologues -I./lib  -Ilib/adc  -Ilib/uart  -Ilib/uart_stdio  -Ilib/gpio 
LDFLAGS = -mmcu=$(MCU)  -Wall -g -Os
SYMBOLS = -DF_CPU=16000000UL
CLEAN = *.o *.s *.elf *.bin

all:
	make $(TARGET).hex
	make flash
	make clean

$(TARGET).elf:
	$(CC) $(CFLAGS) $(SYMBOLS) -c $(SRC)
	$(CC) $(LDFLAGS) -o $(TARGET).elf  $(OBJS) -lm

$(TARGET).bin: $(TARGET).elf
	$(OBJCOPY) -O binary -R .eeprom -R .nwram $(TARGET).elf $(TARGET).bin

$(TARGET).hex: $(TARGET).bin
	$(OBJCOPY) -O ihex -R .eeprom -R .nwram  $(TARGET).elf $(TARGET).hex

clean:
	rm -rf $(CLEAN)


# Serial console to target
TTY = /dev/tty.usbmodem1411
TTY_BAUD = 9600

tty:
	minicom -D$(TTY) -b$(TTY_BAUD)

# dude
DUDE_BAUD = 115200
DUDE_MCU = m328p
DUDE_PROGRAMMER = arduino
DUDE_SERIAL = /dev/tty.usbmodem1411

erase:
	#todo

flash:
	avrdude -p $(DUDE_MCU) -c $(DUDE_PROGRAMMER) -P $(DUDE_SERIAL) -b $(DUDE_BAUD) -U flash:w:$(TARGET).hex
