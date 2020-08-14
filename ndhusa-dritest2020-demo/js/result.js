window.onload = bootFunc;

var numQues = 3;	//總題數
var sheetAPI = "https://script.google.com/macros/s/AKfycbyR0pznyC-Jcv00aLGMXg_wyPs_mGiCQIEvIlKAff7516n8D1g/exec";	// Sheet API
var correctAns = ["A", "A", "B"];	// 正解

var userAns = [];
var scoreCorrect, scoreWrong, scorePercentage;
var stdId, stdName, stdCollege, stdDept, stdIp;
var today = new Date();
var currentDate, currentTime, startTime;



function bootFunc() {
	urlTargetsDetect();
	scoreCalculate();
	detectCurrentDayAndTime();
	sendReport();
	document.getElementById("getScoreCorrect").innerHTML = scoreCorrect;
	document.getElementById("getScoreWrong").innerHTML = scoreWrong;
	document.getElementById("getScorePercentage").innerHTML = scorePercentage;
	document.getElementById("getTimeNow").innerHTML = currentDate + " " + currentTime;
	document.getElementById("getStdId").innerHTML = stdName + " 同學";
	document.getElementById("getStdId2").innerHTML = stdId;
	document.getElementById("WinnerStdId").innerHTML = stdId;
	document.getElementById("WinnerName").innerHTML = stdName;
	document.getElementById("WinnerDept").innerHTML = stdDept;
	document.getElementById("WinnerTime").innerHTML = currentDate + " " + currentTime;
	if(scoreCorrect == numQues){
		document.getElementById("getStatusTitle").innerHTML = "挑戰成功!!";
		document.getElementById("getStatusDescribe").innerHTML = "看完詳細說明後，記得滑到最下面，填資料參加抽獎喔~";
		document.getElementById("getPassbutton").innerHTML = '<button id="openFormButton" style="display:none" class="btn btn-google btn-block" data-target="#WinnerNotification" data-toggle="modal"><h2>參加抽獎 !!</h2></button>';
		document.getElementById("openFormButton").click();
	}
	else{
		document.getElementById("getStatusTitle").innerHTML = "挑戰失敗QQ";
		document.getElementById("getStatusDescribe").innerHTML = '別氣餒 !!<br>看完下面得的詳細說明後，<a href="start.html">再試一次吧</a> !!';
	}
}


// Score Calculation
function scoreCalculate() {
	scoreCorrect = 0;
	for (i=0; i<numQues; i++){
		if(userAns[i] == correctAns[i]){scoreCorrect++;}
	}
	scoreWrong = numQues - scoreCorrect;
	scorePercentage = Math.floor(scoreCorrect/numQues*100);
}

// Report Sender
function sendReport() {
	//let stdName = document.querySelector('#formNameValue').value;
	//let stdDept = document.querySelector('#formDeptValue').value;
  $.ajax({
    url: sheetAPI,
    data: {
		"date":	currentDate,
		"timeStart": startTime,
		"timeEnd":	 currentTime,
		"score":scoreCorrect,
		"stdid":stdId,
		"name":stdName,
		"college":stdCollege,
		"dept":	stdDept,
		"q1":	userAns[0],
        "q2":	userAns[1],
        "q3":	userAns[2],
    },
    success: function(response) {
      if(response == "Y"){
      }
	  else{
		alert("錯誤代碼 NDHU-005!\n請洽學生會粉專");
	  }
    }
  })
}

/*
// Winner Info Form
let sendButton = document.querySelector('#formSubmit');
function send() {
	//let stdName = document.querySelector('#formNameValue').value;
	//let stdDept = document.querySelector('#formDeptValue').value;
  $.ajax({
    url: sheetAPI,
    data: {
		"stdid": stdId,
		"date":	currentDate,
		"time":	currentTime,
		"ip":	stdIp,
		"score":scoreCorrect,
		"q1":	userAns[0],
        "q2":	userAns[1],
        "q3":	userAns[2],
    },
    success: function(response) {
      if(response == "Y"){
        alert("資料填寫成功!");
		document.getElementById("openFormClose").click();
      }
	  else{
		alert("儲存失敗!\n請洽學生會粉專");
	  }
    }
  })
}
sendButton.addEventListener('click', send);
*/

// URL Targets Detect
function urlTargetsDetect() {
	var url = location.href.replace(/#/g,"");
	if (url.indexOf("?") != -1) {
		var ary = url.split("?")[1].split("&");
		for (i = 0; i <ary.length; i++) {
			var nameTarget = ary[i].split("=")[0];
			var nameTargetValue = ary[i].split("=")[1];
			//if (nameTarget == "si") {stdId = nameTargetValue;}
			if (nameTarget == "si") {stdId = decodeURIComponent(nameTargetValue);}
			else if (nameTarget == "sn") {stdName = decodeURIComponent(nameTargetValue);}
			else if (nameTarget == "sc") {stdCollege = decodeURIComponent(nameTargetValue);}
			else if (nameTarget == "sd") {stdDept = decodeURIComponent(nameTargetValue);}
			else if (nameTarget == "ts") {startTime = decodeURIComponent(nameTargetValue);}
			else{
				for (j=0; j<numQues; j++){
					var nameQues = "q" + (j+1);
					if (nameTarget == nameQues) {
						userAns[j] = nameTargetValue;
						document.getElementById("getA"+String(j+1)).innerHTML = userAns[j];
					}
				}
			}
		}
	}
}

// Current Day and Time
function detectCurrentDayAndTime() {
	var months = "JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC".split(",");
	currentDate = months[today.getMonth()]+"-"+paddingLeft(today.getDate(),2)+"-"+ today.getFullYear();
	currentTime = paddingLeft(today.getHours(),2)+":"+paddingLeft(today.getMinutes(),2)+":"+paddingLeft(today.getSeconds(),2);
}

function paddingLeft(str,lenght){
	if(String(str).length >= lenght){return str;}
	else{return paddingLeft("0"+str,lenght);}
}