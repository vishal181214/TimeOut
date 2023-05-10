
const nodeMailer = require('nodemailer');

const sendMail = async (req,res) =>{
    const testAccount = await nodeMailer.createTestAccount();

    const transporter = nodeMailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'gmail',
        // port: 587,
        auth: {
            user: 'vishal32gaykwad@gmail.com',
            pass: 'Vishal@9960*'
        }
    });

    const info = await transporter.sendMail({
        from:`vishal32gaykwad@gmail.com`,
        to:"2017bcs514@sggs.ac.in",
        subject:"Hello",
        text:"I am from nodeJs nodeMailer",
        html:"<b>Hello Vishal!</b>"
    })

    console.log("Message Sent", info.messageId); // to get messageId

    res.json(info);
}

module.exports = sendMail;