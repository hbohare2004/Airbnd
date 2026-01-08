const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js")


module.exports.createReview = async (req, res) => {
  let {id} = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review); // backend ke andar review naam ka object aayega jo form se aayega
  newReview.author = req.user._id; // to store user id
  listing.reviews.push(newReview); // push the new review's id into listing's reviews array
  await newReview.save(); // save the new review
  await listing.save(); // save the listing with the new review added
  req.flash("success", "New review Created");
  res.redirect(`/listings/${id}`);
};



module.exports.destroyReview = async (req, res) => {
  let { id , reviewId}  = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", " Review Deleted");
  res.redirect(`/listings/${id}`);
};