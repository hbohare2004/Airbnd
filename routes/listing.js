const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn , isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }) // all the file are save in upload folder


// index and create route are here
router.route("/")
.get( wrapAsync(listingController.index))

.post( isLoggedIn, upload.single('listing[image][url]'), validateListing, wrapAsync (listingController.createListing));



//New route 
router.get("/new", isLoggedIn, listingController.renderNewForm);



// show , update, delete are here
router.route("/:id")
.get(wrapAsync(listingController.showListing))

.put(isLoggedIn, upload.single('listing[image][url]'), isOwner,validateListing, wrapAsync(listingController.updateListing))  // update route

.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));




// Edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;