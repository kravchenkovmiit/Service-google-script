function sendRMA(list) {
  var rmaID ="#####";       //Google Spreadsheet ID
  var ssRMA = SpreadsheetApp.openById(rmaID);
  var result;

  //Date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  //Mail options
  var subject = list.place + ". RMA " + list.rma;
  var body = "\nЧерновик RMA во вложении.\n"+ 
  "Выбери подходящий лист (DCU или General), отредактируй, сохрани на общем диске и отправь копию #######";
  var name = "Service - RMA";

  fillInRMA(list, ssRMA);
  SpreadsheetApp.flush();

  console.log('RMA prepared');
  var urlRMA = "https://docs.google.com/spreadsheets/d/"+ rmaID +"/export"+ "?format=xlsx";
  var rmaAt = UrlFetchApp.fetch(urlRMA).getBlob();

  MailApp.sendEmail(list.email, subject, body, {
            name: name,
            attachments: [{
              fileName: list.rma + " RMA_" + list.place + "_" + list.surname.slice(0,-3) + ".xlsx",
                content: rmaAt.getBytes(),
                mimeType: "application/xlsx"
            }]
        });
  result = "\nRMA has been sent.";
  
  cleanRMA(ssRMA);
  console.log(result);
  return result;
  
}

function fillInRMA(list, ssRMA) {
  var trainData = checkCarRep(list.car);

  var ssRmaGen = ssRMA.getSheetByName("RMA - general");
  var ssRmaDcu = ssRMA.getSheetByName("RMA - DCU");

  /****  General ****/

  ssRmaGen.getRange("J11").setValue(list.date);
  ssRmaGen.getRange("E15").setValue(list.rma);
  ssRmaGen.getRange("E17").setValue(list.serialno.length > 0 ? list.serialno : list.partno);
  ssRmaGen.getRange("A19").setValue(list.partno);
  ssRmaGen.getRange("H19").setValue(list.car + (list.entr.length > 0 ? (", Entr." + list.entr) : ""));
  ssRmaGen.getRange("A21").setValue(list.description + ". " + list.comment + "\nDrive unit: " + list.driveno + " ; " + list.driveSno);
  if (trainData != 0) {
    ssRmaGen.getRange("H21").setValue(trainData.prjNo);
  }

  /****  DCU ****/

  ssRmaDcu.getRange("B1").setValue(list.serialno.length > 0 ? list.serialno : list.partno);
  ssRmaDcu.getRange("B3").setValue(list.partno);
  ssRmaDcu.getRange("F11").setValue(list.car + (list.entr.length > 0 ? (", Entr." + list.entr) : ""));
  ssRmaDcu.getRange("F12").setValue(list.date);
  ssRmaDcu.getRange("K2").setValue(list.date);
  ssRmaGen.getRange("B27").setValue(list.description + ". " + list.comment);
  if (trainData != 0) {
    ssRmaDcu.getRange("F10").setValue(trainData.trainNo);
  }

}

function cleanRMA(ssRMA) {
  var ssRmaGen = ssRMA.getSheetByName("RMA - general");
  var ssRmaDcu = ssRMA.getSheetByName("RMA - DCU");

  /****  General ****/

  ssRmaGen.getRange("J11").setValue("dd mm yyyy");
  ssRmaGen.getRange("E15").setValue("");
  ssRmaGen.getRange("E17").setValue("");
  ssRmaGen.getRange("A19").setValue("");
  ssRmaGen.getRange("H19").setValue("");
  ssRmaGen.getRange("A21").setValue("");
  ssRmaGen.getRange("H21").setValue("");

  /****  DCU ****/

  ssRmaDcu.getRange("B1").setValue("");
  ssRmaDcu.getRange("B3").setValue("");
  ssRmaDcu.getRange("F11").setValue("");
  ssRmaDcu.getRange("F12").setValue("");
  ssRmaDcu.getRange("K2").setValue("dd mm yyyy");
  ssRmaGen.getRange("B27").setValue("");
  ssRmaDcu.getRange("F10").setValue("");
}
