


async function populate() {
  let token = document.cookie.split("=")[1]
  let home = "https://pswm0.herokuapp.com"
  let url = `${home}/api/${token}`
  console.log({ requestUrl: url })
  let data = await (await fetch(url)).json()
  //data = await data.json()
  data = JSON.parse(data)
  console.log(data['payload'])//DEBUG log 
  
  data.payload.forEach(element => {
    //console.log(element)
    let container = document.getElementById('passwords-container')
    let password = document.createElement('div');
    password.className = 'password'
    password.innerHTML = `site : ${element['site']}`
    container.appendChild(password)
  });


}

populate()