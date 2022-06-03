console.log('Client side javascript file is loaded!')

// Use fetch to get data from a URL and use it again on Client side
// Below fetches JSON data from http link, then prints it into the console
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//   response.json().then((data) => {
//     console.log(data)
//   })
// })


// fetch('http://localhost:3000/weather?address=Kirkwood').then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log('Could not get weather information. => ' + data.error)
//     } else {
//       console.log(data.forecast)
//     }
//   })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
  //preventDefault prevents the browser from immediately refreshing after submit. If we don't do this it runes this then immediately refreshes
  e.preventDefault()
  const location = search.value

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''

  fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = 'Could not get weather information. => ' + data.error
        // console.log('Could not get weather information. => ' + data.error)
      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        // console.log(data.forecast)
      }
    })
  })
})

// console.log('weatherForm',weatherForm)