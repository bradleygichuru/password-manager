//TODO populate console with user passwords

async function populate(){
    let token = document.cookie.split("=")[1]
    let url = `${document.location.host}/api/${token}`
    console.log({requestUrl:url})
    let data = await fetch(url,{
      mode:'cors'
    })
      
      console.log(await data.json())

}
//TODO fix cross origin request error 
populate()