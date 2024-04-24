const chats = require('./chatSchema')
const users=require('../User/userSchema')
const sendMsg = (req, res) => {
    let date = new Date()
    const chat = new chats({
        from: req.body.from,
        userid: req.body.userid,
        date: date,
        message: req.body.message,
    });

    chat.save().then(data => {

        res.json({
            status: 200,
            msg: "message sent successfully",
            data: data,
        });
    })
        .catch(err => {
            console.error(err);
            res.json({
                status: 500,
                msg: "Error adding msg",
                data: err,
            });
        })
}

const viewchatrecepientsforAdmin =async (req, res) => {
    const uniqueUserIds = await chats.distinct('userid');

    const usersWithInfo = await users.find({ _id: { $in: uniqueUserIds } });
if(usersWithInfo.length>0){
            res.json({
                status:200,
                msg: "msg retrieved successfully",
                data: usersWithInfo,
            });
         }else{
            res.json({
                status: 500,
                msg: "No UserMessages Available",
            });
}
}
const viewChatforUserById = (req, res) => {
    chats.find({ userid: req.query.userid })
        .then((books) => {
            res.json({
                status: 200,
                msg: "Books retrieved successfully",
                data: books,
            });
        })
        .catch((err) => {
            console.error(err);
            res.json({
                status: 500,
                msg: "Error retrieving books",
                data: err,
            });
        });
};

module.exports={sendMsg,
viewChatforUserById,
viewchatrecepientsforAdmin
}