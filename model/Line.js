function Line(gameObj, parent, index, length) {
  this.game = gameObj;
  this.parent = parent;
  this.index = index;
  this.length = length;

  this.init();
};

Line.prototype.init = function () {
  line = document.createElement('tr');
  line.id = 'turn-' + this.index;

  new Cell(gameObj = this.game, parent = line, innerHTML = this.index, width = '32px');

  for (j = 1; j <= this.length; j++) {
    new Playable(gameObj = this.game, parent = line, row = this.index, col = j, width = '32px')
  }

  for (j = 1; j <= this.length; j++) {
    new Clue(parent = line, row = this.index, col = j, width = '16px')
  }

  new OkButton(gameObj = this.game, parent = line, index = this.index, width = '16px')

  this.parent.appendChild(line);
};
