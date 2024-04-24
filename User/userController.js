const users = require('./userSchema')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("image");
//User Registration 

const registerUser = (req, res) => {
let imgUrl=null
if(req.file!=null){
  imgUrl=`http://hybrid.srishticampus.in:4010/${req.file.filename}`
}

  const newUser = new users({
    name: req.body.name,
    phone: req.body.phone,
    password: req.body.password,
    email: req.body.email,
    image: req.file,
    imgUrl:imgUrl

  })
  newUser.save().then(data => {
    res.json({
      status: 200,
      msg: "Inserted successfully",
      data: data
    })
  }).catch(err => {

    if (err.code == 11000) {
      res.json({
        status: 409,
        msg: "Mail Id or Username already in Use",
        data: err
      })
    }
    res.json({
      status: 500,
      msg: "Data not Inserted",
      data: err
    })
  })
}
//User Registration -- finished

//Login User 
const loginUser = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  users.findOne({ email: email }).exec().then(data => {
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
          msg: "Password Mismatch",

        })
      }
    } else {
      res.json({
        status: 405,
        msg: "User Not found !",

      })
    }


  }).catch(err => {
    res.json({
      status: 500,
      msg: "Internal Server Error",
      Error: err
    })
  })
};


//Login User --finished


//View all Users

const viewUsers = (req, res) => {
  users.find().exec()
    .then(data => {
      if (data.length > 0) {
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        })
      } else {
        res.json({
          status: 200,
          msg: "No Data obtained "
        })
      }
    }).catch(err => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err
      })
    })

}

// view Users finished


//update User by id
const editUserById = (req, res) => {



  users.findByIdAndUpdate({ _id: req.query.userid }, {

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
const viewUserById = (req, res) => {
  users.findById({ _id: req.query.userid }).exec()
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

const deleteUserById = (req, res) => {

  users.findByIdAndDelete({ _id: req.query.userid }).exec()
    .then(data => {
      console.log(data);
      res.json({
        status: 200,
        msg: "Data removed successfully",
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
//forgotvPawd User by id
const forgotPwd = (req, res) => {



  users.findOneAndUpdate({ email: req.body.email }, {

    password: req.body.password
  })
    .exec().then(data => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Updated successfully"
        })
      else
        res.json({
          status: 500,
          msg: "User Not Found"

        })
    }).catch(err => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err
      })
    })
}


//forgotvPawd User by id

const resetPwd = async (req, res) => {
  let pwdMatch = false
  await users.findById({ _id: req.query.userid })
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
    await users.findByIdAndUpdate({ _id: req.query.userid }, {

      password: req.body.newpassword
    })
      .exec().then(data => {
        if (data != null)
          res.json({
            status: 200,
            msg: "Updated successfully"
          })
        else
          res.json({
            status: 500,
            msg: "User Not Found"

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


module.exports = {
  registerUser,
  viewUsers,
  editUserById,
  loginUser,
  forgotPwd,
  viewUserById,
  deleteUserById,
resetPwd,
  upload
}