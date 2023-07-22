let BookmarkName = document.getElementById("BookmarkName");
let SiteURL = document.getElementById("SiteURL");
let submit = document.getElementById("submit");
let tbody = document.getElementById("tbody");
let deleteAll = document.getElementById("deleteAll");
let form =document.getElementById("form")
let warnning =document.getElementById("overlay-container")
let buttonOverlay=document.getElementById("button-overlay")
let iconClose =document.getElementById("icon-close")


let regexURL= /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}$)/i
let regeName=/^\w{3,12}$/
    

function validationURL(){
   return regexURL.test(SiteURL.value)
}
function validationName(){
    return regeName.test(BookmarkName.value)
 }

function checkvalidationName(){
    if( validationName() ===true){
        BookmarkName.style.border=" 2px solid green"
        document.getElementById("correct").style.display="block"
        document.getElementById("wrong").style.display="none"

    }else{
        BookmarkName.style.border="  2px solid #fec260"
        document.getElementById("wrong").style.display="block"
        document.getElementById("correct").style.display="none"

    }
}
function checkvalidationURL(){
    if( validationURL() ===true){
        SiteURL.style.border=" 2px solid green"
        document.getElementById("correct2").style.display="block"
        document.getElementById("wrong2").style.display="none"
    }else{
        SiteURL.style.border="  2px solid #fec260"
       document.getElementById("wrong2").style.display="block"
        document.getElementById("correct2").style.display="none"
    }
}


let data
if (localStorage.website != null) {
    data = JSON.parse(localStorage.website)
} else {
    data = [];
}

// ******************************************************************************

function SaveData() {
    if(BookmarkName.value !="" && SiteURL.value !="" && validationURL()===true &&validationName() ===true){
        let website = {
        name: BookmarkName.value,
        url: SiteURL.value,
    }
    if(!website.url.startsWith("https://")){
        website.url ="https://" + website.url
    }
    
    data.push(website)
    showData()
    clearDataAfterSubmit()
    saveDatainLocalStorage()
    BookmarkName.style.border="none"; 

    BookmarkName.addEventListener("focus", function() {
        BookmarkName.style.border="2px solid #fec260"
       

     });
    SiteURL.style.border="none"; 

    SiteURL.addEventListener("focus", function() {
        SiteURL.style.border="2px solid #fec260"
     });
    
     document.getElementById("wrong").style.display="none"
     document.getElementById("correct").style.display="none"
     document.getElementById("wrong2").style.display="none"
     document.getElementById("correct2").style.display="none"
    }else{
    warnning.classList.remove("d-none")

    
    }
}
//**************************************************** */
buttonOverlay.addEventListener("click",function(){
    warnning.classList.add("d-none")
})

iconClose.addEventListener("click",()=>{
    warnning.classList.add("d-none")
})

console.log(iconClose)
// ******************************************************************************
function showData() {
    let trs = ""
    for (let i = 0; i < data.length; i++) {
        trs += `
    <tr>
    <td>${i}</td>
    <td>${data[i].name}</td>
    <td><button onclick="visitWebsite('${data[i].url}')" class="btn btn-visit rounded-pill"><i class="fa-solid fa-eye"></i> Visit</button></td>
    <td><button onclick="deleteWevSite(${i})" class="btn btn-delete rounded-pill"><i class="fa-solid fa-trash-can "></i> Delete</button></td>
</tr>
    `
    }
    tbody.innerHTML = trs;
    if (data.length > 0) {
        deleteAll.innerHTML = ` <button class="w-100 btn btn-delete" onclick=" DeleteAllData()">DeleteAll (${data.length})</button>
    `


    }
    else {
        deleteAll.innerHTML = ``
    }
}
showData()



// *************************************************************
function clearDataAfterSubmit() {
    BookmarkName.value = ""
    SiteURL.value = ""
}
// ******************************************************************************
function saveDatainLocalStorage() {
    localStorage.setItem("website", JSON.stringify(data))
}
// ****************************************************
function deleteWevSite(index) {
    data.splice(index, 1)
    localStorage.setItem("website", JSON.stringify(data))
    showData()
}
// *****************************




function DeleteAllData() {
    localStorage.clear()
    data.splice(0)
    showData()
   
    BookmarkName.style.border="none"
    SiteURL.style.border="none"
    document.getElementById("wrong").style.display="none"
    document.getElementById("correct").style.display="none"
    document.getElementById("wrong2").style.display="none"
    document.getElementById("correct2").style.display="none"
}



function visitWebsite(url){
open(url, "_blank")
}


