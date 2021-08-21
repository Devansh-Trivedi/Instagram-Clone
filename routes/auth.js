const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const {SENDGRID_API,EMAIL} = require('../config/keys')



const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:"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"
    }
}))

router.post('/signup',(req,res)=>{
  const {name,email,password,pic} = req.body 
  if(!email || !password || !name){
     return res.status(422).json({error:"please add all the fields"})
  }
  User.findOne({email:email})
  .then((savedUser)=>{
      if(savedUser){
        return res.status(422).json({error:"user already exists with that email"})
      }
      bcrypt.hash(password,12)
      .then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name,
                pic
            })
    
            user.save()
            .then(user=>{
                transporter.sendMail({
                    to:user.email,
                    from:"tridevansh.160601@gmail.com",
                    subject:"signup success",
                    html:`<BODY>

                    <P align=center><IMG border=0 hspace=0 alt="" align=baseline src="https://res.cloudinary.com/devdemo/image/upload/v1626663288/banner_yaj2oa.png"></P>
              
              <DIV align=center>
              
                    <TABLE style="HEIGHT: 25px; MARGIN-LEFT: auto; WIDTH: 600px; BACKGROUND-COLOR: #cc0000; MARGIN-RIGHT: auto" align=center>
              
                          <TBODY>
              
                                <TR>
              
                                      <TD>&nbsp;</TD>
              
                                </TR>
              
                          </TBODY>
              
                    </TABLE>
              
              </DIV>
              
              <!--HEADER/BANNER END-->
              
              <!--CONTENT OF BODY START-->
              
              <DIV align=center>
              
                    <TABLE style="MARGIN-LEFT: auto; WIDTH: 600px; MARGIN-RIGHT: auto" cellSpacing=0 cellPadding=0 align=center>
              
                          <TBODY>
              
                                <TR>
              
                                      <TD style="HEIGHT: 450px; PADDING-BOTTOM: 10px; TEXT-ALIGN: left; PADDING-TOP: 75px; PADDING-LEFT: 20px; PADDING-RIGHT: 20px; WIDTH: 600px; BACKGROUND-COLOR: #fcfcfc" vAlign=top>Welcome ${name} to Instagram,<BR><BR><BR> Your username is: ${email} <BR><BR><BR>And your password is ${password}<BR><BR><BR>${name} We wish you a wonderful experience !! <BR><BR><BR><BR>Cheers,<BR><BR><IMG alt=Signature src="https://res.cloudinary.com/devdemo/image/upload/v1626662855/instasign-removebg-preview_nyrwrz.png" width=140 longDesc="Juan G. Pablo Signature" height=30>
              
                                      </TD>
              
                                </TR>
              
              <!--CONTENT BODY END-->
              
              <!--FOOTER START-->
              
              <!--This is a simple example of a footer that includes hyperlinks to your website and social networks. You will want to upload the images to your Trail Blazer Application Menu and change out the hyperlink URLs with your own. Inside the <Style> tag you can adjust the background color, margins and dimensions of this footer-->
              
              <TR>
              
                    <TD style="HEIGHT: 175px; TEXT-ALIGN: center; MARGIN-TOP: 25px; BACKGROUND-COLOR: #2a2a2a">
              
                          <SPAN style="COLOR: #c3c3c3"><A style="TEXT-DECORATION: none" href="http://instagram-clone1606.herokuapp.com/">
              
                          <SPAN style="COLOR: #c3c3c3"><U>http://instagram-clone1606.herokuapp.com/</U></SPAN></A><BR><BR>Paid for by the Campaign to Elect Juan Pablo for US Congress.</SPAN>
              
                                <BR style="COLOR: #c3c3c3">
              
                          <SPAN style="COLOR: #c3c3c3">1600 Pennsylvania Ave NW<BR>Washington, DC 20500<BR><BR></SPAN>
              
              
              
                    </TD>
              
              </TR>
              
              <!--FOOTER END-->
              
              </TBODY>
              
              </TABLE>
              
              </DIV>
              
              </BODY>`
                })
                res.json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
      })
     
  })
  .catch(err=>{
    console.log(err)
  })
})


