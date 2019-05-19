console.log('Client side JS')

// fetch('http://puzzle.mead.io.puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const input = document.querySelector('input')
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    // get input location value
    const location = input.value
    // test location
    // console.log(location)

    p1.textContent = 'Loading...'
    p2.textContent = ''
    const url = 'http://localhost:3000/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                // console.log(data.error)
                p1.textContent = data.error
            } else {
                // console.log(data.location)
                // console.log(data.forecast)
                p1.textContent = data.location
                p2.textContent = data.forecast
            }
        })
    })
})