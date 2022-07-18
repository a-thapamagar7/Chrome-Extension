let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const deleteBtn = document.getElementById("delete-btn")
const ulEl = document.getElementById("ul-el")
const tabBtn = document.getElementById("tab-btn")
const leadsFromlocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromlocalStorage) {
    myLeads = leadsFromlocalStorage
    render(myLeads)
}

tabBtn.addEventListener("click", function () {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem( "myLeads", JSON.stringify(myLeads) ) // Stores the links in localStorage
    render(myLeads)
    })
})

function render(lead) {
    let listItems = ""
    for (let i = 0; i < lead.length; i++) {
        listItems += `
        <li>
            <a target='_blank'href='${lead[i]}'>
                ${lead[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML = listItems  
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    localStorage.setItem( "myLeads", JSON.stringify(myLeads) ) // Stores the links in localStorage
    render(myLeads)
    inputEl.value = ""
})

deleteBtn.addEventListener( "dblclick", function() {
    let detected = false
    let dindex = 0
    if(inputEl.value == ""){
        localStorage.clear()
        myLeads = []
        render(myLeads)
    }
    else{
        for (let i = 0; i < myLeads.length; i++) {
            if(inputEl.value === myLeads[i]) {
                detected = true
                dindex = i
            }
        }
        if(detected === true) {
            myLeads.splice(dindex, 1)
            render(myLeads)
            localStorage.setItem( "myLeads", JSON.stringify(myLeads) ) // Stores the links in localStorage
        }
    }
} )



