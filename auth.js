const { GoogleAuth } = require('google-auth-library');
const path = require('path');
const express=require('express');
const app=express();

const keyFilePath = path.join(__dirname, 'key.json');

const SCOPES = ['https://www.googleapis.com/auth/datastore'];

async function getFirestoreBearerToken() 
{
  const auth = new GoogleAuth({
    keyFile: keyFilePath,
    scopes: SCOPES,
  });

  const client = await auth.getClient();

  const tokenResponse = await client.getAccessToken();
  const bearerToken = tokenResponse.token;

  // console.log('Bearer Token:', bearerToken);
  app.get("/token",(req,res)=>{
    if(bearerToken!=null)
    {
    res.send(
      {
        "Bearer":bearerToken,
        "status":200
      }
    );
    }
    else{
      res.send({"Bearer":null,"status":"fail"});
    }
  })

  return bearerToken;
}

// Call the function to get the Bearer Token
getFirestoreBearerToken().catch(console.error);



app.listen(8000,()=>{
  console.log("server is started")
})
