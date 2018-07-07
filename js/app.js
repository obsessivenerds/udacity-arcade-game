//Class created to house the player and enemy classes
class Entity {
  constructor () {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }
//Define off-screen positions to update position with
  update(dt) {
    this.offScreenX = this.x > 5;
    this.offScreenY = this.y < 1;
  }

//render method to draw images
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 80);
  }

//Collision checks if both entities are in the same y-axis first, then if they occupy the same x-axis block
  checkCollisions(sprite) {
    if (this.y === sprite.y) {
      if (this.x >= sprite.x -0.5 && this. x <= sprite.x + 0.5) {
        return true;
      }
    }
    else {
      return false;
    }
  }
}

//Create the player class with inheritance from Entity
//Set moving and win to default value of false
class Player extends Entity {
  constructor() {
    super();
    this.sprite += 'char-boy.png';
    this.moving = false;
    this.win = false;
  }

  update(dt) {
    super.update();
    if (this.offScreenY && !this.moving && !this.win) {
      alert("Win");
      this.win = true;
    }
  }

  render() {
    super.render();
    this.moving = false;
  }

  //Switch statement to define movements
  handleInput(key) {
    switch(key) {
      case 'left':
        this.x = this.x > 0 ? this.x -1 : this.x;
        break;
      case 'right':
        this.x = this.x < 4 ? this.x + 1 : this.x;
        break;
      case 'up':
        this.y = this.y > 0 ? this.y -1 : this.y;
        break;
      case 'down':
        this.y = this.y <5 ? this.y +1 : this.y;
        break;
      default:
        break;
    }
    this.moving = true;
  }
}

//Enemy class with inheritance from Entity
class Enemy extends Entity {
  constructor(x,y) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x;
    this.y = y;
  }
  update(dt) {
    super.update();
    if (this.offScreenX) {
      this.x = -1;
    }
    else {
      this.x += dt;
    }
  }
}

// Enemies our player must avoid


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


// Draw the enemy on the screen, required method for game


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const allEnemies = [...Array(3)].map((_,i)=> new Enemy(0, i+1));

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
