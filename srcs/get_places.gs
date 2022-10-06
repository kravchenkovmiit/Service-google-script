function getPlacesFu(sheet) {
  var stockData = sheet.getDataRange().getDisplayValues();
  var i = 0;
  var result = "Places#";

  while (i < stockData.length)
  {
    result += stockData[i][0] + '#';
    i++;
  }
  console.log({message: 'Result=', initialData: result});
  return result;
}