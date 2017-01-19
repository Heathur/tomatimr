class Timer {
	constructor(seconds) {
		if (this.isValidTime(seconds)) {
			this.secondsRemaining = seconds; 
		}
		else {
			this.secondsRemaining = 0; 
		}
		this.intervalId = 0; 
		this.running = false;
		this.numberOfSeshes = 0; 
	}

	// Enforce durations: 25 minutes for a session OR 5 minutes for a break.
	isValidTime(seconds) {
		return (seconds === 1500 || seconds === 300 || seconds === 600); 
	}
	
	// Reset the timer 
	reset(duration) {
		if (this.isValidTime(duration)) {
			this.secondsRemaining = duration; 
			this.start(); 
		}
		else {
			this.secondsRemaining = 0; 
		}
	}

	// String representation of timer
	toString() {
		var minutes = Math.floor(this.secondsRemaining / 60); 
		var seconds = this.secondsRemaining % 60; 

		if (minutes < 10) {
			minutes = "0" + minutes; 
		}
		if (seconds < 10) {
			seconds = "0" + seconds; 
		}
		return minutes + ":" + seconds; 
	}

	// Begin the timer. 
	start() {
		if (this.running === false) {
			this.intervalId = setInterval( () => {
				//console.log(this.toString()); 
				document.getElementById("timer-text").innerHTML = this.toString(); 
				if (this.secondsRemaining > 0) {
					this.secondsRemaining -= 1; 
					this.running = true; 
				}
				else {
					this.running = false; 
					this.playSound(); 
					clearInterval(this.intervalId); 
				}
			}, 1000); 
		}
	}

	// Pause the timer. 
	pause() {
		clearInterval(this.intervalId); 
		this.running = false; 
	}

	// Play a sound when the timer has elapsed 
	playSound() {
		var timerSnd = new Audio('/Scripts/Bell-tone.mp3');
		if(this.running === false) {
			timerSnd.play();
		}
	}

	longBreakTime() {

		var x = document.getElementById("last-box"); 

		if (x.checked === true) {
			document.getElementById("victory-message").setAttribute("style", "display:block;"); 
		}
		else {
			document.getElementById("victory-message").setAttribute("style", "display:none;"); 
		}
		
	}
}

var mainTimer = new Timer(0); 
document.getElementById("timer-text").innerHTML = mainTimer.toString(); 