(function(){
  var name = "Mastermind";
  var colors = {
    1: '#000000', // noir
    2: '#FFFFFF', // blanc
    3: '#CC3333', // rouge
    4: '#ff9600', // orange
    5: '#fff000', // jaune
    6: '#0005c2', // bleu
  };
  var settings = {
    lines: 12, // lignes disponibles pour arriver au résultat
    columns: 4, // colonnes de couleurs
    colors: 6, // couleurs disponibles
  };

  var game = new Game(settings, colors);
})();
