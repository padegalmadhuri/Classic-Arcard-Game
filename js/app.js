let Enemy = function(x, y, speed) {
    "use strict";
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    "use strict";
    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = 0;
    }
    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(x, y, speed) {
    "use strict";
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-pink-girl.png';
};

Player.prototype.update = function() {

}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel);

};

Player.prototype.handleInput = function(keyPress) {
    "use strict";
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed - 20;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.y += this.speed - 20;
    }
    console.log('keyPress is: ' + keyPress);
};


let displayScoreLevel = function(aScore, aLevel) {
    const canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];


    scoreLevelDiv.innerHTML = 'Score: ' + aScore +
        ' / ' + 'Level: ' + aLevel;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

let checkCollision = function(anEnemy) {
    "use strict";

    if (
        player.y + 130 >= anEnemy.y + 89 &&
        player.x + 20 <= anEnemy.x + 85 &&
        player.y + 70 <= anEnemy.y + 130 &&
        player.x + 67 >= anEnemy.x + 8) {
        console.log('collided');
                player.x = 202.5;
        player.y = 383;
    }

    if (player.y + 63 <= 0) {
        player.x = 202.5;
        player.y = 383;
        console.log('Congrats, you made it!');

        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        score += 1;
        gameLevel += 1;
        console.log('Current Core: ' + score + ', Current Level: ' + gameLevel);
        increaseDifficulty(score);

    }

    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > 383) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (let i = 0; i <= numEnemies; i++) {
        let enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let allEnemies = [];
let player = new Player(202.5, 383, 50);
let score = 0;
let gameLevel = 1;
let scoreLevelDiv = document.createElement('div');
const enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    console.log(allowedKeys[e.keyCode]);
});
