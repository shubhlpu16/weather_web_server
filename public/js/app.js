


const weatherForm = document.querySelector('form')
const search=document.querySelector('input')

const message1 =document.querySelector('#message1')
const message2 =document.querySelector('#message2')
const icon =document.querySelector('#icon')

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const address=search.value;
  message1.textContent="Loading..."
  message2.textContent=""
  icon.src=""
  fetch(`/weather?address=${address}`)
    .then(response=>
    {
      response.json().then(data=>{
        if(data.error)
        {
          message1.textContent=data.error
        }
        else {
          icon.src=data.icon
          message1.textContent=data.location
            message2.textContent=data.forcast
        }

      })
    })
})
