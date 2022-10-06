async function checkDataFu(ss, lRow) {
  var ssMain = ss.getSheetByName("Main");
  var ssLRMain = ssMain.getRange(lRow, 1, 1, 22);
  var ssLRMainData = ssLRMain.getValues();
  Logger.log(ssLRMainData);
  var i = 1;
  var j = 3;

  var car = ssLRMainData[0][8];
  var activity = ssLRMainData[0][21];
  var inOperation = ssLRMainData[0][6];
  car = car.toString();
  var train = "";
  var prjNo = "";
  var prjName = "";
  var qNAdd = "";
  var sOrder = "";

  Logger.log("car - " + car + "; activity - " + activity + "; inOp - " + inOperation);

  //Add Train info
  if (car.length > 0) {
    var trainsData = ss.getSheetByName("Trains").getDataRange().getDisplayValues();

    while (i < trainsData.length) {
      j = 3;
      while (j < 11) {
        if (trainsData[i][j] === car){
          //Train
          train = trainsData[i][0];
          //Project no.
          prjNo = trainsData[i][1];
          //Project no.
          prjName = trainsData[i][2];
          inOperation = trainsData[i][12].length > 0 ? 1 : inOperation;
          
          Logger.log("Train is " + train);
          break;
        }
        j++;
      }
      i++;
    }
  }

  Logger.log("prjNo - " + prjNo);

  //Add Q-no info
  if (prjNo.length > 0) {
    if (prjNo == "07504O1E" || prjNo == "0750B11A") {
      qNAdd = "600678483";
    } else if (prjNo == "0750B51A") {
      qNAdd = "600673684";
    } else if (prjNo == "07508C1B") {
      qNAdd = "600678488";
    }
  }

  //Add Service order info
  if (activity == "Modernization" || activity == "Commissioning" || activity == "SW installation" || activity == "Fleet check") {
    //complet = 1;
    if (prjNo == "07504O1E" || prjNo == "0750B11A") {
      sOrder = "81006229";
    } else if (prjNo == "0750B51A") {
      sOrder = "81006224";
    } else if (prjNo == "07508C1B") {
      sOrder = "81006232";
    } else if (prjNo == "0750BZ1A") {
      sOrder = "81006722";
    }
  } else {
    if (prjNo == "07504O1E" || prjNo == "0750B11A") {
      if (inOperation == 1) {
        sOrder = "81006227";
      } else { sOrder = "81006228";}
    } else if (prjNo == "0750B51A") {
      if (inOperation == 1) {
        sOrder = "81006226";
      } else { sOrder = "81006225";}
    } else if (prjNo == "07508C1B") {
      if (inOperation == 1) {
        sOrder = "81006230";
      } else { sOrder = "81006231";}
    }
  }

  Logger.log("prjNo - " + prjNo + "; prjName - " + prjName + "; qNAdd - " + qNAdd + "; sOrder - " + sOrder);
  ssMain.getRange(lRow, 3, 1, 2).setValues([[prjNo, prjName]]);
  ssMain.getRange(lRow, 7, 1, 2).setValues([[inOperation, train]]);
  ssMain.getRange(lRow, 13, 1, 2).setValues([[qNAdd,sOrder]]);

  //Sort data
  ssMain.getFilter().sort(1, false);
  ss.getSheetByName("Places").sort(2, false);
  
  Logger.log("Nothing found!");
  return 1;
}