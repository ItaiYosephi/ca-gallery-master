
/**
 * Shuffles array in place.
 * @param {Array} items items An array containing the items.
 */

function shuffle(items) {

    for (var i = items.length - 1; i > 0; i--) {
        var randIdx = Math.floor(Math.random() * (i + 1));
        var temp = items[i];
        items[i] = items[randIdx];
        items[randIdx] = temp;
    }

    return items;
}

function initRandomNums(size) {
    var nums = []
    for (var i = 0; i < size; i++) {
        nums[i] = i + 1;
    }
    shuffle(nums);
    return nums;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  
  function deleteById(items, id) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (id === item.id) {
        //  return gMonsters.splice(i, 1);
        return items.splice(i, 1)[0]
        console.log(items);
      }
    }
    return null;
  }
  
  // get the array, the filed and the value. 
  function findBy(items, key, value) {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (value === item[key]) {
        return item;
      }
    }
  }
  
  
  function isMatSquare(mat) {
    return mat.length === mat[0].length
  }
  
  function matrixToArray(mat) {
    var arr = []
    for (var i = 0; i < mat.length; i++) {
      arr = arr.concat(mat[i])
    }
    return arr
  }
  
  function getColumnAsArray(mat, colIdx) {
    var column = []
    for (var i = 0; i < mat.length; i++) {
      column.push(mat[i][colIdx]);
    }
    return column;
  }
  
  
  function getMatrix(rowCount, collCount, cellValue){
    var mat = []
    for( var i = 0; i < rowCount; i++){
        mat[i] = []
        for(var j = 0; j < collCount; j++){
            mat[i][j] = cellValue
        }
    }
    return mat
  }