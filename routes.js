const router=require('express').Router()
const user=require('./User/userController')
const book=require('./Books/bookController')
const chats=require('./Chats/chatController')
const admin=require('./Admin/adminController')
const rentals=require('./Rentals/rentalController')


router.post('/registerUser',user.upload,user.registerUser)
router.post('/viewUserById',user.viewUserById)
router.post('/editUserById',user.upload,user.editUserById)
router.post('/loginUser',user.loginUser)
router.post('/forgotPwd',user.forgotPwd)
router.post('/viewUsers',user.viewUsers)
router.post('/deleteUserById',user.deleteUserById)
router.post('/resetPwd',user.resetPwd)

router.post('/addBook',book.upload,book.addBook)
router.post('/viewBookById',book.viewBookById)
router.post('/viewAllBooks',book.viewAllBooks)
router.post('/viewAllBooksforUser',book.viewBooksforUser)
router.post('/searchBookByCategory',book.searchBookByCategory)
router.post('/searchBookByName',book.searchBookByName)
router.post('/deleteBookById',book.deleteBookById)

router.post('/sendMsg',chats.sendMsg)
router.post('/viewChatforUserById',chats.viewChatforUserById)
router.post('/viewchatrecepientsforAdmin',chats.viewchatrecepientsforAdmin)

router.post('/addAdminDetails',admin.upload,admin.addAdminDetails)
router.post('/editAdmindata',admin.upload,admin.editAdmindata)
router.post('/viewAdminDetails',admin.viewAdminDetails)
router.post('/resetPwdAdmin',admin.resetPwd)
router.post('/loginAdmin',admin.loginAdmin)

router.post('/assignBook',rentals.assignBook)
router.post('/viewAllRentalss',rentals.viewAllRentalss)
router.post('/returnRentalBook',rentals.returnRentalBook)
router.post('/viewAllRentalsByUserId',rentals.viewAllRentalsByUserId)
router.post('/deleteRentalById',rentals.deleteRentalById)
router.post('/addreview',rentals.addreview)
router.post('/viewAllReviewsbyBookId',rentals.viewAllReviewsbyBookId)
router.post('/viewAllReviewsbyUserId',rentals.viewAllReviewsbyUserId)

router.post('/addNotifications',rentals.addNotifications)
router.post('/viewNotificationByUserid',rentals.viewNotificationByUserid)

module.exports=router