function Cell(gameObj, parent, innerHTML, width) {
  this.game = gameObj;
  this.parent = parent;
  this.element = document.createElement('td');
  this.element.innerHTML = innerHTML;
  this.element.style.width = width;
  this.parent.appendChild(this.element);
};

Cell.prototype.setId = function (value) {
  this.element.id = value;
};

Cell.prototype.setClass = function (value) {
  this.element.className = value;
};

Cell.prototype.setAction = function (action) {
  this.element.setAttribute('onclick', action);
};


//_____________________________________________________
function Playable(gameObj, parent, row, col, width) {
  Cell.call(this, gameObj, parent, '', width);

  this.setId('turn-' + row + '-' + col);
  // this.setAction(this.game + '.selectColumn(' + row + ', ' + col + ');');
};
Playable.prototype = Object.create(Cell.prototype);
Playable.prototype.constructor = Playable;


//_____________________________________________________
function Clue(parent, row, col, width) {
  Cell.call(this, null, parent, '', width)

  this.setId('result-' + row + '-' + col);
};
Clue.prototype = Object.create(Cell.prototype);
Clue.prototype.constructor = Clue;


//_____________________________________________________
function Choice(gameObj, parent, index, color, width) {
  Cell.call(this, gameObj, parent, '', width)

  new PickablePiece(gameObj = this.game, parent = this.element, index = index, color = color);
};
Choice.prototype = Object.create(Cell.prototype);
Choice.prototype.constructor = Choice;


//_____________________________________________________
function OkButton(gameObj, parent, index, width) {
  Cell.call(this, gameObj, parent, 'OK', width);

  this.setId('valid-' + index);
  this.setClass('valid');
  // this.setAction(this.name + '.checkLine(' + index + ');');
};

OkButton.prototype = Object.create(Cell.prototype);
OkButton.prototype.constructor = OkButton;
