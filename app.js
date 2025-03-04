const BASE_URL =  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector(".btn");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");


window.addEventListener('load',() => {
    updateExchangeRate();
})



for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerHTML = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
                }
                else if(select.name === "to" && currCode === "INR"){
                    newOption.selected = "selected";
                }

        select.append(newOption); 
    }
    
    select.addEventListener("change", (e)=>{
     updateFlag(e.target);
    })
}


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
    console.log(element);
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
    
});

const updateExchangeRate = async()=>{
    let amount = document.querySelector('.amount input').value;
    if(amount === "" || amount < 1){
        amount = 1;
        amount = "1";
    }

    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value.toLowerCase()}.json`;

    const response = await fetch(url);
    const data = await response.json();
    const rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    

    let finalAmt = amount * rate;
    msg.innerHTML = `${amount} ${fromCurr.value} = ${finalAmt} ${toCurr.value} `;
}
