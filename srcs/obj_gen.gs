function reqGeneration(e) {
  var request = {
    addData:      e.parameter.addDataP === undefined ? 0: e.parameter.addDataP,
    checkCar:     e.parameter.checkCarP === undefined ? 0: e.parameter.checkCarP,
    getPlaces:    e.parameter.getPlacesP === undefined ? 0: e.parameter.getPlacesP,
    getSurname:   e.parameter.getSurnameP === undefined ? 0: e.parameter.getSurnameP,
    getActivity:  e.parameter.getActivityP === undefined ? 0: e.parameter.getActivityP,
    addTrain:     e.parameter.addTrainP === undefined ? 0: e.parameter.addTrainP,
    getManufact:  e.parameter.getManP === undefined ? 0: e.parameter.getManP,
    getPrj:       e.parameter.getPrjP === undefined ? 0: e.parameter.getPrjP,
    getDepot:     e.parameter.getDepotP === undefined ? 0: e.parameter.getDepotP,
    report:       e.parameter.reportP === undefined ? 0: e.parameter.reportP
  };

  Logger.log('request: ' + request);
  return request;
  
}

function paramGeneration (e) {
  var ssInfoID = "#########";       //Google Spreadsheet ID
  var ssInfo = SpreadsheetApp.openById(ssInfoID);
  var repMax = ssInfo.getSheetByName("Reports").getRange(1, 7).getValue() + 1;

  //Date
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + mm + yyyy;

  var list = {
    date:         e.parameter.dateP === undefined ? "": e.parameter.dateP,
    surname:      e.parameter.surnameP === undefined ? "": e.parameter.surnameP,
    place:        e.parameter.placeP === undefined ? "": e.parameter.placeP,
    complaint:    e.parameter.complaintP === undefined ? "": e.parameter.complaintP,
    inOperation:  e.parameter.inOperationP === undefined ? 0: e.parameter.inOperationP,
    car:          e.parameter.carP === undefined ? "": e.parameter.carP,
    entr:         e.parameter.entrP === undefined ? "": e.parameter.entrP,
    activity:     e.parameter.activityP === undefined ? "": e.parameter.activityP,
    description:  e.parameter.descriptionP === undefined ? "": e.parameter.descriptionP,
    comment:      e.parameter.commentP === undefined ? "": e.parameter.commentP,
        //Part
    partno:       e.parameter.partnoP === undefined ? "": e.parameter.partnoP,
    serialno:     e.parameter.serialnoP === undefined ? "": e.parameter.serialnoP,
        //Drive
    driveno:      e.parameter.drivenoP === undefined ? "": e.parameter.drivenoP,
    driveSno:     e.parameter.driveSnoP === undefined ? "": e.parameter.driveSnoP,
        //Time
    travelTime:   e.parameter.travelTimeP === undefined ? "0:00:00": e.parameter.travelTimeP,
    arrTime:      e.parameter.arrTimeP === undefined ? "0:00:00": e.parameter.arrTimeP,
    workTime:     e.parameter.workTimeP === undefined ? "0:00:00": e.parameter.workTimeP,
    admTime:      e.parameter.admTimeP === undefined ? "0:00:00": e.parameter.admTimeP,
        //Warranty
    war:          e.parameter.warP === undefined ? "": e.parameter.warP,
    swVer:        e.parameter.swVerP === undefined ? "": String(e.parameter.swVerP),
        //Train info
    train:        e.parameter.trainP === undefined ? "": e.parameter.trainP,
    prjNo:        e.parameter.prjNoP === undefined ? "": e.parameter.prjNoP,
    prj:          e.parameter.prjP === undefined ? "": e.parameter.prjP,
    car1:         e.parameter.car1P === undefined ? "": e.parameter.car1P,
    car2:         e.parameter.car2P === undefined ? "": e.parameter.car2P,
    car3:         e.parameter.car3P === undefined ? "": e.parameter.car3P,
    car4:         e.parameter.car4P === undefined ? "": e.parameter.car4P,
    car5:         e.parameter.car5P === undefined ? "": e.parameter.car5P,
    car6:         e.parameter.car6P === undefined ? "": e.parameter.car6P,
    car7:         e.parameter.car7P === undefined ? "": e.parameter.car7P,
    car8:         e.parameter.car8P === undefined ? "": e.parameter.car8P,
    manufact:     e.parameter.manP === undefined ? "": e.parameter.manP,
    depot:        e.parameter.depotP === undefined ? "": e.parameter.depotP,
    report:       e.parameter.reportP != 1 ? "": repMax,
    rma:          e.parameter.rmaP != 1 ? "": ("7/" + today + "-x"),
    email:        e.parameter.emailP === undefined ? "": e.parameter.emailP
  };

  Logger.log('list: ' + list);
  return list;
}