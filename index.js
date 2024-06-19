const express=require("express");
const app=express();

// Using In Memory database

const users=[{
    name:"Mani",
    kidneys:[{
        healthy:true
    }]
}]

app.get('/',function(req,res){
    const kid=users[0].kidneys;
    const kidno=kid.length;
    let hkid=0;
    for(let i=0;i<kidno;i++){
        if(kid[i].healthy){
            hkid=hkid+1;
        }
    }
    const unhkid=kidno-hkid;
    res.json({
        kidno,
        hkid,
        unhkid
    })
})

app.use(express.json());
app.post('/',function(req,res){
    const ishealthy=req.body.ishealthy;
    users[0].kidneys.push({
        healthy:ishealthy
    })
    res.json({
        msg:"Done"
    })
})

app.delete("/", function(req, res) {
    if(isThereAtleastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i<users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                })
            }
        }
        users[0].kidneys = newKidneys;
        res.json({msg: "done"})   
    } else {
        res.status(411).json({
            msg: "You have no bad kidneys"
        });
    }
})

function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i<users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney
}

app.listen(3000);