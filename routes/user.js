const router = require("express").Router();
const mongoose = require('mongoose')
const User = require("../models/User");
const checkSentiment = require("../functions/sentiment");

// get all users 


// get messages 
  router.get("/getmessage/:user", async (req, res) => {
    
    try {
      const user = await User.find({username : req.params.user});

      res.status(200).json(user[0].message);

    } catch (err) {
      res.status(500).json(err);
    }
  });


  //  validate message

  const validateMessage = (msg) => {
    return checkSentiment(msg)
  }

  // send messages

  router.put("/sendmessage/:user", async (req, res) => {
      //params for receiver

      const receiver = req.params.user;

      // body for sender
      const sender = req.body.username;  
      const message = req.body.message; 
      const msgData = validateMessage(message)
      
      if(msgData.valid){
        try {

          const userReceiver = await User.find({username : receiver});
          const userSender = await User.find({username : sender});
          
          await userReceiver[0].updateOne({$push : {message:JSON.stringify({msg_txt:message,score:msgData.score})}})
            
          res.status(200).json(userReceiver[0].message);

         
         
        
        } catch (err) {
          
          res.status(500).json({message:"Something went wrong"});
        
        }        
      }else{
        res.status(500).json({message:"message sending failed please dont use foul language"})
      }
  
  });


//   router.get("/all", async (req, res) => {
    
//     try {
//       const Activities = await Activity.find({});
//       res.status(200).json(Activities);

//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   router.get("/getActivity/:id", async (req, res) => {
    
//     try {
//         const id = req.params.id;
//       const Activities = await Activity.findById(id);
//       res.status(200).json(Activities)

//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// //   findByIdAndUpdate(req.params.id,{$set:req.body})
// router.put("/update/:id", async (req, res) => {
//     const newActivity = new Activity(req.body);
//     try {
//       const activity = await Activity.findByIdAndUpdate(req.params.id,{$set:req.body});
//       res.status(200).json(activity);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
// //   deleteOne

//   router.delete("/delete", async (req, res) => {
//     const newActivity = new Activity(req.body);
//     try {
//       const activity = await Activity.deleteOne({_id : req.body.id});
//       res.status(200).json(activity);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// router.put("/attendance/:id", async (req, res) => {
//     const newStudent = req.body.student;  
//     try {

//     const activity = await Activity.findById(req.params.id);
//       await activity.updateOne({$push : { registrations:newStudent}})

//       res.status(200).json(activity);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });


  module.exports = router;