document.addEventListener('DOMContentLoaded', () => {

  fetch('http://localhost:3000/quotes?_embed=likes')
  .then(resp => resp.json())
  .then(quotesArr => quotesArr.forEach(quote => {
    renderQuotes(quote)
  }))

  function renderQuotes(quote) {
    //console.log(quote)
    const quoteList = document.getElementById('quote-list')
    const card = document.createElement('li')
    card.className = 'quote-card'
    card.innerHTML = `
    <blockquote class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success' id=${quote.id}>Likes: <span>${quote.likes.length}</span></button> 
    <button class='btn-danger'>Delete</button>
    </blockquote>`
    quoteList.appendChild(card) 
    
    const delBtn = card.querySelector('.btn-danger')
    delBtn.addEventListener('click', () => {
      card.remove()
      deleteQuote(quote.id)
    }) 

    const likeBtn = card.querySelector('.btn-success')
    likeBtn.addEventListener('click', () => {
      let span = card.querySelector('span')
      span.textContent = parseInt(span.textContent) + 1
      //console.log(typeof span.textContent)
      updateLikes(quote)
    })
  }  
  
  const form = document.getElementById('new-quote-form')

  fetch('http://localhost:3000/quotes')
  .then(resp => resp.json())
  .then(quotesArr => {
    handleSubmit(quotesArr)
  })

  function handleSubmit(quotesArr) {
    form.addEventListener('submit', e  => {
      e.preventDefault()
      quotesArr.forEach(quote => {
        return quote
      })
      const newQuote = {
        quote: e.target.quote.value,
        author: e.target.author.value,
        likes: []
      }
      createQuote(newQuote)
      e.target.reset()
    })
  }
  
  function createQuote(newQuote) {
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

  function updateLikes(quote) {
    fetch('http://localhost:3000/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({quoteId: quote.id})
    })
    .then(resp => resp.json())
    .then(likeObj => {
      fetch(`http://localhost:3000/likes?quoteId=${quote.id}`)
      .then(resp => resp.json())
      .then(likeArr => {
        //console.log(likeArr)
        const likeBtn = document.getElementById(`${quote.id}`)
        //console.log(likeBtn)
        likeBtn.childNodes[1].textContent = `${likeArr.length}`
      })
    })
  }
})
    

  
  

  

  

