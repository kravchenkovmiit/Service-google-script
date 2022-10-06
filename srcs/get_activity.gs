function getActivityFu(sheet) {

  var data = sheet.getDataRange().getDisplayValues();
  var i = 0;
  var result = "Activity#";

  while (i < data.length)
  {
    result += data[i][0] + '#';
    i++;
  }
  console.log({message: 'Result=', initialData: result});
  return result;
}