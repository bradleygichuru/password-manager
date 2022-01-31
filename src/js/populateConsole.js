//TODO popilate console with user passwords
async function populate(){
    let data = await fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query: "{ passwordData }"})
      })
      
      console.log(await data.json())

}