const admin = require('./adminSchema')

const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: function (req, res, cb) {
//     cb(null, "./upload");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const uniquePrefix = 'prefix-'; // Add your desired prefix here
    const originalname = file.originalname;
    const extension = originalname.split('.').pop();
    const filename = uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.')) + '-' + Date.now() + '.' + extension;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage }).single("image");
//User Registration 

const addAdminDetails = (req, res) => {

console.log(req.file)
  const newUser = new admin({
    name: req.body.name,
    phone: req.body.phone,
    password: req.body.password,
    email: req.body.email,
    image: req.file,
    imgUrl:`http://hybrid.srishticampus.in:4010${req.file.filename}`

  })
  newUser.save().then(data => {
    res.json({
      status: 200,
      msg: "Inserted successfully",
      data: data
    })
  }).catch(err => {

   
    res.json({
      status: 500,
      msg: "Data not Inserted",
      data: err
    })
  })
}
//User Registration -- finished

//Login Admin 
const loginAdmin = async(req, res) => {
  const email = req.body.email
  const password = req.body.password
let empty=false

await admin.find().exec().then(datas => {
    if(datas.length<=0)
     empty=true}).catch(err=>{
    console.log(err);})
    if(empty==false){
  admin.findOne({ email: email }).exec().then(data => {
    if (data) {
      if (password == data.password) {
        res.json({
          status: 200,
          msg: "Login successfully",
          data: data
        })
      } else {
        res.json({
          status: 401,
          msg: "Password Mismatch !",

        })
      }
    } else {
      res.json({
        status: 405,
        msg: "Invalid Username !! ",

      })
    }




  }).catch(err => {
    res.json({
      status: 500,
      msg: "Internal Server Error",
      Error: err
    })
  })
}else{
if(email=='admin@gmail.com'){
if (password =='admin@123') {
    res.json({
      status: 200,
      msg: "Login successfully",
    })
  } else {
    res.json({
      status: 401,
      msg: "Password Mismatch !",

    })
  }
} else {
  res.json({
    status: 405,
    msg: "Invalid Username !! ",

  })
}
}
};


const editAdmindata = async(req, res) => {

    const admindata = await admin.find({ });
    if(admindata.length<=0)
    newAdmin=true

    admin.findOneAndUpdate({ role: 'admin'}, {
  
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      image: req.file,
      imgUrl:`http://hybrid.srishticampus.in:4010/${req.file.filename}`
  
  
    })
      .exec().then(data => {
  
        res.json({
          status: 200,
          msg: "Updated successfully"
        })
      }).catch(err => {
        res.json({
          status: 500,
          msg: "Data not Updated",
          Error: err
        })
      })
  }
  // view cust by id
  const viewAdminDetails = (req, res) => {
    users.findOne({role:'admin'}).exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        })
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No Data obtained",
          Error: err
        })
      })
  
  }

  
const resetPwd = async (req, res) => {
    let pwdMatch = false
    await admin.findOne({role:'admin' })
      .exec().then(data => {
        if (data.password == req.body.oldpassword)
          pwdMatch = true
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "Data not Updated",
          Error: err
        })
      })
    if (pwdMatch) {
      await admin.findOneAndUpdate({role:'admin' }, {
  
        password: req.body.newpassword
      })
        .exec().then(data => {
            res.json({
              status: 200,
              msg: "Updated successfully"
            })
         
        }).catch(err => {
          console.log(err);
          res.json({
            status: 500,
            msg: "Data not Updated",
            Error: err
          })
        })
    } else {
      res.json({
        status: 405,
        msg: "Your Old Password doesn't matches !!"
  
      })
    }
  }
  
module.exports={loginAdmin,
addAdminDetails,
viewAdminDetails,
editAdmindata,
resetPwd,
upload
}