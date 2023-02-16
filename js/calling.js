var phone_numbers=document.getElementsByClassName("number--key");
var phone_Numer_Input=document.getElementById("phone--number--input");
var phone_Number_InputDelete=document.getElementById("phone--number--input-delete")

for (let index = 0; index < phone_numbers.length; index++) {
    let element=phone_numbers[index];
  
    element.addEventListener("mousemove",MouseMoveOnKeyPad.bind(element));
    element.addEventListener("mouseleave",MouseMLeaveOnKeyPad.bind(element));
    element.addEventListener("click",MouseClickOnKeyPad.bind(element));
}
phone_Number_InputDelete.addEventListener("click",DeleteCallInput);


function MouseMoveOnKeyPad(obj){
this.classList.add("hoverd--key");
}
function MouseMLeaveOnKeyPad(obj){
    this.classList.remove("hoverd--key");
}
function MouseClickOnKeyPad(obj){
    this.classList.add("clicked--key");
    setTimeout(()=>{
        this.classList.remove("clicked--key");
    },500);
   AddCallInput(this.firstElementChild.textContent);
    
}

function AddCallInput(myChar){
    let LastText=phone_Numer_Input.value;
   
    if(LastText.length<11+4){
        if(LastText.length==4||LastText.length==7+2){
            let NodeText=document.createTextNode(LastText+"  "+myChar);
    
            phone_Numer_Input.value=NodeText.textContent;
        }
    else{
            let NodeText=document.createTextNode(LastText+myChar);
    
            phone_Numer_Input.value=NodeText.textContent;

        }

        CheckForContants(phone_Numer_Input.value.replaceAll(" ",""));
    }
    

}
function  DeleteCallInput(){
    let LastText=phone_Numer_Input.value;
   
    if(LastText.length>=0){
        
        
        let deletCount=1;
        if(LastText.length==11||LastText.length==7){
            deletCount=3;
        }else {
            deletCount=1;
        }
        let text=LastText;
        
        text=  text.substring(0,text.length-deletCount);
        let NodeText=document.createTextNode(text);
        phone_Numer_Input.value=NodeText.textContent;
        CheckForContants(phone_Numer_Input.value.replaceAll(" ",""));
    
    }
}

var contantsJson=JSON.parse(contacts);
var currentContact=null;
let newContactNumber="";
let lastContactNumber="";
// let lastContactDiv=null;
let lastContact=null;
function CheckForContants(numberPhone){
console.log(numberPhone);
let contactPattern=document.querySelector('[data-id="contact-info-obj"]');

let findedContact;

if(numberPhone.length>0){
    
    for (const contactItem of contantsJson) {
        console.log("contactItem.number :"+contactItem.number);
        if(contactItem.number.includes(numberPhone)&&lastContactNumber!=contactItem.number){
          if(lastContact!=null){
              let contactBedelet=lastContact;
              contactBedelet.classList.add("goAway");
             setTimeout(function (){
                 contactBedelet.remove();
             },500);
          }
          
            let newContactDiv=contactPattern.cloneNode(true) ;
            newContactDiv.style.display="flex";
            newContactDiv.removeAttribute("data-id");
            newContactDiv.addEventListener("click",Call.bind(null,contactItem.number));
           let htmlContact= newContactDiv.querySelector(".detail--number");
           htmlContact.textContent=contactItem.number;
            contactPattern.parentElement.prepend(newContactDiv);
            lastContactNumber=contactItem.number;
            lastContact=newContactDiv;
            console.log("Finded :"+lastContact);
            findedContact=true;
            break;
        }else if(contactItem.number.includes(numberPhone)&&lastContactNumber==contactItem.number){
            findedContact=true;
            console.log("Finded  in Old Contact: "+ lastContact);
           
            break;
        }
    }
    
    if(!findedContact&&lastContactNumber!=numberPhone){
        console.log("I Cant Find");
        if(lastContact!=null){
            let contactBedelet=lastContact;
            contactBedelet.classList.add("goAway");
            setTimeout(function (){
                contactBedelet.remove();
            },500);
        }
        lastContactNumber=null;
        
    }
}
else if(lastContact!=null&&lastContactNumber!=numberPhone) {
    let contactBedelet=lastContact;
    contactBedelet.classList.add("goAway");
    setTimeout(function (){
        contactBedelet.remove();
    },500);
  
}
    if(numberPhone.length==0){
       
        lastContact=null;
        lastContactNumber="";
       let allTabs= document.querySelectorAll(".tab-name");
        for (const Tab of allTabs) {
            Tab.style.display="block";
        }
    }
    else{
        let allTabs= document.querySelectorAll(".tab-name");
        for (const Tab of allTabs) {
            Tab.style.display="none";
        }
    }
}

let callBtn=document.getElementById("call-btn");
callBtn.addEventListener("click", Call);

function Call(number){
    console.log(number);
 
 if(number.length>1){
 
 }
 else {
  
     callBtn.classList.add("in-call");
     callBtn.removeEventListener("click",Call);
     callBtn.addEventListener("click", CallEnd);
    
     document.querySelector(".phone--glass-call").classList.add("in-call");
     document.querySelector(".sms-btn").classList.add("go");
     document.querySelector(".contact-btn").classList.add("go");
     
     let noCallingPad= document.querySelectorAll(".number--key");
     for (const button   of noCallingPad) {
         button.classList.add("disapre") ;
         button.style.display="none";
       
         
     }
    let callingPad= document.querySelectorAll(".number--icon");
     for (const button   of callingPad) {
         button.style.display="flex";
         setTimeout(function (){
             button.classList.remove("disapre")
             },700);
        
     }
     
     
     document.querySelector(".numbers--input").classList.add("incall");
     console.log("Calling");
 }
}
function CallEnd(){
    callBtn.classList.remove("in-call");
    callBtn.removeEventListener("click",CallEnd);
    callBtn.addEventListener("click", Call);
    document.querySelector(".phone--glass-call").classList.remove("in-call");
    document.querySelector(".sms-btn").classList.remove("go");
    document.querySelector(".contact-btn").classList.remove ("go");
    let noCallingPad= document.querySelectorAll(".number--key");
    for (const button   of noCallingPad) {
      
        button.classList.remove("disapre")
        setTimeout(function (){button.style.display="flex";},700);
    
    }
    let callingPad= document.querySelectorAll(".number--icon");
    for (const button   of callingPad) {
       
        button.classList.add("disapre") ;
        setTimeout(function (){button.style.display="none";},600);
    }
    document.querySelector(".numbers--input").classList.remove("incall");
    console.log("End Call");
}
