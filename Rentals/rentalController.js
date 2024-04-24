const bookSchema = require('../Books/bookSchema');
const notifications = require('./notifications');
const rentals = require('./rentalSchema');
const reviews = require('./reviews');

const assignBook =async (req, res) => {
    let date = new Date()
    let duedate = new Date()
let status=true
await rentals.find({  userid: req.body.userid,
    bookid: req.body.bookid,
status:'assigned'}).exec().then(dat=>{
    if(dat.length>0)
    status=false
}).catch(er=>{
    console.log(er);
})
if(status==true){
    const dataa = await bookSchema.findById(req.body.bookid);
    console.log("book", dataa);
    let count = dataa.quantity
    console.log("quantity", count);


    duedate.setDate(date.getDate() + 30)
    const newRental = new rentals({
        userid: req.body.userid,
        bookid: req.body.bookid,
        date: date,
        duedate: duedate
    })
    newRental.save().then(data => {

        res.json({
            status: 200,
            msg: "Book added successfully",
            data: data,
        });
    })
        .catch(err => {
            console.error(err);
            res.json({
                status: 500,
                msg: "Error adding book",
                data: err,
            });
        })

        bookSchema.findByIdAndUpdate({ _id: req.body.bookid }, { quantity: (--count)}).exec()
        .then(data => {
            console.log(data);
            

        }).catch(err => {
            console.log(err);
           
        })
    }else{
        res.json({
            status: 500,
            msg: "User Already Assigned with this Book !",
        });
    }
};


const viewAllRentalss = async (req, res) => {
    let datas = await rentals.find({ status: "assigned" });
    await datas.map(x => {
        checkFine(x._id)
    })
    await rentals.find({ status: "assigned" }).populate('userid').populate('bookid')
        .then((books) => {
            res.status(200).json({
                message: "Books retrieved successfully",
                data: books,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Error retrieving books",
                data: err,
            });
        });
};

const viewAllRentalsByUserId = async (req, res) => {
    let datas = await rentals.find({userid:req.query.userid,status: "assigned" });
    await datas.map(x => {
        checkFine(x._id)
    })
    await rentals.find({userid:req.query.userid,status:"assigned" }).populate('userid').populate('bookid')
        .then((books) => {
            res.status(200).json({
                message: "Books retrieved successfully",
                data: books,
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                message: "Error retrieving books",
                data: err,
            });
        });
};

const checkFine = async (rentalid) => {
    console.log("check fine called");
    let currentDate = new Date()
    let dueDate = new Date()
    let fine = 0
    await rentals.findById({ _id: rentalid }).exec().then(dataa => {
        console.log(dataa.duedate);
        dueDate = dataa.duedate
    }).catch(err => {
        console.log(err);
    })
    console.log("curr", currentDate, dueDate);
    if (currentDate > dueDate) {
        const diffTime = Math.abs(currentDate - dueDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Difference in days
        fine = diffDays * 10; // Fine rate is Rs 10 per day
        console.log("diff", diffDays);
        console.log("fine", fine);

    }
    console.log("fine", fine);

    await rentals.findByIdAndUpdate({ _id: rentalid }, { fine: fine })

}
const deleteRentalById = (req, res) => {

    rentals.findByIdAndDelete({ _id: req.query.rentalid }).exec()
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
                data: err
            })
        })

}

const returnRentalBook = async (req, res) => {

    const data = await rentals.findById(req.query.rentalid);
    console.log(data);
    let bookid=data.bookid
    console.log("bookid",bookid);
    const dataa = await bookSchema.findById(bookid);
    console.log("book", dataa);
    let count = dataa.quantity
    console.log("quantity", count);
    rentals.findByIdAndUpdate({ _id: req.query.rentalid }, { status: 'returned' }).exec()
        .then(data => {
            console.log(data);
            res.json({
                status: 200,
                msg: "Data updated successfully",
                data: data
            })

        }).catch(err => {
            console.log(err);
            res.json({
                status: 500,
                msg: "No Data obtained",
                data: err
            })
        })

        bookSchema.findByIdAndUpdate({ _id: bookid }, { quantity: (++count)}).exec()
        .then(data => {
            console.log(data);
            

        }).catch(err => {
            console.log(err);
           
        })

}
const addreview =async (req, res) => {
    let rev=new reviews({
        bookid:req.body.bookid,
        userid:req.body.userid,
        review:req.body.review
    })
    rev.save().then(data => {

        res.json({
            status: 200,
            msg: "review added successfully",
            data: data,
        });
    })
        .catch(err => {
            console.error(err);
            res.json({
                status: 500,
                msg: "Error adding review",
                data: err,
            });
        })

}

const addNotifications =async (req, res) => {
    let datas=null
    await checkFine(req.query.rentalid)
    await rentals.findById(req.query.rentalid).exec().then(data=>{
        datas=data
    }).catch(err=>{
        console.log(err);
    })
    let not=new notifications({
        bookid:datas.bookid,
        userid:datas.userid,
        fine:datas.fine,
        duedate:datas.duedate
    })
    await not.save().then(data => {

        res.json({
            status: 200,
            msg: " added successfully",
            data: data,
        });
    })
        .catch(err => {
            console.error(err);
            res.json({
                status: 500,
                msg: "Error adding review",
                data: err,
            });
        })

}



const viewAllReviews = (req, res) => {
    reviews.find({}).populate('userid').populate('bookid')
      .then((books) => {
        res.json({
          status:200,
  
          message: "Books retrieved successfully",
          data: books,
        });
      })
      .catch((err) => {
        console.error(err);
        res.json({
          status:500,
          message: "Error retrieving books",
          data: err,
        });
      });
  };

  const viewNotificationByUserid = (req, res) => {

    notifications.find({userid:req.query.userid}).populate('bookid')
      .then((books) => {
        res.json({
          status:200,
  
          message: " retrieved successfully",
          data: books,
        });
      })
      .catch((err) => {
        console.error(err);
        res.json({
          status:500,
          message: "Error retrieving books",
          data: err,
        });
      });
  };

  const viewAllReviewsbyBookId = (req, res) => {
    reviews.find({bookid:req.query.id}).populate('userid').populate('bookid')
      .then((books) => {
        res.json({
          status:200,
  
          message: " retrieved successfully",
          data: books,
        });
      })
      .catch((err) => {
        console.error(err);
        res.json({
          status:500,
          message: "Error retrieving books",
          data: err,
        });
      });
  };

  const viewAllReviewsbyUserId = (req, res) => {
    reviews.find({userid:req.query.id}).populate('userid').populate('bookid')
      .then((books) => {
        res.json({
          status:200,
  
          message: " retrieved successfully",
          data: books,
        });
      })
      .catch((err) => {
        console.error(err);
        res.json({
          status:500,
          message: "Error retrieving books",
          data: err,
        });
      });
  };
module.exports = {
    assignBook,
    viewAllRentalss,
    returnRentalBook,
    deleteRentalById,
    viewAllRentalsByUserId,
    addreview,
    addNotifications,
    viewAllReviewsbyBookId,
    viewAllReviewsbyUserId,
    viewNotificationByUserid
}