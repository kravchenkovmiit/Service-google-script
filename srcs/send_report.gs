function sendReportDraft(list) {
  var ssEngID = "#####";     //Google Spreadsheet ID
  var ssRusID = '#####';     //Google Spreadsheet ID
  var ssShortID = '#####';   //Google Spreadsheet ID
  
  var ssEng = SpreadsheetApp.openById(ssEngID);
  var ssRus = SpreadsheetApp.openById(ssRusID);
  var ssShort = SpreadsheetApp.openById(ssShortID);
  var result;

  console.log(list.report);

  //Mail options
  var subject = "Report " + list.report + ". " + list.place;
  var body = "\nЧерновики отчетов во вложении.\n"+ 
  "Выбери подходящий, отредактируй и сохрани на общем диске.";
  var name = "Service reports";

  //Date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + mm + yyyy;

  fillInReports(list, ssEng, ssRus, ssShort);
  SpreadsheetApp.flush();

  console.log('Attachments prepared');

  var urlEng = "https://docs.google.com/spreadsheets/d/"+ssEngID+"/export"+ "?format=xlsx";
  var engR = UrlFetchApp.fetch(urlEng).getBlob();

  var urlRus = "https://docs.google.com/spreadsheets/d/"+ssRusID+"/export"+ "?format=xlsx";
  var rusR = UrlFetchApp.fetch(urlRus).getBlob();

  var urlShort = "https://docs.google.com/spreadsheets/d/"+ssShortID+"/export"+ "?format=xlsx";
  var shortR = UrlFetchApp.fetch(urlShort).getBlob();

  MailApp.sendEmail(list.email, subject, body, {
            name: name,
            attachments: [{
              fileName: list.report + ". ENG_Report_" + today + "_" + list.surname.slice(0,-3) + ". " + list.place + ".xlsx",
                content: engR.getBytes(),
                mimeType: "application/xlsx"
            } , {
              fileName: list.report + ". RUS_Report_" + today + "_" + list.surname.slice(0,-3) + ". " + list.place + ".xlsx",
                content: rusR.getBytes(),
                mimeType: "application/xlsx"
            } , {
              fileName: list.report + ". Short_Report_" + today + "_" + list.surname.slice(0,-3) + ". " + list.place + ".xlsx",
                content: shortR.getBytes(),
                mimeType: "application/xlsx"
            }]
        });
  result = "\nReport has been sent.";
  cleanReports(ssEng, ssRus, ssShort);
  console.log(result);
  return result;
}

function fillInReports(list, ssEng, ssRus, ssShort) {

  var trainData = checkCarRep(list.car);

  /****  ENG Report ****/

  var ssEngR = ssEng.getSheetByName("Report");
  if (list.place == "MMM" || list.place == "ZZZ") {
    ssEngR.getRange("B26").setValue("1.1 Train is at the " + list.place + "site. Door systems are assambled and adjusted.");
  } else {
    ssEngR.getRange("B26").setValue("1.1 Train is in service.");
  }

  /* Header */
  if (trainData != 0) {
    ssEngR.getRange("C7").setValue(trainData.prjNo);
    ssEngR.getRange("F7").setValue(trainData.customer);
  }
  ssEngR.getRange("F9").setValue(list.date);
  ssEngR.getRange("C11").setValue(list.surname);
  ssEngR.getRange("G13").setValue(list.car);
  ssEngR.getRange("G14").setValue(list.entr);
  ssEngR.getRange("F16").setValue(list.serialno.length > 0 ? list.serialno : list.partno);
  ssEngR.getRange("F17").setValue(list.driveSno.length > 0 ? list.driveSno : list.driveno);
  ssEngR.getRange("C18").setValue(list.surname);
  ssEngR.getRange("C19").setValue(list.date);
  ssEngR.getRange("F18").setValue(list.place);

  /* Main part */
  ssEngR.getRange("B29").setValue("2.1 Faulty part " + list.partno + " was found during inspection.");
  ssEngR.getRange("B30").setValue("2.2 " + list.description);
  ssEngR.getRange("B33").setValue("3.1 " + list.comment);
  ssEngR.getRange("B40").setValue(list.surname);

  /****  RUS Report ****/

  var ssRusR = ssRus.getSheetByName("Report");
  if (list.place == "MMM" || list.place == "ZZZ") {
    ssRusR.getRange("B26").setValue("1.1 Состав находится на территории " + list.place + ". Дверные системы установлены и отрегулированы.");
  } else {
    ssRusR.getRange("B26").setValue("1.1 Состав эксплуатируется по перевозке пассажиров.");
  }

  /* Header */
  if (trainData != 0) {
    ssRusR.getRange("C7").setValue(trainData.prjNo);
    ssRusR.getRange("F7").setValue(trainData.customer);
  }
  ssRusR.getRange("F9").setValue(list.date);
  ssRusR.getRange("C11").setValue(list.surname);
  ssRusR.getRange("G13").setValue(list.car);
  ssRusR.getRange("G14").setValue(list.entr);
  ssRusR.getRange("F16").setValue(list.serialno.length > 0 ? list.serialno : list.partno);
  ssRusR.getRange("F17").setValue(list.driveSno.length > 0 ? list.driveSno : list.driveno);
  ssRusR.getRange("C18").setValue(list.surname);
  ssRusR.getRange("C19").setValue(list.date);
  ssRusR.getRange("F18").setValue(list.place);

  /* Main part */
  ssRusR.getRange("B29").setValue("2.1 В ходе осмотра выевлен неисправный узел " + list.partno + ".");
  ssRusR.getRange("B30").setValue("2.2 " + list.description);
  ssRusR.getRange("B33").setValue("3.1 " + list.comment);
  ssRusR.getRange("B39").setValue(list.surname);



  /****  SHORT Report ****/

  var ssShortR = ssShort.getSheetByName("Report");

  /* Header */
  if (trainData != 0) {
    ssShortR.getRange("B6").setValue(trainData.prjNo);
    ssShortR.getRange("B7").setValue(trainData.trainNo);
    ssShortR.getRange("H6").setValue(trainData.customer);
  }
  ssShortR.getRange("D6").setValue(list.place);
  ssShortR.getRange("D7").setValue(list.car + (list.entr.length > 0 ? (", Entr." + list.entr) : ""));
  ssShortR.getRange("C8").setValue(list.partno);
  ssShortR.getRange("C12").setValue(list.serialno.length > 0 ? list.serialno : list.partno);
  ssShortR.getRange("H8").setValue(list.rma);
  ssShortR.getRange("H9").setValue(list.date);
  ssShortR.getRange("J9").setValue(list.place);

  /* Main part */
  ssShortR.getRange("H18").setValue("Drive unit: " + list.driveno + " ; " + list.driveSno);
  ssShortR.getRange("H17").setValue(list.description);
  ssShortR.getRange("D19").setValue(list.comment);
  ssShortR.getRange("B29").setValue(list.surname);
}

