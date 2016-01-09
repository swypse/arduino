/*
 * ./init.c
 */

#include <stdio.h>
#include <avr/io.h>
#include <util/delay.h>
#include <adc.h>
#include <uart.h>
#include <uart_stdio.h>
#include <gpio.h>


int init() {
	adc_init();
	uart_init();
	uart_stdio_init();
	gpio_init();

    /* before uncomment add uart, uart_stdio and gpio modules */
	/*gpio_dir(&DDRB, PB5, GPIO_DIR_OUT);
	printf("system init ok\n");*/
	return 0;
}

