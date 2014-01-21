//function containsChar(theString, theChar){
//  if (theString.indexOf(theChar) === -1)
//    return false;
//  else
//    return true;
//}

function containsChar(theString, theChar){
  return theString.indexOf(theChar) !== -1;
}

function parseTags($tags){
  return $.map($tags, function(tag){
    return parseFloat(tag.textContent);
  });
}
