const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class TowersOfHanoi {
    constructor (stack) {
        this.height = stack.slice().length;
        this.towers = [stack,[],[]];
    }
    
    promptMove(completionCallback) {
        this.print();
        reader.question(`Make a move from one stack to the other: i.e. '1 2', `, answer => {
            const move = answer.split(" ");
            const startTowerIdx = parseInt(move[0]);
            const endTowerIdx = parseInt(move[1]);
            if (this.isValidMove(startTowerIdx, endTowerIdx)) {
                this.move(startTowerIdx, endTowerIdx);
                if (this.isWon()) {
                    completionCallback();
                    reader.close();
                } else {
                    this.run(completionCallback);
                }
            }
        });
    }

    isValidMove(startTowerIdx, endTowerIdx) {
        return this.towers[startTowerIdx][0] < this.towers[endTowerIdx][0] || this.towers[endTowerIdx][0] === undefined;
    }

    move(startTowerIdx, endTowerIdx) {
        if (this.isValidMove(startTowerIdx, endTowerIdx)) {
            let el1 =this.towers[startTowerIdx].shift();
            this.towers[endTowerIdx].unshift(el1);
            return true;
        } else {
            return false;
        }
    }
    print() {
        console.log(JSON.stringify(this.towers));
    }
    isWon() {
        if (this.towers[1].length === this.height || this.towers[2].length === this.height) {
            return true;
        } else {
            return false;
        }
    }
    run(completionCallback) {
        this.promptMove(completionCallback);
    }
}

towersGame = new TowersOfHanoi([1,2,3]);
towersGame.run(() => console.log(`You Win`));

