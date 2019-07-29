var MasterMind = {
  checkLine: function(line) {
    /* Verifie si la ligne est bien la ligne courante, verifie en meme temps, si la partie est toujours active */
    if (line != this.game['turn']) { return; }

    /* Verifie que la ligne a ete entierement remplie par le joueur */
    for (i = 1; i <= this.settings['columns']; i++) {
      if (!this.game['selection'][i]) { return; }
    }

    /* Duplique la solution pour pouvoir la modifier sans alterer l originale */
    soluce = this.game['solution'].slice(0);

    /* Initialise les variables de verification */
    correct = 0;
    misplaced = 0;

    /* Verifie les pions bien places */
    for (i = 1; i <= this.settings['columns']; i++) {
      if (this.game['selection'][i] == soluce[i]) {
        correct++;
        soluce[i] = 0;
        this.game['selection'][i] = 0;
      }
    }

    /* Verifie si tous les pions sont biens places, et auquel cas, afficher la victoire */
    if (correct == this.settings['columns']) {
      /* Utilise un return pour sortir de la method et ne pas continuer la verification */
      return this.displayWin();
    }

    /* Verifie les pions mal places, parmi les pions restant */
    for (i = 1; i <= this.settings['columns']; i++) {
      if (this.game['selection'][i] == 0) { continue; }
      loc = soluce.indexOf(this.game['selection'][i]);

      if (loc != -1) {
        this.game['selection'][i] = 0;
        soluce[loc] = 0;
        misplaced++;
      }
    }

    /* Affiche le bon nombre de pions bien places */
    for (i = 1; i <= correct; i++) {
      pion = document.createElement('div');
      pion.className = 'correct';
      document.getElementById('result-'+this.game['turn']+'-'+i).appendChild(pion);
    }

    /* Affiche le bon nombre de pions mal places */
    for (j = i; j < i+misplaced; j++) {
      pion = document.createElement('div');
      pion.className = 'misplaced';
      document.getElementById('result-'+this.game['turn']+'-'+j).appendChild(pion);
    }

    /* Prepare le jeu pour le tour suivant */

    /* Re-initialise la selection du joueur */
    this.game['selection'] = new Array();

    /* Retire le marquage visuel de la ligne courante  */
    document.getElementById('turn-'+this.game['turn']).className = '';

    /* Verifie que la ligne n etait pas la derniere, si auquel cas, afficher la defaite */
    if (this.game['turn'] == this.settings['lines']) {
      /* Utilise un return pour sortir de la method et ne pas continuer la verification */
      return this.displayLose();
    }

    /* Deplace le curseur sur la ligne suivante */
    this.game['turn'] ++;

    /* Applique le marquage sur la nouvelle ligne courante */
    document.getElementById('turn-'+this.game['turn']).className = 'selected';

    /* Place le curseur sur la premiere case */
    this.game['column'] = 1;

    /* Applique le marquage sur la premiere case */
    document.getElementById('turn-'+this.game['turn']+'-1').className = 'selected';
  },
};
