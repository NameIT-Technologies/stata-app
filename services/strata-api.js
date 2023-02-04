//const apiUrl="https://strata-api.loca.lt";
//const apiUrl="http://localhost:8099";
const apiUrl="http://ec2-13-232-162-26.ap-south-1.compute.amazonaws.com:8099";



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

},

async deleteTicket(tktId,requestOptions)
{
  return fetch(apiUrl+'/deleteticket/'+tktId, requestOptions)
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