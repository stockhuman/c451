;(() => {
  const search = async event => {
    event.preventDefault()

    let query = {
      text: document.querySelector('#search').value,
      sub: document.querySelector('input[name="subreddit"]:checked').value,
    }

    // Default options are marked with *
    const response = await fetch('/postForm', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(query), // body data type must match "Content-Type" header
    })

    const res = await response.json()
    render(res)
  }
  document.querySelector('#ping').addEventListener('click', search)

  function render (data) {
    let text = ''
    if (data) {
      data.forEach(el => {
        text += `<p class="result"><a href="${el.postUrl}">${el.postTitle}</a></p>`
      })
    }
    document.querySelector('#content').innerHTML = text ? text : '<p>No wisdom to be found</p>'
  }
})()
