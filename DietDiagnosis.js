document.addEventListener("DOMContentLoaded", function () {
  $("#resulturl").hide();
  $("#resumebutton").hide();
  $("#resetPage").hide();
  $("#physicalActivity").hide();
  $(".electroBattery").hide();
  $(".bloodGlucoseTest").hide();
  $(".bloodPresure").hide();
  $(".liverFunctionTest").hide();
  $(".lipidBattery").hide();
  $(".uricAcid").hide();
  $(".eGFR").hide();

  $("input[type=radio][name=diabetes]").change(function () {
    let radioSeletion = $("input[name=diabetes]:checked").val();
    if (radioSeletion == "c") {
      $(".bloodGlucoseTest").show();
    } else {
      $(".bloodGlucoseTest").hide();
    }
  });
  $("input[type=radio][name=hypertention]").change(function () {
    let radioSeletion = $("input[name=hypertention]:checked").val();
    if (radioSeletion == "c") {
      $(".bloodPresure").show();
    } else {
      $(".bloodPresure").hide();
    }
  });
  $("input[type=radio][name=fattyLiver]").change(function () {
    let radioSeletion = $("input[name=fattyLiver]:checked").val();
    if (radioSeletion == "c") {
      $(".liverFunctionTest").show();
    } else {
      $(".liverFunctionTest").hide();
    }
  });
  $("input[type=radio][name=dislipidemia]").change(function () {
    let radioSeletion = $("input[name=dislipidemia]:checked").val();
    if (radioSeletion == "c") {
      $(".lipidBattery").show();
    } else {
      $(".lipidBattery").hide();
    }
  });
  $("input[type=radio][name=gout]").change(function () {
    let radioSeletion = $("input[name=gout]:checked").val();
    if (radioSeletion == "c") {
      $(".uricAcid").show();
    } else {
      $(".uricAcid").hide();
    }
  });
  $("input[type=radio][name=isDialysis]").change(function () {
    let radioSeletion = $("input[name=isDialysis]:checked").val();
    if (radioSeletion == "y" || radioSeletion == "n") {
      $(".electroBattery").show();
      $(".eGFR").show();
    } else {
      document.getElementById("glomerular").value = "";
      $(".electroBattery").hide();
      $(".eGFR").hide();
    }
  });
});
function diagKidneyFunction() {
  let glomerular = String($("#glomerular").val());
  if (glomerular <= 60 && glomerular > 0) {
    $(".electroBattery").show();
  } else {
    $(".electroBattery").hide();
  }
}

function ObesityJudgement() {
  $("#physicalActivity").show();
  $("#resumebutton").show();
  $("#resetPage").show();
  let height = $("#Height").val() / 100;
  let weight = $("#Weight").val();
  let age = $("#Age").val();
  Patient.sex = $("input[name=healthy_gender]:checked").val();
  if (Patient.sex == "male") {
    IdealBodyWeight = height * height * 22;
  } else if (Patient.sex == "female") {
    IdealBodyWeight = height * height * 21;
  }
  $("#LightActivity").empty();
  $("#ModerateActivity").empty();
  $("#SevereActivity").empty();
  $("#ObesityState").empty();
  PIBWCondition = PIBWObesity((weight / IdealBodyWeight) * 100, age);
  $("#ObesityState").append("??????: " + PIBWCondition);
  // console.log(WeightCondition);
  // console.log(BMI);
}

