


async function populate() {
  let token = document.cookie.split("=")[1]
  let home = "https://pswm0.herokuapp.com"
  let url = `${home}/api/${token}`
  console.log({ requestUrl: url })
  let data = await (await fetch(url)).json()
  //data = await data.json()
  data = JSON.parse(data)
  data['payload'].forEach(element => {
    console.log(element['update']['site'])//DEBUG log 
    let container = document.getElementById('passwords-container')
    let password = document.createElement('div');
    password.className = 'password'
    password.innerHTML = `site : ${element['update']['site']}`
    container.appendChild(password)

  });

  data.payload.forEach(element => {
    //console.log(element)

  });


}

populate()