function cleanReports(ssEng, ssRus, ssShort) {
   /****  ENG Report ****/

  var ssEngR = ssEng.getSheetByName("Report");
  ssEngR.getRange("B26").setValue("");

  /* Header */
  ssEngR.getRange("C7").setValue("");
  ssEngR.getRange("F7").setValue("");
  ssEngR.getRange("F9").setValue("");
  ssEngR.getRange("C11").setValue("");
  ssEngR.getRange("G13").setValue("");
  ssEngR.getRange("G14").setValue("");
  ssEngR.getRange("F16").setValue("");
  ssEngR.getRange("F17").setValue("");
  ssEngR.getRange("C18").setValue("");
  ssEngR.getRange("C19").setValue("");
  ssEngR.getRange("F18").setValue("");

  /* Main part */
  ssEngR.getRange("B29").setValue("");
  ssEngR.getRange("B30").setValue("");
  ssEngR.getRange("B33").setValue("");
  ssEngR.getRange("B40").setValue("");

  /****  RUS Report ****/

  var ssRusR = ssRus.getSheetByName("Report");
  ssRusR.getRange("B26").setValue("");

  /* Header */
  ssRusR.getRange("C7").setValue("");
  ssRusR.getRange("F7").setValue("");
  ssRusR.getRange("F9").setValue("");
  ssRusR.getRange("C11").setValue("");
  ssRusR.getRange("G13").setValue("");
  ssRusR.getRange("G14").setValue("");
  ssRusR.getRange("F16").setValue("");
  ssRusR.getRange("F17").setValue("");
  ssRusR.getRange("C18").setValue("");
  ssRusR.getRange("C19").setValue("");
  ssRusR.getRange("F18").setValue("");

  /* Main part */
  ssRusR.getRange("B29").setValue("");
  ssRusR.getRange("B30").setValue("");
  ssRusR.getRange("B33").setValue("");
  ssRusR.getRange("B39").setValue("");

  /****  SHORT Report ****/

  var ssShortR = ssShort.getSheetByName("Report");

  /* Header */
  ssShortR.getRange("B6").setValue("");
  ssShortR.getRange("B7").setValue("");
  ssShortR.getRange("H6").setValue("");
  ssShortR.getRange("D6").setValue("");
  ssShortR.getRange("D7").setValue("");
  ssShortR.getRange("C8").setValue("");
  ssShortR.getRange("C12").setValue("");
  ssShortR.getRange("H8").setValue("");
  ssShortR.getRange("H9").setValue("");
  ssShortR.getRange("J9").setValue("");

  /* Main part */
  ssShortR.getRange("H18").setValue("");
  ssShortR.getRange("H17").setValue("");
  ssShortR.getRange("D19").setValue("");
  ssShortR.getRange("B29").setValue("");
}

function checkCarRep (car) {
  var trainSID = "######"; //Google Spreadsheet ID
  var ss = SpreadsheetApp.openById(trainSID);
  var sheet = ss.getSheetByName("Trains");

  var trainData = sheet.getDataRange().getDisplayValues();

  //Finding car position on sheet
  var i = 1;

  console.log('length = ' + trainData.length);

  while (i < trainData.length)
  {
    var j = 3;
    while (j < 11)
    {
      if (trainData[i][j] == car)
      {
        Logger.log('Car catched! i = ' + i);
        return getCarInfo(trainData[i]);
      }
      j++;
    }
    i++;
  }
  Logger.log('Checked to the end!');
  return 0;
}

function getCarInfo (tRow) {
  var trainData = {
    expDate:      tRow[13].length < 1 ? 0: 1,
    trainNo:      tRow[0],
    prjNo:        tRow[1],
    prjName:      tRow[2],
    customer:     tRow[11]
    }

  Logger.log(trainData);
  return trainData;
}