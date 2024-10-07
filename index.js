const express = require("express")
const app = express() 

const admin = require("firebase-admin") 
const cred = require("./key.json") 
const { cert } = require("firebase-admin/app")

admin.initializeApp({
    credential: cert(cred), 
    databaseURL: "https://test-php-984e3-default-rtdb.firebaseio.com"
}) 
 
const db= admin.firestore()

app.use(express.json()) 
app.use(express.urlencoded({extended:true})) 

app.post("/create",async (req,res)=>{
    const data=req.body;
    // console.log(data) 
    await db.collection("contact").add(data)
    if (res.statusCode==200)
    {
        res.send({msg:"jechitom mara!"})
    }
    else{
        res.send({msg:"vanakam da mapla else la irrunthu"})
    }
}) 

app.get("/show",async(req,res)=>{
    const data= await db.collection("contact").get();
    const list=data.docs.map((doc)=> ({id:doc.id, ...doc.data()}))
    res.send(list)
})

app.post("/update",async(req,res)=>{
    const id= req.body.id;
    delete req.body.id 
    const data = req.body
    await db.collection("contact").doc(id).update(data) 
    if (res.statusCode==200)
    {
        res.send({msg:"mathiten"})
    }
    else{
        res.send({msg:"not deleted"})
    }

})


app.post("/delete",async(req,res)=>{
    const id=req.body.id
    await db.collection("contact").doc(id).delete()
    if (res.statusCode==200)
        {
            res.send({msg:"thukiten"})
        }
        else{
            res.send({msg:"thukala"})
        }
})


app.listen(8000,()=>{
    console.log("Server started at 8000")
})