/*
 * main.c
 */

#include <stdio.h>
#include <avr/io.h>
#include <util/delay.h>

#include "init.h"
#include <adc.h>
#include <uart.h>
#include <uart_stdio.h>
#include <gpio.h>

char buf[1];

int main() {
	init();
	
	while(1) {
		//printf("%d", adc_read(0));
		buf[0] = adc_read(0);
		uart_write(buf, 1);
		_delay_ms(100);
	}
	return 0;
}

