//Class created to house the player and enemy classes
class Entity {
  constructor () {
    this.sprite = 'images/';
    this.x = 2;
    this.y = 5;
  }
//Define off-screen positions to update position
  update(dt) {
    this.offScreenX = this.x > 5;
    this.offScreenY = this.y < 1;
  }

//render method to draw images
//Added offset to match offsets in engine.js
//Made alignment adjustment to y-axis offset
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 78);
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
      modal.style.display = 'block';
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

//Enemy class with inheritance from Entity class
class Enemy extends Entity {
  constructor(x,y) {
    super();
    this.sprite += 'enemy-bug.png';
    this.x = x;
    this.y = y;
    //Set speed to random speed for enemies
    this.speed = Math.random() * 3;

  }
  
  update(dt) {
    super.update();
    this.x += this.speed * dt;
    if (this.offScreenX) {
      this.x = -1;
    }
    else {
      this.x += dt;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();
const enemyOne = new Enemy(-1, 1);
const enemyTwo = new Enemy(-3, 2);
const enemyThree = new Enemy(-2, 3);
const allEnemies = [enemyOne, enemyTwo, enemyThree];

//MODAL FOR WINNING THE GAME

//Modal script based on code from https://www.w3schools.com/howto/howto_css_modals.asp

// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Event listener for the Play Again button on the modal

let button = document.querySelector('.button-start');

button.addEventListener('click', function(event) {
  if (event.target == button) {
      modal.style.display = "none";
      window.location.reload(true);
  }
});

//Event listener for the New Game button
let restart = document.querySelector('.restart');

restart.addEventListener('click', function(event) {
  window.location.reload(true);
});

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

/*A big thanks goes to Slack name @Rodrick for the getting started
video he posted at https://zoom.us/recording/play/aulotDlzKFegQFIJTaTzKgWvNkVsYtlwO454vL1UPE1Cm6lOUBQCtfVurPOIAGAS?startTime=1529542978000
This video really helped me organize the classes and structure */
