// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(rowIndex, colIndex) ||
        this.hasMinorDiagonalConflictAt(rowIndex, colIndex)
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    /*
    Rook Placement:
    ---------
    Has to be placed diagonaly
    Every new rook diagonal
    -------------
    Check if there are any 1's in current array and if there are any 1's in other array at cur index
    ------------
    N = ;
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]

    N = 3;
    6 Methods
    [0, 0, 1],
    [1, 0, 0],
    [0, 1, 0]

    N = 2;
    2 Methods
    [0, 1],
    [1, 0]

    Queen Placement:
    ---------
    Move anywhere
    There can't be any diagonal or up and down
    ---------
    Check if there are any 1's in current array and if there are any 1's in other array at cur index
    Check next array index + 1 and index - 1
    ---------
    0 Methods
    [0, 1],
    [1, 0]

    0 Methods
    [1, 0, 0],
    [0, 0, 0],
    [0, 0, 1]

    4 Methods
    [0, 0, 1, 0],
    [1, 0, 0, 0],
    [0, 0, 0, 1],
    [0, 1, 0, 0]
    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict

    /*[0, 1, 0],
    [0, 0, 0],
    [0, 0, 0]*/

    //Check if there are any 1's in current array and if there are any 1's in other array at cur index

    //Loop through each array in matrix
      //var one-ammount = 0
      //Loop through row/array
        //if one found
          //Add to one amount
        //if one-ammount is greater then one
          //return false
    //return true

    hasRowConflictAt: function(rowIndex) {
      var pieces = 0;
      this.get(rowIndex).forEach(function(curSquare) {
        pieces += curSquare;
      });
      return pieces > 1;//index;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var x = 0; x < this.attributes.n; x++) {
        if (this.hasRowConflictAt(x)) {
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict

    //Pieces = 0
    //Use for each and loop through every key
      //Check cur array at colIndex
        //If 1 found add 1 to pieces
    //return pieces > 1

    hasColConflictAt: function(colIndex) {
      var pieces = 0;
      _.each(this.attributes, function(curRow) {
        if (Array.isArray(curRow) === true) {
          pieces += curRow[colIndex];
        }
      });
      return pieces > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var x = 0; x < this.attributes.n; x++) {
        if (this.hasColConflictAt(x)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right

    //Check if there are any 1's in current array and if there are any 1's in other array at cur index
    //Check next array index + 1 and index - 1

    // --------------------------------------------------------------

    hasMajorDiagonalConflictAt: function(rowIdx, colIdx) {
      /*
      var originalRow = rowIdx;
      var originalColumn = colIdx;
      var pieces = 0;
      for (var x = colIdx; x < this.attributes.n; x++) {
        if (rowIdx === this.attributes.n) {
          break;
        }
        var curRow = this.get(rowIdx);
        if (curRow[x] === 1) {
          pieces++;
        }
        if (pieces > 1) {
          return true;
        }
        rowIdx++;
      }
      rowIdx = originalRow;
      colIdx = originalColumn - 1;
      for (var x = colIdx; x >= 0; x--) {
        rowIdx--;
        if (rowIdx < 0) {
          return false;
        }
        var curRow = this.get(rowIdx);
        if (curRow[x] === 1) {
          pieces++;
        }
        if (pieces > 1) {
          return true;
        }
      }

      return false; // fixme
      */
    },


    // test if any major diagonals on this board contain conflicts
    //0 0
    //0 1
    //0 2
    //0 3
    //1 0
    //1 1
    hasAnyMajorDiagonalConflicts: function() {
      /*
      for (var x = 0; x < this.attributes.n; x++) {
        for (var c = 0; c < this.attributes.n; c++) {
          if (this.hasMajorDiagonalConflictAt(x, c)) {
            return true;
          }
        }
      }
      return false; // fixme
      */
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(rowIdx, colIdx) {
      // var originalRow = rowIdx;
      // var originalColumn = colIdx;
      // var pieces = 0;
      // // col idx 2
      // // row idx 1
      // for (var x = colIdx; x >= 0; x--) {
      //   if (rowIdx === this.attributes.n) {
      //     break;
      //   }
      //   var curRow = this.get(rowIdx);
      //   if (curRow[x] === 1) {
      //     pieces++;
      //   }
      //   if (pieces > 1) {
      //     return true;
      //   }
      //   rowIdx++;
      // }
      // rowIdx = originalRow;
      // colIdx = originalColumn + 1;
      // for (var x = colIdx; x < this.attributes.n; x++) {
      //   rowIdx--;
      //   if (rowIdx < 0) {
      //     return false;
      //   }
      //   var curRow = this.get(rowIdx);
      //   if (curRow[x] === 1) {
      //     pieces++;
      //   }
      //   if (pieces > 1) {
      //     return true;
      //   }
      // }

      // return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // for (var x = 0; x < this.attributes.n; x++) {
      //   for (var c = 0; c < this.attributes.n; c++) {
      //     if (this.hasMinorDiagonalConflictAt(x, c)) {
      //       return true;
      //     }
      //   }
      // }
      // return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
