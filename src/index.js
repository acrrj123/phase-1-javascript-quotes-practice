document.addEventListener('DOMContentLoaded', () => {

  fetch('http://localhost:3000/quotes?_embed=likes')
  .then(resp => resp.json())
  .then(quotesArr => quotesArr.forEach(quote => {
    renderQuotes(quote)
  }))

  function renderQuotes(quote) {
    const quoteList = document.getElementById('quote-list')
    const card = document.createElement('li')
    card.className = 'quote-card'
    card.innerHTML = `
    <blockquote class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success' id=${quote.id}>Likes: <span>0</span></button>
    <button class='btn-danger'>Delete</button>
    </blockquote>`
    quoteList.appendChild(card) 
    
    const delBtn = card.querySelector('.btn-danger')
    delBtn.addEventListener('click', () => {
      card.remove()
      deleteQuote(quote.id)
    }) 
  }  
  
  const form = document.getElementById('new-quote-form')

  fetch('http://localhost:3000/quotes')
  .then(resp => resp.json())
  .then(quotesArr => addSubmit(quotesArr))

  function addSubmit(quotesArr) {
    form.addEventListener('submit', e  => {
      e.preventDefault()
      quotesArr.forEach(quote => {
        return quote
      })
      const newQuote = {
        quote: e.target.quote.value,
        author: e.target.author.value,
      }
      postNewQuote(newQuote)
      e.target.reset()
    })
  }

  function postNewQuote(newQuote) {
    fetch('http://localhost:3000/quotes', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newQuote)
    })
    .then(resp => resp.json())
    .then(newQuote => renderQuotes(newQuote))
  }

  function deleteQuote(id) {
    fetch(`http://localhost:3000/quotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(resp => resp.json())
    //.then(quote => console.log(quote))
  }
})
    

  
  

  

  


