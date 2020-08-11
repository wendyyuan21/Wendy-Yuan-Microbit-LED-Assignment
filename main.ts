//Led list
let leds: number[] = []
//Screen starts blank
basic.clearScreen();

//Calculate X Y coordinates from position 
function getXYFromPosition(pos: number) {
    return { x: pos % 5, y: pos / 5};
}

// When Button A is pressed
input.onButtonPressed(Button.A, function () {
    let next_led;
    if (leds.length != 25) {
        do {
            next_led = Math.floor(Math.random() * 25);
        } while(leds.indexOf(next_led) != -1);
        leds.push(next_led)
        let coords = getXYFromPosition(next_led);
        led.plot(coords.x, coords.y);
    } else {
        //If the screen is full, turn off all lights, 
        //wait 100 ms, and turn them all back on.
        basic.clearScreen();
        basic.pause(100);
        led.toggleAll();
    }
})

// When Button B is pressed
input.onButtonPressed(Button.B, function () {
    //Remove oldest lit led
    if (leds.length > 0) {
        let oldest_lit_led = leds[0];
        let coords = getXYFromPosition(oldest_lit_led);
        led.unplot(coords.x,coords.y);
        leds.removeAt(0);
    } else {
        //Turn on all lights, wait 100ms, turn off all
        led.plotAll();
        basic.pause(100);
        basic.clearScreen();
    }
})

// When Button A and B are pressed
input.onButtonPressed(Button.AB, function () {
    //Clear screen, show 'RESET', clear the led list
    basic.clearScreen();
    basic.showString("RESET");
	leds = [];	
})
