let historyDate = new Date;

const clrElements = document.querySelectorAll("input");
const containerWrapper = document.querySelector(".container-wrapper");
const color1p = document.querySelector(".color-1");
const color2p = document.querySelector(".color-2");
const angel = document.querySelector("#angel");
const colorsHexText = document.querySelectorAll(".color");
const cssCode = document.querySelector(".css-code");
const modal = document.querySelector(".modal");
// History VARS 
let openHistoryBtn = document.querySelector(".open-icon");
let closeHistoryBtn = document.querySelector(".close-icon");
let historyMenu = document.querySelector(".history");
let historyCode = historyMenu.lastElementChild;
const gradientHistory = [];


displayHistory();
let firstClr = localStorage.getItem("color1");
let secondClr = localStorage.getItem("color2");
let angelValue = localStorage.getItem("angel");
for(let i = 0; i < clrElements.length; i++) {
    clrElements[0].value = firstClr;
    clrElements[1].value = secondClr;
    angel.value = angelValue;
    clrElements.forEach(element => {
        containerWrapper.style.background = `linear-gradient(${angelValue}deg, ${firstClr}, ${secondClr})`;
        cssCode.innerText = `background: linear-gradient(${angelValue}deg, ${firstClr}, ${secondClr});`;
        cssCode.style.background = `linear-gradient(${angelValue}deg, ${firstClr}, ${secondClr})`;
        element.addEventListener("change", ()=>{
            localStorage.setItem("color1", clrElements[0].value);
            localStorage.setItem("color2", clrElements[1].value);
            localStorage.setItem("angel", angel.value);
            containerWrapper.style.background = `linear-gradient(${angel.value}deg, ${clrElements[0].value}, ${clrElements[1].value})`;
            cssCode.innerText = `background: linear-gradient(${angel.value}deg, ${clrElements[0].value}, ${clrElements[1].value});`;
            cssCode.style.background = `linear-gradient(${angel.value}deg, ${clrElements[0].value}, ${clrElements[1].value})`;
        });
    });
}

for (let i = 0; i < colorsHexText.length; i++) {
    let colorHex = colorsHexText[i];
    colorHex.addEventListener("click", copyColorAttribute);
}

function copyColorAttribute(e) {
    let hex = e.target;
    let hexValue = hex.innerText;
    navigator.clipboard.writeText(hexValue);
    //! uncompleted section need fixing
    if(historyCode.childElementCount < 8) {
        addGradientToLocalStorage(hexValue);
    }else {
        alert("history limit 8, We will fix it soon! ;)");
        location.reload();
    }
    if(modal.classList.contains("active")) {
        modal.classList.remove("active");
    }else {
        modal.classList.add("active");
    }
    setInterval(()=>{
        modal.classList.remove("active");
    }, 3500);
}

// ! History Menu

const openHistoryMenu = ()=>{
    historyMenu.classList.add("active-menu");
}
const closeHistoryMenu = ()=>{
    historyMenu.classList.remove("active-menu");
}

openHistoryBtn.addEventListener("click", openHistoryMenu);
closeHistoryBtn.addEventListener("click", closeHistoryMenu);

function addGradientToLocalStorage(value) {
    if(localStorage.getItem('history') == null && localStorage.getItem('time') == null) {
        localStorage.setItem('history', '[]');
        localStorage.setItem('time', '[]');
    }
    let oldHistory = JSON.parse(localStorage.getItem('history'));
    oldHistory.push(value);
    let oldHistoryTime = JSON.parse(localStorage.getItem('time'));
    let currentTime = `${historyDate.getHours()}:${historyDate.getMinutes() < 10 ? '0' + historyDate.getMinutes() : historyDate.getMinutes()}`;
    oldHistoryTime.push(currentTime);
    localStorage.setItem('history', JSON.stringify(oldHistory));
    localStorage.setItem('time', JSON.stringify(oldHistoryTime));
}

function displayHistory() {
    if(localStorage.getItem('history') != null && localStorage.getItem('time') != null) {
        let historyTime = JSON.parse(localStorage.getItem('time'));
        let historyData = JSON.parse(localStorage.getItem('history'));
        let time = [];
        let data = [];
        let childTime = [];
        for(let i = 0; i < historyData.length; i++) {
            time.push(historyTime[i]);
            data.push(historyData[i]);
            let item = {
                'code': data[i],
                'time': time[i]
            };
            childTime.push(item);
        }
        childTime.forEach((item)=>{
                historyCode.innerHTML += `
                <div class="history-child">
                    <h4>${item.time}</h4>
                    <h3>${item.code}</h3>
                </div>`;
        })
    }
}