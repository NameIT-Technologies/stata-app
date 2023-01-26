const apiUrl="https://strata-api.loca.lt";



export default{

async AuthenticatorResponse(requestOptions)
{
return fetch(apiUrl+'/authenticate', requestOptions)
.then(response => response.json())
.then(json => {
console.log("Json Data => "+ JSON.stringify(json));
  return json;
})
.catch(error => {
  console.error(error);
});
},

async getUserName(userID)
{
return fetch(apiUrl+'/getusername/'+userID)
.then(response => response.json())
.then(json => {
console.log("Json Data => "+ JSON.stringify(json));
  return json;
})
.catch(error => {
  console.error(error);
});
},

async getTickets()
{
  return fetch(apiUrl+'/gettickets')
.then(response => response.json())
.then(json => {
console.log("Json Data => "+ JSON.stringify(json));
  return json;
})
.catch(error => {
  console.error(error);
});
},


async createTicket(requestOptions)
{
  return fetch(apiUrl+'/createticket', requestOptions)
  .then(response => response.json())
  .then(json => {
  console.log("Json Data => "+ JSON.stringify(json));
    return json;
  })
  .catch(error => {
    console.error(error);
  });

}

}