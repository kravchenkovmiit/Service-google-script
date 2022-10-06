function getPrjFu(sheet) {
  var stockData = sheet.getDataRange().getDisplayValues();
  var i = 1;
  var result = "Projects#";

  while (i < stockData.length)
  {
    result += stockData[i][0] + " " + stockData[i][1] + '#';
    i++;
  }
  console.log({message: 'Result=', initialData: result});
  return result;
}