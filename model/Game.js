function Game(settings, colors) {
  this.settings = settings;
  this.colors = colors;

  this.turn = 1; // current turn
  this.column = 1; // current column
  this.selection = new Array(); // colors selcted by the player
  this.solution = new Array(); // game solution

  this.initialise();
}

Game.prototype.initialise = function () {
  this.startGame();
};

Game.prototype.startGame = function () {
  this.drawGameBoard();
  this.resetGame();
  this.defineSolution();
};

Game.prototype.drawGameBoard = function() {
  board = document.getElementById('game');
  board.innerHTML = '';

  for (i = this.settings.lines; i > 0; i--) {
    new Line(this, board, i, this.settings.columns)
  }

  colorSelector = document.getElementById('colorSelector');
  colorSelector.innerHTML = '';

  line = document.createElement('tr');
  for (i = 1; i <= this.settings.colors; i++) {
    new Choice(this, parent = line, index = i, color = this.colors[i], width = '32px')
  }
  colorSelector.appendChild(line);
};

Game.prototype.resetGame = function() {
  this.turn = 1;
  this.column = 1;

  document.getElementById('turn-1').className = 'selected';
  document.getElementById('turn-1-1').className = 'selected';
};

Game.prototype.defineSolution = function () {
  for (i = 1; i <= this.settings.columns; i++) {
    color = parseInt(Math.random() * this.settings.colors) + 1;
    this.solution[i] = color;
  }
};

Game.prototype.selectColor = function(color) {
  /* Verifie si la partie est toujours active */
  if (this.turn == -1) { return; }

  /* Retire la precedente selection si elle existe */
  document.getElementById('turn-' + this.turn + '-' + this.column).innerHTML = '';

  /* Ajoute la couleur a la selection faite par le joueur */
  this.selection[this.column] = color;

  const currentCell = document.getElementById('turn-' + this.turn + '-' + this.column);

  /* Ajoute visuellement la couleur sur le plateau */
  new Piece(
    parent = currentCell,
    index = color,
    color = this.colors[color]
  );

  /* Retire le marquage visuel de la case courante */
  currentCell.className = '';

  /* Verifie que le curseur n est pas sur la derniere case */
  if (this.column == this.settings.columns) {
    /* Place le curseur a la premiere case */
    this.column = 1;
  } else {
    /* Deplace le curseur du joueur sur la case suivante */
    this.column ++;
  }

  /* Ajoute le marquage visuel sur la nouvelle case courante */
  document.getElementById('turn-' + this.turn + '-' + this.column).className = 'selected';
};

Game.prototype.selectColumn = function(line, column) {
  /* Verifie si la ligne est bien la ligne courante, verifie en meme temps, si la partie est toujours active */
  if (line != this.turn) { return; }

  /* Retire le marquage visuel de la case courante */
  document.getElementById('turn-' + line + '-' + this.column).className = '';

  /* Selectionne la nouvelle colonne */
  this.column = column;

  /* Applique le marquage visuel sur la nouvelle case courante */
  document.getElementById('turn-' + line + '-' + this.column).className = 'selected';
};

Game.prototype.displayWin = function() {
  /* Affiche le resultat dans l espace dedie, en couleur */
  document.getElementById('result').innerHTML = 'You win!';
  document.getElementById('result').style.color = '#43b456';

  /* Affiche le marquage specific a la victoire sur la ligne courante */
  document.getElementById('turn-' +  this.game.turn).className = 'win';

  /* Marque la fin de la partie en indiquant une valeur null au tour en cours */
  this.game.turn = -1;
};

Game.prototype.displayLose = function() {
  /* Affiche le resultat dans l espace dedie, en couleur */
  document.getElementById('result').innerHTML = 'You lose';
  document.getElementById('result').style.color = '#CC3333';

  /* Marque la fin de la partie en indiquant une valeur nulle au tour en cours */
  this.game.turn = -1;
};
