const Listing = require("../models/listing.js")
const { cloudinary } = require("../cloudConfig.js")

module.exports.index = async (req, res) => {
  let allListings;
  
  // Check if there's a search query for location
  const searchLocation = req.query.location;
  
  if (searchLocation && searchLocation.trim() !== "") {
    // Search listings by location (case-insensitive)
    allListings = await Listing.find({
      location: { $regex: searchLocation, $options: "i" }
    });
  } else {
    // Get all listings if no search
    allListings = await Listing.find({});
  }
  
  // add a resized image URL for each listing to use in templates
  for (let listing of allListings) {
    if (listing.image && listing.image.url) {
      listing.originalImageUrl = listing.image.url.replace("/upload", "/upload/h_200,w_250");
    }
  }
  res.render("listings/index.ejs", { allListings })
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  // provide a resized Cloudinary URL for the view
  if (listing.image && listing.image.url) {
    listing.originalImageUrl = listing.image.url.replace("/upload", "/upload/h_400,w_600");
  }
  res.render("listings/show.ejs", { listing });
};


module.exports.createListing = async (req, res) => {
  // let {title, Description, image, price,  location , country} = req.body;
  let url = req.file.path;
  let filename = req.file.filename;
  let listing = req.body.listing; // form ke inputs listing naam ke object ke andar aaye
  const newListing = Listing(listing);  // create a new list
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();   // save to db
  req.flash("success", "New Listing Created");
  res.redirect("/listings")
}

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings")
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_200,w_250")
  res.render("listings/edit.ejs", { listing , originalImageUrl})
};


module.exports.updateListing = async (req, res) => {

  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });  // deconstruct each value from the object (listing)

  if (typeof req.file !== "undefined") {
    // delete previous image from Cloudinary (if present)
    if (listing.image && listing.image.filename) {
      try {
        await cloudinary.uploader.destroy(listing.image.filename);
      } catch (e) {
        console.error("Failed to delete old image from Cloudinary:", e);
      }
    }
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", " Listing Deleted");
  res.redirect("/listings")
};