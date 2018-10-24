new Vue ({
  el: "#app",
  data: {
    monsterHealth: 100,
    playerHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      // damage to the monster, random number
      var damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;

      this.turns.unshift({
          isPlayer: true,
          text: 'Player hits Monster for ' + damage
      });

      if (this.checkWin()) {
        return;
      }

      // Monster attacks, we get damage
      this.monsterAttacks();
    },
    specialAttack: function() {
      // more damage to the monster
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
          isPlayer: true,
          text: 'Player hits Monster hard for ' + damage
      });

      if (this.checkWin()) {
        return;
      }

      // Monster attacks, we get damage
      this.monsterAttacks();
    },
    heal: function() {
      // heal ourselves
      if (this.playerHealth <= 90) {
         this.playerHealth += 10;
      } else {
          this.playerHealth = 100;
      }
      this.turns.unshift({
          isPlayer: true,
          text: 'Player heals for 10'
      });

      // monster attacks
      this.monsterAttacks();
    },
    giveUp: function() {
      // stop the game
      this.gameIsRunning = false;
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
          isPlayer: false,
          text: 'Monster hits Player for ' + damage
      });
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
          if (confirm('You won! New Game?')) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
          return true;
      } else if (this.playerHealth <= 0) {
          if (confirm('Monster won... New Game?')) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
          return true;
      }
      return false;
    }
  }
});
