function getDepotFu(sheet) {
  var stockData = sheet.getDataRange().getDisplayValues();
  var i = 1;
  var result = "Depot#";

  while (i < stockData.length)
  {
    result += stockData[i][0] + '#';
    i++;
  }
  console.log({message: 'Result=', initialData: result});
  return result;
}