function Examination() {
  Patient.name = String($("#Name").val());
  Patient.height = String($("#Height").val());
  Patient.weight = String($("#Weight").val());
  Patient.age = String($("#Age").val());
  Patient.sex = $("input[name=healthy_gender]:checked").val();
  Patient.activityindex = String($("#ActivityIndex").val());
  Patient.diabetes = $("input[name=diabetes]:checked").val();
  Patient.isDialysis = $("input[name=isDialysis]:checked").val();
  Patient.hypertention = $("input[name=hypertention]:checked").val();
  Patient.fattyLiver = $("input[name=fattyLiver]:checked").val();
  Patient.dislipidemia = $("input[name=dislipidemia]:checked").val();
  Patient.gout = $("input[name=gout]:checked").val();
  Patient.SBP = String($("#SBP").val());
  Patient.DBP = String($("#DBP").val());
  Patient.glomerular = String($("#glomerular").val());
  Patient.FBS = String($("#FBS").val());
  Patient.PP2 = String($("#PP2").val());
  Patient.HbA1c = String($("#HbA1c").val());
  Patient.glucatedAlbumin = String($("#glucatedAlbumin").val());
  Patient.Potassium = String($("#Potassium").val());
  Patient.Sodium = String($("#Sodium").val());
  Patient.Phosphorous = String($("#Phosphorous").val());
  Patient.Chloride = String($("#Chloride").val());
  Patient.TG = String($("#TG").val());
  Patient.Tchol = String($("#TChol").val());
  Patient.LDL = String($("#LDL").val());
  Patient.HDL = String($("#HDL").val());
  Patient.AST = String($("#AST").val());
  Patient.ALT = String($("#ALT").val());
  Patient.ALP = String($("#ALP").val());
  Patient.GGT = String($("#GGT").val());
  Patient.totalBilirubin = String($("#totalBilirubin").val());
  Patient.uricAcid = String($("#uricAcid").val());
  // console.log(Patient);
  if (Patient.sex == "male") {
    IdealBodyWeight = (Patient.height * Patient.height * 22) / 10000;
  } else if (Patient.sex == "female") {
    IdealBodyWeight = (Patient.height * Patient.height * 21) / 10000;
  }
  $("#LightActivity").empty();
  $("#ModerateActivity").empty();
  $("#SevereActivity").empty();
  PCondition.PIBWCondition = PIBWObesity(
    (Patient.weight / IdealBodyWeight) * 100,
    Patient.age
  );
  Patient.IdealBodyWeight = IdealBodyWeight;
  [PCondition.BMI, PCondition.BMICondition, PCondition.BMIactivity] =
    BMIObesity(Patient.weight, Patient.height);
  PCondition.KidneyCondition = CKDgrade(Patient.glomerular);
  if (Patient.isDialysis == "y") PCondition.KidneyCondition = 99;
  PCondition.diabetesCondition = diabetesJudgement(
    Patient.diabetes,
    Patient.FBS,
    Patient.PP2,
    Patient.HbA1c,
    Patient.glucatedAlbumin
  );
  PCondition.BPCondition = HTNJudgement(
    Patient.hypertention,
    Patient.SBP,
    Patient.DBP
  );
  PCondition.ElectricCondition = ElectricBattery(
    Patient.Sodium,
    Patient.Potassium,
    Patient.Chloride,
    Patient.Phosphorous
  );
  PCondition.LipidCondition = LipidBattery(
    Patient.dislipidemia,
    Patient.TG,
    Patient.LDL,
    Patient.Tchol,
    Patient.HDL
  );
  PCondition.LiverCondition = LiverDiseaseDig(
    Patient.sex,
    Patient.age,
    Patient.fattyLiver,
    Patient.AST,
    Patient.ALT,
    Patient.ALP,
    Patient.GGT,
    Patient.totalBilirubin
  );
  PCondition.gout = diagGout(Patient.gout, Patient.uricAcid);
  // console.log(PCondition);
  // console.log(DietNutrient);
  const patientInfo = { ...Patient, ...PCondition };
  console.log(patientInfo);
  localStorage.setItem("patient-info", JSON.stringify(patientInfo));
  window.open("DietDiagnosisResult.html");
}

