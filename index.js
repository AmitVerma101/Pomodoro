let sessionTime=0;
let changeHeading=document.getElementById("changeHeading");
let breakTime=0;
let id;
let decider=0,mm=0,ss=0;
let flag=false;
let getSessionTimeElement=document.getElementById("sessionTime");
let getBreakTimeElement=document.getElementById("breakTime");
let sessionIncButton=document.getElementById("sessionIncButton");
let sessionDecButton=document.getElementById("sessionDecButton");
let breakIncButton=document.getElementById("breakIncButton");
let breakDecButton=document.getElementById("breakDecButton");
//console.log(sessionDecButton,sessionIncButton,breakDecButton,breakIncButton)
sessionIncButton.addEventListener("click",IncSessionValue);
sessionDecButton.addEventListener("click",DecSessionValue);
breakIncButton.addEventListener("click",IncBreakValue);
breakDecButton.addEventListener("click",DecBreakValue);
let lowerSectionButton1=document.getElementById("LowerSectionButton1");
let lowerSectionButton2=document.getElementById("LowerSectionButton2");
let timer=document.getElementById("timer");

//setting up a load listener

window.addEventListener("load",function(){
    displaySessionTime();
    displayBreakTime();
    lowerSectionButton1.addEventListener("click",startTheTimer);
    lowerSectionButton2.addEventListener("click",ResetTheTimer)

})

//creating functions for incrementing and decrementing session and break values

function IncSessionValue(){
    sessionTime++;
    displaySessionTime();
}
function DecSessionValue(){
    if(sessionTime>0){
        sessionTime--;
    }
    displaySessionTime();
}
function IncBreakValue(){
    breakTime++;
    displayBreakTime();
}
function DecBreakValue(){
    if(breakTime>0){
        breakTime--;
    }
    displayBreakTime();
}

//creating functions to display the updated values of the sessionTime and breakTime

function displaySessionTime(){
    getSessionTimeElement.innerHTML=sessionTime+" min";
}

function displayBreakTime(){
    getBreakTimeElement.innerHTML=breakTime+" min";
}

//creating a function to start the timer
function startTheTimer(){
    
    sessionIncButton.disabled=true;
    sessionDecButton.disabled=true;
    breakIncButton.disabled=true;
    breakDecButton.disabled=true;
     if(decider%2==0){
        if(!flag){
            setTime(0);
        }
       
        setTimer();
        let ans=parseInt(decider/2);
        changeHeading.innerHTML="Session "+ans;
     }
     else {
        if(!flag){
            setTime(1);
        }
      
        setTimer();
        let ans=parseInt((decider-1)/2);
        changeHeading.innerHTML="Break "+ans;
     }
     flag=false;
     lowerSectionButton1.innerHTML="Pause";
     lowerSectionButton1.removeEventListener("click",startTheTimer);
   

      id=setInterval(function(){
        refreshTimer(id);
     },100);
     lowerSectionButton1.addEventListener("click",function(){
        pauseTheTimer(id);
 })
}


function refreshTimer(id){
        if(ss==0&&mm==0){
            decider++;
            clearInterval(id)
            startTheTimer();
            console.log("here")
        }
        else if(ss==0){
            mm--;
            ss=59;
            setTimer();

        }
        else{
            ss--;
            setTimer();
        }

}

function setTimer(val){
    if(val%2==0){
        if(mm<10&&ss<10)
        timer.innerHTML="0"+mm+".0"+ss;
        else if(mm<10&&ss>=10){
            timer.innerHTML="0"+mm+"."+ss;
        }
        else if(mm>=10&&ss<10){
            timer.innerHTML=mm+".0"+ss;
        }
        else {
            timer.innerHTML=mm+"."+ss;
        }
        
        
    }
    else {
        if(mm<10&&ss<10)
        timer.innerHTML="0"+mm+".0"+ss;
        else if(mm<10&&ss>=10){
            timer.innerHTML="0"+mm+"."+ss;
        }
        else if(mm>=10&&ss<10){
            timer.innerHTML=mm+".0"+ss;
        }
        else {
            timer.innerHTML=mm+"."+ss;
        }
    }
}


function setTime(val){
    if(val==0){
        mm=sessionTime;
        
    }
    else{
        mm=breakTime;
    }
    ss=0;
}

function pauseTheTimer(id){
       clearInterval(id)
       flag=true;
    //    sessionIncButton.disabled=false;
    //    sessionDecButton.disabled=false;
    //    breakIncButton.disabled=false;
    //    breakDecButton.disabled=false;
       lowerSectionButton1.removeEventListener("click",pauseTheTimer);
       lowerSectionButton1.addEventListener("click",startTheTimer);
       lowerSectionButton1.innerHTML="Start"
}
function ResetTheTimer(){
  // location.reload();
   mm=0;ss=0;decider=0;
   flag=0;
   sessionTime=0;
   breakTime=0;
   displaySessionTime();
   sessionIncButton.disabled=false;
   sessionDecButton.disabled=false;
   breakIncButton.disabled=false;
   breakDecButton.disabled=false;
   displayBreakTime();
   changeHeading.innerHTML="Pomodoro"
   clearInterval(id);
   timer.innerHTML="00.00"
   lowerSectionButton1.removeEventListener("click",pauseTheTimer);
   lowerSectionButton1.addEventListener("click",startTheTimer);
   lowerSectionButton1.innerHTML="Start"

}