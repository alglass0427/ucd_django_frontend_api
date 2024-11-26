


let form = document.getElementById('login-form')
form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log('Form was submitted')
    let formData =  {
        'username' : form.username.value,
        'password' : form.password.value
    }

    // console.log(formData)
    fetch('http://127.0.0.1:8000/api/users/token/',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData)
        })
    .then(response => response.json())
    .then(data => {
        console.log(data.access)
        if (data.access) {
            localStorage.setItem("token",data.access)  //local storage key value pair
            window.location = 'http://127.0.0.1:3000/projectlist.html'
        } else {
            alert('Username or Password did not work')
        }
    })



})