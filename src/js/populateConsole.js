//TODO populate console with user passwords
//TODO add functionlaity to add passwords 

async function populate(){
    let token = document.cookie.split("=")[1]
    let home = "https://pswm0.herokuapp.com"
    let url = `${home}/api/${token}`
    console.log({requestUrl:url})
    let data = await fetch(url)
      console.log(await data.json())

}

populate()