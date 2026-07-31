let selectedDate = null;
let selectedTime = null;


const webhook = "https://discord.com/api/webhooks/1532851903262621758/MXI8_5BZbGq5VWwx7_HDZRZEDNPPoLkvigqsDkvpc_W9Q_Nd0uqwNS3M0YzfnFFRydaZ";



function showScreen(id){

document.querySelectorAll(".screen")
.forEach(x=>x.classList.remove("active"));

document.getElementById(id)
.classList.add("active");

}



function yesGame(){

showScreen("hour");

}



function cantGame(){

showScreen("confirm");

}



function backMain(){

showScreen("main");

}



function chooseDate(){

showScreen("date");

generateCalendar();

}



function generateCalendar(){

let calendar=document.getElementById("calendar");

calendar.innerHTML="";


let today=new Date();


for(let i=0;i<30;i++){

let d=new Date();

d.setDate(today.getDate()+i);


let button=document.createElement("button");

button.className="day";

button.innerHTML=
d.getDate()+"."+(d.getMonth()+1);


button.onclick=()=>{

selectedDate=d.toLocaleDateString();

document.querySelectorAll(".day")
.forEach(x=>x.classList.remove("selected"));

button.classList.add("selected");

};


calendar.appendChild(button);


}


}



function chooseHour(){

if(!selectedDate){

selectedDate=new Date().toLocaleDateString();

}


showScreen("hour");


}




document.querySelectorAll(".time")
.forEach(btn=>{


btn.onclick=()=>{


document.querySelectorAll(".time")
.forEach(x=>x.classList.remove("selected"));


btn.classList.add("selected");


selectedTime=btn.innerHTML;


};


});




async function sendResult(){


if(!selectedTime){

selectedTime="16:00";

}



await fetch(webhook,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

embeds:[{

title:"Nowe ustalenie grania",

description:

"Gramy z Kanu\n\nData: **"+
(selectedDate || "dzisiaj")+
"**\nGodzina: **"+
selectedTime+
"**",

color:111111

}]

})

});



document.querySelector(".card").innerHTML=

"<h1>Potwierdzone</h1><p>"+
(selectedDate || "Dzisiaj")+
" o "+
selectedTime+
"</p>";



}