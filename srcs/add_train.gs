function addTrainFu(ss, list) {
  console.log({message: 'add train', initialData: list.train + ' ' + list.date});

  var lRow = getLastRowSpec(ss.getSheetByName("Trains"), "D1:D") + 1;
  var sheetTrains = ss.getSheetByName("Trains");

  sheetTrains.getRange(lRow, 1, 1, 17).setValues([[list.train, list.prjNo, list.prj, list.car1, list.car2, 
  list.car3, list.car4, list.car5, list.car6, list.car7, list.car8, list.manufact, 
  list.date, , list.depot, list.description, list.comment]]);

  sheetTrains.getRange(lRow, 14).setFormula('=IF($M' + lRow + '>(TODAY() - 3000),$M' + lRow + '+365*2,"")');

  return "Success";
}