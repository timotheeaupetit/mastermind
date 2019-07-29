function Piece(parent, index, color) {
  this.element = document.createElement('div');
  this.element.className = 'pion';
  this.element.style.background = color;

  parent.appendChild(this.element);
};

Piece.prototype.setAction = function (action) {
  this.element.setAttribute('onclick', action);
};


//_____________________________________________________
function PickablePiece(gameObj, parent, index, color) {
  Piece.call(this, parent, index, color);

  // this.setAction(gameObj + '.selectColor(' + index + ');');
};

PickablePiece.prototype = Object.create(Piece.prototype);
PickablePiece.prototype.constructor = PickablePiece;
