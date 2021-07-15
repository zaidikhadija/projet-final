const User=require("../models/User")
module.exports={
  
    getPayients:async(req,res)=>{
        try {
            
            let users= (await User.find().select("-password").populate("MedicalFiles"))
            res.json({msg:"list users loaded",users})
        } catch (error) {
            res.status(500).send("server error")
        }
    }
}