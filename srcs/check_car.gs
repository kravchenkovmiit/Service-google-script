function checkCarFu(ss, car) {
  var sheet = ss.getSheetByName("Trains");

  if (car.length < 1) {
    return "#Wrong car number!#";
  }

  var trainData = sheet.getDataRange().getDisplayValues();

  //Finding car position on sheet
  var i = 1;
  Logger.log('length = ' + trainData.length);
  while (i < trainData.length)
  {
    var j = 3;
    while (j < 11)
    {
      if (trainData[i][j] == car)
      {
        Logger.log('Car catched! i = ' + i);
        return finMess(trainData[i], car, ss);
      }
      j++;
    }
    i++;
  }
  Logger.log('Checked to the end!');
  return "Нет такого вагона!";
}

function finMess(tRow, car, ss) {
  var expDate;
  var trainNo = tRow[0];
  var prj = tRow[2];
  var depot = tRow[14];
  var comment = tRow[15];
  var result;

  Logger.log(trainNo);

  if ((tRow[13]).length < 1) {
      expDate = 'Дата ввода не известна!';
  }
  else {
    //expDate = Utilities.formatDate(tRow[13], "GMT", "dd/MM/yyyy");
    expDate = tRow[13];

  }
  result = "Success#" + car + '#' + ((prj.length>0) ? (prj + '#'):'') + depot + '#' + trainNo + ' - ' + comment + '#' + 'Окончание гарантии: ' + expDate;


  Logger.log(result);
  return result + '##Последние записи:#' + lastRecords(car, ss);
}

function lastRecords(car, ss) {
  var sheet = ss.getSheetByName("Main");
  var lRow = getLastRowSpec(sheet, "A1:A");
  var mainData = sheet.getRange(2, 1, lRow, 12).getValues();

  Logger.log("lRow = " + lRow);
  
  var result = "";
  var newData = "";
  var prevData = "";
  var i = 0;
  var x = -1;

  while (++x < lRow && i < 11) {
    if (mainData[x][8] == car) {
      /*/ Format:
      dd/MM/yyyy  [0]
      Depot       [4]
      проем #     [9]
      Описание    [10]
      Комментарий [11]
      /*/
      newData = Utilities.formatDate(mainData[x][0], "GMT+3", "dd/MM/yyyy") + '#' +
      mainData[x][4] + '#' +
      ((mainData[x][9] > 0) ? ('Проем ' + mainData[x][9] + '#'): '') +
      mainData[x][10] +
      ((mainData[x][11].length > 0) ? ('#' + mainData[x][11]): '') +
       '##';
      if (newData != prevData) {
        result += newData;
      }
      prevData = newData;
    }
  }

  if (result.length < 1) {
    result = "отсутствуют";
  }

  Logger.log(result);
  return result;
}