async function populate() {
  let token = document.cookie.split("=")[1]
  let home = "https://pswm0.herokuapp.com"
  let url = `${home}/api/${token}`
  console.log({ requestUrl: url })
  let data = await (await fetch(url)).json()
  
  data['payload'].forEach(element => {
    console.log(element['update']['site'])//DEBUG log 
    let container = document.getElementById('passwords-container')
    let password = document.createElement('div');
    password.className = 'password'

    let passwordDescription = document.createElement('p')
    passwordDescription.className = 'pass-description'
    passwordDescription.innerHTML = element['update']['site']

    let editButton = document.createElement('img');
    editButton.src = '../assets/icons8-pen-64.png'
    editButton.className = 'action-button'

    let deleteButton = document.createElement('img');
    deleteButton.src = '../assets/icons8-trash-30.png'
    deleteButton.className = 'action-button'

    password.appendChild(passwordDescription)
    password.appendChild(editButton)
    password.appendChild(deleteButton)
    container.appendChild(password)

  });

  data.payload.forEach(element => {
    //console.log(element)

  });


}

populate()