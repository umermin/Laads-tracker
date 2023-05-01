let myLeads = [];
const inputEl = document.getElementById("input-el");
const saveBtn = document.getElementById("save-btn");
const ulEL = document.getElementById("ul-el");
const deleteEL = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");

const leadsFromLS = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLS)
{
    myLeads = leadsFromLS;
    render(myLeads);
}


function render(leads){
    listElements = ""
for(let i = 0;  i<leads.length;i++)
{
    listElements +=`"<li>
                          <a target = '_blank' href ='${leads[i]}'> 
                          ${leads[i]}</a>
                    </li>"` ;
}
    ulEL.innerHTML = listElements;
}

tabBtn.addEventListener("click", ()=>{

    chrome.tabs.query({active: true, currentWindow : true},(tabs)=>{
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads));
        render(myLeads);
    })
})
deleteEL.addEventListener("dblclick",()=>{
    localStorage.clear();
    myLeads = [];    
    render(myLeads);
})
saveBtn.addEventListener("click",()=>{
    console.log("button is clicked from event listener");
    myLeads.push(inputEl.value);
    inputEl.value = "";    
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    console.log(localStorage.getItem("myLeads"))
    render(myLeads);
})
