require("dotenv").config();

const router = require("express").Router(); //here
const UserInfo = require("../db").import("../models/userinfo");
const validateSession = require("../middleware/validate-session");



router.post("/createuserinfo",validateSession,(req,res)=>{
    const userId=req.user.id;
    const dateOfBirth=req.body.user.dateOfBirth;
    const age=req.body.user.age;
    const heightInInches=req.body.user.heightInInches;
    const weightInPounds=req.body.user.weightInPounds;
    const goal=req.body.user.goal;
    UserInfo.create({
        userId:userId,
        dateOfBirth: dateOfBirth,
        age: age,
        heightInInches:heightInInches,
        weightInPounds:weightInPounds,
        goal:goal
    })
    .then((info) =>
      res.status(200).json({ info: info, message: "UserInfo stored successfully" })
    )
    .catch((err) => res.status(500).json({ error: err }));
});

//Delete userinfo
router.delete("/:id", validateSession, (req, res) => {
    UserInfo.destroy({where: { id: req.user.id }})
    .then((entry) => {
        if(entry===0){
            res.status(403).json({message:"You are not allowed to delete another user's information!"})
        } else {
            res.status(200).json({message:"Info deleted"})
        }
    }) 
    .catch((err) => res.status(500).json({ error: err }));
});



module.exports = router;
