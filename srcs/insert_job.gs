function insertJob(ss, list, lRow) {
    console.log({message: 'add data', initialData: list.surname + ' ' + list.date + ' ' + list.place + ' ' + list.car});

    var sheetMain = ss.getSheetByName("Main");

    sheetMain.getRange(lRow, 1, 1, 29).setValues([[list.date, list.surname, , , list.place, list.complaint, 
      list.inOperation, , list.car, list.entr, list.description, list.comment, , , list.rma, ,
      (list.activity == "Modernization" || list.activity == "Commissioning" || list.activity == "SW installation" || list.activity == "Fleet check") ? true : false,
       list.partno, list.serialno, list.driveno, list.driveSno, list.activity, list.travelTime, list.arrTime, 
       list.workTime, list.admTime, , list.war, list.report]]);

    sheetMain.getRange(lRow, 27).setFormula('=IF(SUM(W' + lRow + ':Z' + lRow + ') > 0, SUM(W' + lRow + ':Z' + lRow + '), "")');

    return "Success";
}