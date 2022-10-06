sheetId = "#######"; // Insert your Google sheet ID

function doGet(e){
  var ss = SpreadsheetApp.openById(sheetId);
  return insert(e,ss);
}

function doPost(e){
  var ss = SpreadsheetApp.openById(sheetId);
  return insert(e,ss);
}

function insert(e,ss) {

  var request = reqGeneration(e);
  var list = paramGeneration(e);

  var result = "Error";

  //SW version verification

  if (list.swVer == String(ss.getSheetByName("AppVersion").getRange(1, 1).getValue())) {
    if (request.addData == 1) {
      var lRow = getLastRowSpec(ss.getSheetByName("Main"), "A1:A") + 1;
      result = insertJob(ss, list, lRow);
      if (request.report == 1) {
        result += sendReportDraft(list);
      }
      if (list.rma.length > 1) {
        result += sendRMA(list);
      }
      checkDataFu(ss, lRow);
    } else if (request.getPlaces == 1) {
      result = getPlacesFu(ss.getSheetByName("Places"));
    } else if (request.getSurname == 1) {
      result = getSurnameFu(ss.getSheetByName("Surname"));
    } else if (request.checkCar == 1) {
      result = checkCarFu(ss, list.car);
    } else if (request.getActivity == 1) {
      result = getActivityFu(ss.getSheetByName("Activites"));
    } else if (request.getPrj == 1) {
      result = getPrjFu(ss.getSheetByName("Projects"));
    } else if (request.getManufact == 1) {
      result = getManFu(ss.getSheetByName("Manufact."));
    } else if (request.getDepot == 1) {
      result = getDepotFu(ss.getSheetByName("Depot"));
    } 
    else if (request.addTrain == 1) {
      result = addTrainFu(ss, list);
    } else {result = "Nothing to do ...";}
  } else {
    result += ": Please update SW. You use old version.";
  }

  console.log(result);
  
  return ContentService
      .createTextOutput(result)
      .setMimeType(ContentService.MimeType.JAVASCRIPT); 
}
