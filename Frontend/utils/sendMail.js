const nodemailer = require("nodemailer");

const sendMail = async (to,subject,text)=>{

   try {

      const transporter = nodemailer.createTransport({
         service:"gmail",
         auth:{
            user:"ys4531104@gmail.com",
            pass:" mcwm xpzx kscy etnv"
         }
      });


      await transporter.sendMail({
        from:"YOUR_EMAIL@gmail.com",
         to,
         subject,
         text
      });
      console.log("mail sent");
   } catch (error) {

      console.log(error.message);
   }

};

module.exports = sendMail;