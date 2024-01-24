var countdownNumberEl = document.getElementById('countdown-number');
var countdown = 59;

var stockData=[]

countdownNumberEl.textContent = countdown;

setInterval(function() {
  countdown = --countdown <= 0 ? 59 : countdown;

  countdownNumberEl.textContent = countdown;
}, 1000);


function changeBackgroundColor() {
    const mainElement = document.getElementById('mainDiv');
    const color = mainElement.style.backgroundColor;
    const priceElement=document.getElementsByClassName('price')
    const bodyTag=document.getElementById('bodyTag')
   
    if (color !== 'white' || color === '') {
        priceElement[0].style.color='black'
        priceElement[1].style.color='black'
        bodyTag.style.backgroundColor='white'
        mainElement.style.backgroundColor = 'white';
    }
}

async function getData() {
    try {
        const response = await fetch('http://localhost:3000/api/get-data');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        var data = await response.json();
         data=data.data.slice(0,10)

        stockData=data
        
        console.log(stockData)
        addRowsToTable()
    } catch (err) {
        console.error('Fetch error:', err);
    }
}

function addRowsToTable() {
    const table = document.querySelector('table');

    // Loop through stockData and create a new row for each entry
    stockData.forEach((stock, index) => {
        const newRow = table.insertRow();
    
        // Add cells to the row
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4);
        const cell6 = newRow.insertCell(5);
    
        // Populate cells with data from stock object
        cell1.textContent = index + 1;  // Assuming you want a numerical index
        
        // Create an img element
        const imgElement = document.createElement('img');
        imgElement.src = '../assets/images/bit.png';  // Replace with the actual path to your image
        imgElement.alt = stock.name;  // Use stock name as alt text
        imgElement.style.maxWidth = '40px';
        imgElement.style.borderRadius='50px'  // Adjust the width as needed
        
        // Create a span element for the text
        const textSpan = document.createElement('span');
        textSpan.textContent = stock.name;
        
        // Append both img and text elements to cell2
        cell2.appendChild(imgElement);
        cell2.appendChild(textSpan);
    
        cell3.textContent = stock.last;
        cell4.textContent = stock.buy;
        cell5.textContent = stock.sell;
        cell6.textContent = stock.base_unit;
    
        newRow.classList.add('rounded-5', 'border', 'border-primary');
        newRow.style.backgroundColor = 'gray';
    });
    

}
async function getData1() {
    await getData();
}

getData1();
