const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = []; 
//Show Loading

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Hide Loading

function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true; 
    }
}


//Show new Quote
function newQuote(){
    loading();
    //Pick a random Quote From apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(apiQuotes);
    //Check if the Author text is blank
    if(!quote.author){
        authorText.textContent = 'UnKnown';      
    }else{
       authorText.textContent = quote.author; 
    }
    //Check Quote Length to determine styling
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    complete();
}

// Get Quote From API

async function getQuote(){
    loading();
    //const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://type.fit/api/quotes';
    
    try {
        const response = await fetch(apiUrl);
        console.log(response);
        apiQuotes = await response.json();
        newQuote();
    }catch (error){
        getQuote();
   }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
    window.open(twitterUrl, '_blank');
  }


//Event Listeners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load

getQuote();