function PIBWObesity(PIBW, age) {
  let judge = "??????";
  if (age < 65) {
    if (PIBW >= 160) {
      judge = "????????????";
      $("#LightActivity").append("20");
      $("#ModerateActivity").append("25");
      $("#SevereActivity").append("30");
    } else if (PIBW >= 120) {
      judge = "??????";
      $("#LightActivity").append("20~25");
      $("#ModerateActivity").append("30");
      $("#SevereActivity").append("35");
    } else if (PIBW >= 109) {
      judge = "?????????";
      $("#LightActivity").append("20~25");
      $("#ModerateActivity").append("30");
      $("#SevereActivity").append("35");
    } else if (PIBW >= 90) {
      judge = "??????";
      $("#LightActivity").append("30");
      $("#ModerateActivity").append("35");
      $("#SevereActivity").append("40");
    } else if (PIBW < 90) {
      judge = "?????????";
      $("#LightActivity").append("35");
      $("#ModerateActivity").append("40");
      $("#SevereActivity").append("40");
    }
  } else if (age >= 65) {
    if (PIBW >= 160) {
      judge = "????????????";
      $("#LightActivity").append("20");
      $("#ModerateActivity").append("25");
      $("#SevereActivity").append("30");
    } else if (PIBW >= 120) {
      judge = "??????";
      $("#LightActivity").append("20");
      $("#ModerateActivity").append("25");
      $("#SevereActivity").append("30");
    } else if (PIBW >= 109) {
      judge = "?????????";
      $("#LightActivity").append("20");
      $("#ModerateActivity").append("25");
      $("#SevereActivity").append("30");
    } else if (PIBW >= 90) {
      judge = "??????";
      $("#LightActivity").append("20~25");
      $("#ModerateActivity").append("30");
      $("#SevereActivity").append("35");
    } else if (PIBW < 90) {
      judge = "?????????";
      $("#LightActivity").append("30");
      $("#ModerateActivity").append("35");
      $("#SevereActivity").append("40");
    }
  }
  return judge;
}
function BMIObesity(weight, height) {
  let BMI = 0;
  let judge = "??????";
  let activityindex = 28;
  BMI = weight / ((height * height) / 10000);
  if (BMI >= 35) {
    judge = "????????????";
    activityindex = 25;
  } else if (BMI >= 25) {
    judge = "??????";
    activityindex = 28;
  } else if (BMI >= 18.5) {
    judge = "??????";
    activityindex = 28;
  } else if (BMI < 18.5) {
    judge = "?????????";
    activityindex = 25;
  }
  return [BMI, judge, activityindex];
}
function CKDgrade(glomerular) {
  let judge = 0;
  if (glomerular == 0) judge = 0;
  else if (glomerular <= 15) judge = 5;
  else if (glomerular <= 30) judge = 4;
  else if (glomerular <= 45) judge = 3.5;
  else if (glomerular <= 60) judge = 3;
  else if (glomerular <= 90) judge = 2;
  else if (glomerular > 90) judge = 1;
  return judge;
}
function diabetesJudgement(Hxdiabetes, FBS, PP2, HbA1c, glucatedAlbumin) {
  // HbA1c ????????? 3??????, glucatedAlbumin ????????? 2~3???
  let judge = "??????";
  if (
    Hxdiabetes == "y" ||
    FBS >= 126 ||
    PP2 >= 200 ||
    HbA1c >= 6.5 ||
    glucatedAlbumin >= 16
  )
    judge = "??????";
  else if (
    (HbA1c < 6.5 && HbA1c >= 5.6) ||
    (FBS < 126 && FBS >= 100) ||
    (PP2 < 200 && PP2 >= 140)
  )
    judge = "?????? ?????????";
  else if ((FBS <= 70 && FBS > 0) || (PP2 <= 70 && PP2 > 0)) judge = "?????????";
  return judge;
}
function HTNJudgement(HxHTN, SBP, DBP) {
  // ????????????????????? ?????? 2018???
  let judge = "??????";
  if (HxHTN == "y") {
    judge = "?????????";
  } else {
    if ((SBP >= 90 && SBP < 120) || (DBP >= 60 && DBP < 80)) judge = "??????";
    else if (SBP == 0 || DBP == 0) judge = "??????";
    else if (SBP >= 120 && SBP < 130 && DBP < 80) judge = "????????????";
    else if ((SBP >= 130 && SBP < 140) || (DBP >= 80 && DBP < 90))
      judge = "??????????????????";
    else if ((SBP >= 140 && SBP < 160) || (DBP >= 90 && DBP < 100))
      judge = "????????? 1???";
    else if (SBP >= 160 || DBP >= 100) judge = "????????? 2???";
    else if (SBP < 90 && DBP < 60) judge = "?????????";
  }
  return judge;
}
function LipidBattery(HxHLP, TG, LDL, Tchol, HDL) {
  let judge = [];
  if (HxHLP == "y") {
    judge.push("????????????");
  } else {
    // LDL Cholesterol ?????? (Friedewald ??????)
    if (LDL == 0) {
      if (TG < 400) LDL = TG - (TG / 5 + HDL);
      else if (TG >= 400) judge.push("TG>400 !! LDL ?????? ?????? ??????");
    }
    let dummy = [];
    if (TG > 150) dummy.push("?????????????????????");
    else if ((TG <= 150 && TG > 30) || TG == 0) dummy.push("??????");
    else if (TG <= 30 && TG > 0) dummy.push("?????????????????????");
    if (Tchol > 200 || LDL > 130) dummy.push("????????????????????????");
    else if (
      (Tchol <= 200 && Tchol > 115 && LDL <= 130 && LDL > 50) ||
      (Tchol == 0 && LDL == 0)
    )
      dummy.push("??????");
    else if ((Tchol <= 115 && Tchol > 0) || (LDL <= 50 && LDL > 0))
      dummy.push("????????????????????????");
    if (dummy[0] == "??????" && dummy[1] == "??????") judge.push("??????");
    else {
      for (let i = 0; i < 2; i++) {
        if (dummy[i] != "??????") judge.push(dummy[i]);
      }
    }
  }
  return judge;
}
function ElectricBattery(Sodium, Potassium, Chloride, Phosphorous) {
  let judge = {
    Sodium: "??????",
    Potassium: "??????",
    Chloride: "??????",
    Phosphorous: "??????",
  };
  if (Sodium == 0 || (Sodium >= 135 && Sodium <= 145)) judge.Sodium = "??????";
  else if (Sodium < 135) judge.Sodium = "??????????????????";
  else if (Sodium > 145) judge.Sodium = "??????????????????";
  if (Potassium == 0 || (Potassium >= 3.5 && Potassium <= 5.5))
    judge.Potassium = "??????";
  else if (Potassium < 3.5) judge.Potassium = "???????????????";
  else if (Potassium > 5.5) judge.Potassium = "???????????????";
  if (Chloride == 0 || (Chloride >= 98 && Chloride <= 110))
    judge.Chloride = "??????";
  else if (Chloride < 98) judge.Chloride = "??????????????????";
  else if (Chloride > 110) judge.Chloride = "??????????????????";
  if (Phosphorous == 0 || (Phosphorous >= 3 && Phosphorous <= 5))
    judge.Phosphorous = "??????";
  else if (Phosphorous < 3) judge.Phosphorous = "???????????????";
  else if (Phosphorous > 5) judge.Phosphorous = "???????????????";
  return judge;
}
function LiverDiseaseDig(sex, age, HxFLD, AST, ALT, ALP, GGT, TBili) {
  let judge = [];
  if (HxFLD == "y") judge.push("?????????");
  else {
    if (sex == "female") {
      if (AST > 31 || ALT > 31) {
        if (AST < ALT) judge.push("???????????????");
        else if (AST >= ALT) judge.push("???????????????");
        if (GGT >= 42) {
          judge.push("??????");
          if (age >= 20 && ALP > 104) judge.push("?????? ??????");
        }
        judge.push("????????? ??????");
      } else if (ALP >= 312 && age >= 20 && GGT > 42 && TBili >= 1.2)
        judge.push("????????? ???????????? ??????");
      else if (ALP > 208 && ALP < 312 && age >= 20 && GGT < 42)
        judge.push("??????, ????????? ??????");
      else judge.push("??????");
    } else if (sex == "male") {
      if (AST > 37 || ALT > 41) {
        if (AST < ALT) judge.push("???????????????");
        else if (AST >= ALT) judge.push("???????????????");
        if (GGT >= 71) {
          judge.push("??????");
          if (age >= 20 && ALP > 129) judge.push("?????? ??????");
        }
        judge.push("????????? ??????");
      } else if (ALP >= 390 && age >= 20 && GGT > 71 && TBili >= 1.2)
        judge.push("????????? ???????????? ??????");
      else if (ALP > 260 && ALP < 390 && age >= 20 && GGT < 71)
        judge.push("????????? ??????");
      else judge.push("??????");
    }
  }
  return judge;
}
function diagGout(Hxgout, uricAcid) {
  let judge = "??????";
  if (Hxgout == "y") judge = "?????? ??????";
  else if (uricAcid > 7) judge = "?????? ??????";
  return judge;
}
