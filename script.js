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
    addGradientToLocalStorage(hexValue);
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
    if(localStorage.getItem('history') == null) {
        localStorage.setItem('history', '[]');
    }
    let oldHistory = JSON.parse(localStorage.getItem('history'));
    oldHistory.push(value);
    localStorage.setItem('history', JSON.stringify(oldHistory));
}

function displayHistory() {
    if(localStorage.getItem('history') != null) {
        let historyCode = historyMenu.lastElementChild;
        let historyData = JSON.parse(localStorage.getItem('history'));
        for(let i = 0; i < historyData.length; i++) {
            historyCode.innerHTML += `<h3>${historyData[i]}</h3>`;
        }
    }
}