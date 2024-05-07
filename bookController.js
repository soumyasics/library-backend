const rentalSchema = require('../Rentals/rentalSchema');
const Book = require('./bookSchema');
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
const addBook = (req, res) => {
  let quan=parseInt(req.body.quantity)
  const book = new Book({
    bookname: req.body.bookname,
    pubdate: req.body.pubdate,
    synopsis: req.body.synopsis,
    authorname: req.body.authorname,
    image: req.file,
    category:req.body.category,
    quantity: quan,
    imgUrl:`http://hybrid.srishticampus.in:4010/${req.file.filename}`

  });

  book.save().then(data => {

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
};

const viewAllBooks = (req, res) => {
  Book.find({})
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
const viewBooksforUser = (req, res) => {
  Book.find({ quantity: { $gt: 0 } })
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
// view cust by id
const viewBookById = (req, res) => {
  Book.findById({ _id: req.query.bookid }).exec()
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
        data: err
      })
    })

}

const deleteBookById =async (req, res) => {
let isRemovable=true
await rentalSchema.find({bookid:req.query.bookid}).then(datas=>{
datas.map(x=>{
  if(x.status=='assigned')
  isRemovable=false
})
}).catch(err=>{
  console.log(err);
})
if(isRemovable){
  await Book.findByIdAndDelete({ _id: req.query.bookid }).exec()
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
  else{
    res.json({
      status: 405,
      msg: "Book is already assigned to a User ! Removal Operation Denied .",
    })
  }

}

const searchBookByName = (req, res) => {
  const bname = req.query.name;

  Book.find({ bookname: { $regex: new RegExp(bname, "i") } })
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

        message: "Error retrieving books",
        data: err,
      });
    });
};

const searchBookByCategory = (req, res) => {
  const category = req.query.category;

  Book.find({ category: { $regex: new RegExp(category, "i") }  })
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

module.exports = {
  addBook,
  viewAllBooks,
  viewBooksforUser,
  deleteBookById,
  viewBookById,
  upload,
  searchBookByName,
  searchBookByCategory,
};

