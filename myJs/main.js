const myData = data.data;
let milestones = document.querySelector(".milestones")


function loadData() { 
    milestones.innerHTML = myData.map(function(milestone) {
        return ` <div class="milestone border-b" id="${milestone._id}">
            <div class="flex">
              <div class="checkbox"><input type="checkbox" onclick="markMilestone(this, ${milestone._id})"/></div>
              <div  onclick="showPanel(this,${milestone._id})">
                <p>
                  ${milestone.name}
                  <span><i class="fas fa-chevron-down"></i></span>
                </p>
              </div>
            </div>
            <div class="hidden_panel">
              ${milestone.modules.map(function(module) {
                return `<div class="module border-b">
                <p>${module.name}</p>
              </div>`
            }).join("")}
            </div>
          </div>`
    }).join("");
}


function showPanel(myElem, id) {
    const currentPanel = myElem.parentNode.nextElementSibling;
    const showed = document.querySelector(".show");
    const activated = document.querySelector(".active");

    if(!currentPanel.classList.contains("show") && showed) {
        showed.classList.remove("show")
    }

    if(!myElem.classList.contains("active") && activated) {
        activated.classList.remove("active")
    }

    currentPanel.classList.toggle("show")
    myElem.classList.toggle("active");

    showMilestone(id);
}

function showMilestone(id) {
    const title = document.querySelector(".title");
    const details = document.querySelector(".details");
    const image = document.querySelector(".milestoneImage");

    image.style.opacity = '0';
    image.src = myData[id].image;
    title.innerText = myData[id].name;
    details.innerText = myData[id].description;

}

const milestoneImg = document.querySelector(".milestoneImage");
milestoneImg.onload = function() {
    this.style.opacity = '1'
}

function markMilestone(checkbox, id) {
    const doneList = document.querySelector(".doneList");
    const milestonesList = document.querySelector(".milestones");
    const item = document.getElementById(id)

    if(checkbox.checked) {
        milestonesList.removeChild(item);
        doneList.appendChild(item);
    } else {
        doneList.removeChild(item);
        milestonesList.appendChild(item);
        
    }
}

loadData()
