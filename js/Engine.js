// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
class Engine {
  // The constructor has one parameter. It will refer to the DOM node that we will be adding everything to.
  // You need to provide the DOM node when you create an instance of the class
  constructor(theRoot) {
    // We need the DOM element every time we create a new enemy so we
    // store a reference to it in a property of the instance.
    this.root = theRoot;
    // We create our hamburger.
    // Please refer to Player.js for more information about what happens when you create a player
    this.player = new Player(this.root);
    // Initially, we have no enemies in the game. The enemies property refers to an array
    // that contains instances of the Enemy class
    this.enemies = [];
    //audio
    this.gameScoreBox = new Text(this.root, 30, 30);
    // this.audio = new Audio("./images/music.mp3");
    // We add the background image to the game
    this.gameOver = new Text(this.root, 190, 150);
    // this.resetBtn = new Button(this.root, 410, 30);
    // this.resetBtn.domElement.addEventListener(
    //   "click",
    //   function (e) {
    //     location.reload();
    //   },
    //   { once: true }
    // );
    addBackground(this.root);
    this.livesLeft = new Text(this.root, 30, 80);
  }

  // The gameLoop will run every few milliseconds. It does several things
  //  - Updates the enemy positions
  //  - Detects a collision between the player and any enemy
  //  - Removes enemies that are too low from the enemies array
  gameLoop = () => {
    this.gameScoreBox.update(`Score: ${gameScore++}`);
    // this.livesLeft.update(`Lives: ${lives--}`);
    // this.resetBtn.reset();
    // This code is to see how
    // let audio = new Audio("./images/music.mp3");
    // audio.play();
    // time this method was called.
    // (new Date).getTime() evaluates to the number of milliseconds since January 1st, 1970 at midnight.
    if (this.lastFrame === undefined) {
      this.lastFrame = new Date().getTime();
    }

    let timeDiff = new Date().getTime() - this.lastFrame;

    this.lastFrame = new Date().getTime();
    // We use the number of milliseconds since the last call to gameLoop to update the enemy positions.
    // Furthermore, if any enemy is below the bottom of our game, its destroyed property will be set. (See Enemy.js)
    this.enemies.forEach((enemy) => {
      // console.log(timeDiff);
      enemy.update(timeDiff);
    });

    // We remove all the destroyed enemies from the array referred to by \`this.enemies\`.
    // We use filter to accomplish this.
    // Remember: this.enemies only contains instances of the Enemy class.
    this.enemies = this.enemies.filter((enemy) => {
      return !enemy.destroyed;
    });

    // We need to perform the addition of enemies until we have enough enemies.
    while (this.enemies.length < MAX_ENEMIES) {
      // We find the next available spot and, using this spot, we create an enemy.
      // We add this enemy to the enemies array
      const spot = nextEnemySpot(this.enemies);
      this.enemies.push(new Enemy(this.root, spot));
    }

    // We check if the player is dead. If he is, we alert the user
    // and return from the method (Why is the return statement important?)
    if (this.isPlayerDead()) {
      // window.alert("Game over");

      audio.pause();
      document.removeEventListener("keydown", keydownHandler);
      this.gameOver.update(`You lost`);

      // }
      // this.gameScoreBox.style.display = "none";
      // this.gameScoreBox.style.display = none;
      return;
    }

    // If the player is not dead, then we put a setTimeout to run the gameLoop in 20 milliseconds
    setTimeout(this.gameLoop, 20);
  };
  // audio = document.getElementById(audio);
  // This method is not implemented correctly, which is why
  // the burger never dies. In your exercises you will fix this method.
  isPlayerDead = () => {
    let playerLeft = this.player.x;
    let playerRight = this.player.x + PLAYER_WIDTH;
    let playerTop = GAME_HEIGHT - PLAYER_HEIGHT - 10;
    let playerBottom = GAME_HEIGHT - 10;
    let isCollision = false;
    this.enemies.forEach((enemy) => {
      let enemyLeft = enemy.x;
      let enemyRight = enemy.x + ENEMY_WIDTH;
      let enemyTop = enemy.y;
      let enemyBottom = enemy.y + ENEMY_HEIGHT;
      // console.log(enemyLeft);
      // console.log(playerLeft);
      if (
        playerLeft < enemyRight &&
        playerRight > enemyLeft &&
        playerTop < enemyBottom &&
        playerBottom > enemyTop
      ) {
        isCollision = true;
      }
    });
    // audio.pause();
    return isCollision;
    // console.log(this.player);
  };
  // life = () => {
  //   if (this.isPlayerDead) {
  //     console.log(lives--);
  //   }
  //   if (lives <= 0) {
  //     console.log("hello");
  //   }
  // };
}