router.post('/signin',(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
       return res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
           return res.status(422).json({error:"Invalid Email or password"})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                // res.json({message:"successfully signed in"})
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
               const {_id,name,email,followers,following,pic} = savedUser
               res.json({token,user:{_id,name,email,followers,following,pic}})
            }
            else{
                return res.status(422).json({error:"Invalid Email or password"})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})


router.post('/reset-password',(req,res)=>{
     crypto.randomBytes(32,(err,buffer)=>{
         if(err){
             console.log(err)
         }
         const token = buffer.toString("hex")
         User.findOne({email:req.body.email})
         .then(user=>{
             if(!user){
                 return res.status(422).json({error:"User dont exists with that email"})
             }
             user.resetToken = token
             user.expireToken = Date.now() + 3600000
             user.save().then((result)=>{
                 transporter.sendMail({
                     to:user.email,
                     from:"tridevansh.160601@gmail.com",
                     subject:"password reset",
                     html:`<BODY>

                    <P align=center><IMG border=0 hspace=0 alt="" align=baseline src="https://res.cloudinary.com/devdemo/image/upload/v1626663288/banner_yaj2oa.png"></P>
              
              <DIV align=center>
              
                    <TABLE style="HEIGHT: 25px; MARGIN-LEFT: auto; WIDTH: 600px; BACKGROUND-COLOR: #cc0000; MARGIN-RIGHT: auto" align=center>
              
                          <TBODY>
              
                                <TR>
              
                                      <TD>&nbsp;</TD>
              
                                </TR>
              
                          </TBODY>
              
                    </TABLE>
              
              </DIV>
              
              <!--HEADER/BANNER END-->
              
              <!--CONTENT OF BODY START-->
              
              <DIV align=center>
              
                    <TABLE style="MARGIN-LEFT: auto; WIDTH: 600px; MARGIN-RIGHT: auto" cellSpacing=0 cellPadding=0 align=center>
              
                          <TBODY>
              
                                <TR>
              
                                      <TD style="HEIGHT: 450px; PADDING-BOTTOM: 10px; TEXT-ALIGN: left; PADDING-TOP: 75px; PADDING-LEFT: 20px; PADDING-RIGHT: 20px; WIDTH: 600px; BACKGROUND-COLOR: #fcfcfc" vAlign=top>Welcome to Instagram,<BR><BR><BR><p>You requested for password reset</p><BR><h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5><BR><BR>We wish you a wonderful experience !! <BR><BR><BR><BR>Cheers,<BR><BR><IMG alt=Signature src="https://res.cloudinary.com/devdemo/image/upload/v1626662855/instasign-removebg-preview_nyrwrz.png" width=140 longDesc="Juan G. Pablo Signature" height=30>
              
                                      </TD>
              
                                </TR>
              
              <!--CONTENT BODY END-->
              
              <!--FOOTER START-->
              
              <!--This is a simple example of a footer that includes hyperlinks to your website and social networks. You will want to upload the images to your Trail Blazer Application Menu and change out the hyperlink URLs with your own. Inside the <Style> tag you can adjust the background color, margins and dimensions of this footer-->
              
              <TR>
              
                    <TD style="HEIGHT: 175px; TEXT-ALIGN: center; MARGIN-TOP: 25px; BACKGROUND-COLOR: #2a2a2a">
              
                          <SPAN style="COLOR: #c3c3c3"><A style="TEXT-DECORATION: none" href="http://instagram-clone1606.herokuapp.com/">
              
                          <SPAN style="COLOR: #c3c3c3"><U>http://instagram-clone1606.herokuapp.com/</U></SPAN></A><BR><BR>Paid for by the Campaign to Elect Juan Pablo for US Congress.</SPAN>
              
                                <BR style="COLOR: #c3c3c3">
              
                          <SPAN style="COLOR: #c3c3c3">1600 Pennsylvania Ave NW<BR>Washington, DC 20500<BR><BR></SPAN>
              
              
              
                    </TD>
              
              </TR>
              
              <!--FOOTER END-->
              
              </TBODY>
              
              </TABLE>
              
              </DIV>
              
              </BODY>`
                 })
                 res.json({message:"check your email"})
             })

         })
     })
})


router.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})


module.exports = router