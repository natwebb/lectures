function add(x, y){
  return x+y;
}

function sum(x){
  var result = 0;
  for(var i=0; i < x.length; i++)
    result += x[i];
  return result;
}

function countEvens(nums){
  var count = 0;
  for(var i=0; i<nums.length; i++)
    if(nums[i]%2===0)
      count++;
  return count;
}

function makeEvenStringsUppercase(strs){
  for(var i = 0; i<strs.length; i++){
    if (strs[i].length%2===0)
      strs[i] = strs[i].toUpperCase();
  }
  return strs;
}

function sumLengthOfStrings(str){
  var result = 0;
  var splitStrings = str.split(" ");
  for(i = 0; i < splitStrings.length; i++)
    result += splitStrings[i].length;
  return result;
}

function makeCatWithName(x){
  return {name: x};
}
