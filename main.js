const updateFlag =(evt)=>{
   const counkeys = evt.value;
   const counCode = countryList[counkeys];
   const newSrc = `https://flagsapi.com/${counCode}/flat/64.png`;
   const img = evt.parentElement.querySelector('img');
   img.src = newSrc;
}

let SelectDropdown = document.querySelectorAll('.selectContainer select');
for(let select of SelectDropdown){
    for(let countryKeys in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = countryKeys;
        newOption.value = countryKeys;
        if(select.name==="from" && countryKeys==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && countryKeys==="NPR"){
            newOption.selected="selected";
        }
        select.append(newOption)
    }

    select.addEventListener('change',(evt)=>{
       updateFlag(evt.target);
    })

}

const btn = document.querySelector('.btn');
btn.addEventListener('click', async (evt)=>{
    evt.preventDefault();
    const selectFrom = document.querySelector('.from select').value;
    const selectFromLowerCase =selectFrom.toLowerCase();
    const selectTo = document.querySelector('.to select').value;
    const selectToLowerCase = selectTo.toLowerCase();
    let amount = document.querySelector('.input input').value;
    if(amount==="" || amount<1){
        alert('Input is Empty');
    }else{
        const BaseURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${selectFromLowerCase}.json`;
        const output = document.querySelector('#output');
        const response = await fetch(BaseURL);
        const data = await response.json();
        const ExchangeRate = data[selectFromLowerCase][selectToLowerCase];
        const FinalRate = ExchangeRate * amount;
        output.value=`${amount} ${selectFrom} = ${selectTo} ${FinalRate}`;
    }




})

let resetBTN= document.querySelector('form .btn2')

resetBTN.addEventListener('click',(evt)=>{
    evt.preventDefault();
    let amount = document.querySelector('.input input');
    amount.value="";
    let output = document.querySelector('#output');
    output.value="";
})