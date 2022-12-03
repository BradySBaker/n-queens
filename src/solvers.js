/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n, startingPoint) {

  // Checks if point is already in our list --------
  var alreadyPoint = function(c, r) {
    var result = false;
    ignorePoints.forEach(function(curPoint) {
      if (c === curPoint[0] && r === curPoint[1]) {
        result = true;
      }

    });
    return result;
  //Loop through all needed rooks
  };
  // Checks if point is already in our list -------

  //Set board at startingPoint equal to 1
  var startingPoint = startingPoint !== undefined ? startingPoint : [0, 0];
  var board = new Board({n: n});
  board.get(startingPoint[0])[startingPoint[1]] = 1;

  //Variable that holds an array of points to ignore in while
  var ignorePoints = [startingPoint];
  for (var i = 1; i < n; i++) {
    var c = 0;
    var r = 0;
    while (alreadyPoint(c, r)) {
      r++;
    }
    board.get(c)[r] = 1;
    console.log(board.hasRowConflictAt(c) + ' ' + board.hasColConflictAt(r))
    //Shift ones until no conflict occurs
    while (board.hasRowConflictAt(c) || board.hasColConflictAt(r)) {
      console.log(c + '' + r);
      //Check if we already did this point
      if (alreadyPoint(c, r) === true) {
        r++;
        continue;
      }
      board.get(c)[r] = 0;
      r++;
      if (r === 3) {
        r = 0;
        c++;
      }
      board.get(c)[r] = 1;
    }
    ignorePoints.push([c, r]);
  }
  console.log(board.attributes);
  return board;
};
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  /*
  var board = undefined;
  var solution = 0;
  for (var c = 0; c < n; c++) {
    for (var r = 0; r < n; r++) {
      board = new Board({n: n});
      board.get(c)[r] = 1;
      var nextRow = 0;
      if (c === 0 && r === 0) {
        var nextRow = 1;
      }
      board.get(0)[nextRow] = 1;
      var noSolution = false;
    }
  }
  if (noSolution === false) {
    solution++;
    console.log(board);
  }
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
  */
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
