var gameOfLife = {
  width: 20,
  height: 20,
  stepInterval: null,
  cells: [],

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");


    // build Table HTML
    var tablehtml = '';
    //console.log(this);
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;

    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);

    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    var cells = document.getElementsByTagName('td');
    Array.prototype.forEach.call(cells, function(cell){
      iteratorFunc(cell);
    });

  },


  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y"
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "on-click" events that allow a user to click on
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"

    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white

    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board

    var onCellClick = function (e) {
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?

      // how to set the style of the cell when it's clicked
      if (this.getAttribute('data-status') == 'dead') {
        this.className = "alive";
        //console.log('this should be this',this);
        this.setAttribute('data-status', 'alive');
      } else {
        this.className = "dead";
        this.setAttribute('data-status', 'dead');
      }
    };

    var stepBtn = document.getElementById('step_btn');
    var playBtn = document.getElementById('play_btn');
    var resetBtn = document.getElementById('reset_btn');
    var clearBtn = document.getElementById('clear_btn');
    var pauseBtn = document.getElementById('pause_btn');
    stepBtn.onclick = this.step.bind(this);
    playBtn.onclick = this.enableAutoPlay.bind(this);
    resetBtn.onclick = this.resetRandom.bind(this);
    clearBtn.onclick = this.clearBoard.bind(this);


    pauseBtn.onclick = function(){
            //console.log("in pause",this.pause);

      if(this.pause) this.pause = false;
      else this.pause = true;
    }.bind(this);


    var onCellIterator = function (e) {
      e.onclick = onCellClick;
    };

    this.forEachCell(onCellIterator);
  },

  step: function () {
    var gridArray = [];
    var xMax = this.width;
    var yMax = this.height;

    for (var i = 0; i <xMax; i++) {
      gridArray[i] = [];
      for (var j = 0; j < yMax; j++) {
         gridArray[i][j] = 0;
       }
    }

    var stepIterator = function(e){
      var status = e.className;
      var id = e.id.split('-');
      var count = 0;
      var x = parseInt(id[0]);
      var y = parseInt(id[1]);

      if (status === "alive"){

        gridArray[x][y] = 1;
      }




    };

    var rulesIterator = function(e){
      var status = e.className;
      var neighbors = 0;
      var id = e.id.split('-').map(parseFloat);
      var x = id[0];
      var y = id[1];

      for(var c=-1;c<2;c++){
          for(var d=-1;d<2;d++){
              if((x+c)<0 || (x+c) >=this.width)
                continue;


              else if(c==0 && d==0)
                continue;
              else if(gridArray[x+c][y+d])
                neighbors++;

          }
      }

      if(status==="alive"){
        if (neighbors<2) {
          e.className = "dead";
          e.setAttribute('data-status', 'dead');
        }
        else if (neighbors>3) {
         e.className = "dead";
         e.setAttribute('data-status', 'dead');
        }

      } else {
        if(neighbors===3) {
          e.className = "alive";
          e.setAttribute('data-status', 'alive');
        }
      }
    };

    this.forEachCell(stepIterator.bind(this));
    this.forEachCell(rulesIterator.bind(this));




    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game.
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors

  },

  enableAutoPlay: function () {
    this.pause = false;

    function start(){
      //console.log("in start",this.pause);
      
      if(!this.pause){
        this.step();
        setTimeout(start.bind(this), 300);
        
      }
    // Start Auto-Play by running the 'step' function
    // automatically repeatedly every fixed time interval

   }

   start.bind(this)();
   
  },

  clearBoard: function(){

    var clearIterator = function(e){
      e.className = "dead";
      e.setAttribute('data-status', 'dead');

    };
    this.forEachCell(clearIterator);
    this.pause = true;
  },
  pause: true,

  resetRandom: function(){
    var randomIterator = function(e){
      var randomN = Math.floor(Math.random()*2);
      if(randomN) {
        e.className = "alive";
        e.setAttribute('data-status', 'alive');
        } else {
          e.className = "dead";
          e.setAttribute('data-status', 'dead');
        }
    };
    this.forEachCell(randomIterator);
  }
};

  gameOfLife.createAndShowBoard();


