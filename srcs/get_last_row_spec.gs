function getLastRowSpec(sheet, range) {
  var data = sheet.getRange(range).getValues();
  var rowNum = 0;

  while (rowNum < data.length) {
    if (data[rowNum] == "") {
      break;
    }
    rowNum++;
  }
  Logger.log(rowNum);
  return rowNum;
}