// 開始測驗
function startQuestions(){
	var losedInfoAlert = "";
	if (idform.formStdID.value.length!=9){
		losedInfoAlert += "- 學號\n";
	}
	if (idform.formStdID.value.length!=9){
		losedInfoAlert += "- 姓名\n";
	}
	if (idform.formDept.value=="系所"){
		losedInfoAlert += "- 系所\n";
	}
	if(losedInfoAlert!=""){
		alert("請正確填寫\n" + losedInfoAlert);
		return false;
	}
	detectCurrentDayAndTime();
    var stdId = document.getElementById("inputID").value;
	var nextUrl = "question/q1.html?si="+idform.formStdID.value + "&sn="+idform.formName.value + "&sc="+colleges[idform.formCollege.selectedIndex] + "&sd="+idform.formDept.value + "&ts="+currentTime;
	window.location.href = nextUrl;
}

// 系所雙層選單
var stdCollege, stdDept;
var colleges=['學院', '理工學院','管理學院', '人文社會科學學院', '花師教育學院', '原住民民族學院', '藝術學院', '環境學院', '海洋科學學院', '共同教育委員會'];
var collegeSelect=document.getElementById("college-list");
var inner="";
for(var i=0;i<colleges.length;i++){
	if(i==0){inner=inner+'<option value=i disabled selected hidden>'+colleges[i]+'</option>';}
	else{inner=inner+'<option value=i>'+colleges[i]+'</option>';}
}
collegeSelect.innerHTML=inner;
var sectors=new Array();
sectors[0]=['系所 - 請先選擇學院']
sectors[1]=['系所', '資訊工程學系','應用數學系','物理學系','生命科學系','化學系','材料科學與工程學系','電機工程學系','光電工程學系'];
sectors[2]=['系所', '企業管理學系','運籌管理研究所','國際企業學系','會計學系','資訊管理學系','財務金融學系','觀光暨休閒遊憩學系','管理學院管理科學與財金國際學士學位學程','管理學院高階經營管理碩士在職專班'];
sectors[3]=['系所', '諮商與臨床心理學系','華文文學系','中國語文學系','英美語文學系','臺灣文化學系','社會學系','公共行政學系','法律學系','法律學系原住民專班','歷史學系','經濟學系','人文社會科學學院華語文教學國際博士班','人文社會科學學院亞太區域研究博士班'];
sectors[4]=['系所', '教育與潛能開發學系','教育行政與管理學系','特殊教育學系','體育與運動科學系','幼兒教育學系'];
sectors[5]=['系所', '族群關係與文化學系','民族語言與傳播學系','民族事務與發展學系','民族社會工作學士學位學程','原住民族樂舞與藝術學士學位學程'];
sectors[6]=['系所', '音樂學系','藝術與設計學系','藝術創意產業學系'];
sectors[7]=['系所', '自然資源與環境學系', '人文與環境碩士學位學程'];
sectors[8]=['系所', '海洋生物研究所'];
sectors[9]=['系所', '大一不分系'];
function changeCollege(index){
	var Sinner="";
	for(var i=0;i<sectors[index].length;i++){
		if(i==0){Sinner=Sinner+'<option value='+sectors[index][i]+' disabled selected hidden>'+sectors[index][i]+'</option>';}
		else{Sinner=Sinner+'<option value='+sectors[index][i]+'>'+sectors[index][i]+'</option>';}
	}
	var sectorSelect=document.getElementById("sector-list");
	sectorSelect.innerHTML=Sinner;
}
changeCollege(document.getElementById("college-list").selectedIndex);

// Current Day and Time
var today = new Date();
var currentTime;
function detectCurrentDayAndTime() {
	currentTime = paddingLeft(today.getHours(),2)+":"+paddingLeft(today.getMinutes(),2)+":"+paddingLeft(today.getSeconds(),2);
}
function paddingLeft(str,lenght){
	if(String(str).length >= lenght){return str;}
	else{return paddingLeft("0"+str,lenght);}
}


/*
window.onload = checkIdStatus;
function checkIdStatus() {
	var url = location.href;
	var idExisted = false;
	if (url.indexOf("?") != -1) {
		var stdIdFilled = "";
		var ary = url.split("?")[1].split("&");
		for (i = 0; i <= ary.length - 1; i++) {
			if (ary[i].split("=")[0] == "formStdID") {
				idExisted = true;
				stdIdFilled = ary[i].split("=")[1];
			}
		}
	}
	if(idExisted == true){
		idform.formStdID.value = stdIdFilled;
		startQuestions();
	}
}
*/
