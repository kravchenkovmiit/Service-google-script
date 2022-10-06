function getSurnameFu(sheet) {

  var stockData = sheet.getDataRange().getDisplayValues();
  var i = 0;
  var result = "Surname#";

  while (i < stockData.length)
  {
    result += stockData[i][0] + '#';
    i++;
  }
  console.log({message: 'Result=', initialData: result});
  return result;
}