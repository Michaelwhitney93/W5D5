class Clock {
  constructor() {
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals.  
    const currentDate = new Date();
    this.hours = currentDate.getHours();
    this.minutes = currentDate.getMinutes();
    this.seconds = currentDate.getSeconds();
    this.printTime();
    setInterval(this._tick.bind(this), 1000);
}

printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    let time = `${this.hours}:${this.minutes}:${this.seconds}`;
    console.log(time);
  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.
    if (this.seconds < 59) {
        this.seconds++;
    } else if (this.minutes < 59) {
        this.minutes++;
        this.seconds = 0;
    } else if (this.hours < 23) {
        this.hours++;
        this.minutes = 0;
        this.seconds = 0;
    } else {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
    }
    this.printTime();
  }
}

// const clock = new Clock();
const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
    if (numsLeft === 0) {
        console.log(completionCallback(sum));
        reader.close();
    }
    if (numsLeft > 0) {
        reader.question(`Pick a number: `, answer => {
            sum += parseInt(answer);
            console.log(sum);
            addNumbers(sum, numsLeft - 1, completionCallback);
        });
    }
}

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));






function askIfGreaterThan(el1, el2, callback) {
    reader.question(`Is ${el1} > ${el2}?`, answer => {
        if (answer === 'yes') {
            callback(true);
        } else if (answer === 'no') {
            callback(false);
        } 
    });
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
    if (i < arr.length - 1) {
        askIfGreaterThan(arr[i], arr[i+1], (isGreaterThan) => {
            if (isGreaterThan === true) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                madeAnySwaps = true;
            }
            innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
        });
    }
    if (i === (arr.length - 1)) {
        outerBubbleSortLoop(madeAnySwaps);
    }
}


function absurdBubbleSort(arr, sortCompletionCallback) {
    function outerBubbleSortLoop(madeAnySwaps) {
        if (madeAnySwaps) {
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
        } else {
            sortCompletionCallback(arr);
        }
    }
    outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 2, 1], function (arr) {
    console.log("Sorted array: " + JSON.stringify(arr));
    reader.close();
});

Function.prototype.myBind = function (context) {

    return () => {
        this.apply(context);
    };
};



class Lamp {
    constructor() {
        this.name = "a lamp";
    }
}

const turnOn = function () {
    console.log("Turning on " + this.name);
};

const lamp = new Lamp();
class Computer {
    constructor() {
        this.name = "a constructor";
    }
}

const comp = new Computer();
// turnOn(); // should not work the way we want it to

const boundTurnOn = turnOn.bind(lamp);
const myBoundTurnOn = turnOn.myBind(lamp);
const myBoundTurnOn2 = turnOn.myBind(comp);

boundTurnOn(); // should say "Turning on a lamp"
myBoundTurnOn(); // should say "Turning on a lamp"

myBoundTurnOn2();