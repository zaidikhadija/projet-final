
const express=require("express")
const router=express.Router();
const authController=require("../../controllers/authController")
const isAuth = require("../../middlewares/isAuth")
const {registerRules,validator,loginRules}=require("../../middlewares/validator")

//@path  http://localhost:5000/api/auth/registre
//metode post registre user
//@accés public or private

router.post("/registre",registerRules(),validator,authController.registre)



//@path  http://localhost:5000/api/auth/login
//metode post login user
//@accés public or private
router.post('/login',loginRules(),validator, authController.login)
    

//@path  http://localhost:5000/api/auth/authUser
//get authentified user
//@accés private
    router.get('/authUser',isAuth,authController.getAuthUser)
    
       

module.exports=router;
