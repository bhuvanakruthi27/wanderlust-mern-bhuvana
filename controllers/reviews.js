const Review=require("../models/reviews.js");
const Listing=require("../models/listing.js");

module.exports.postReview=async (req,res)=>{
    let{id}=req.params;
    let listing=await Listing.findById(id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);

   
    newReview.save();
    listing.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${id}`);
}
module.exports.destroyReview=async(req,res)=>{
        let {id,reviewId}=req.params;

        await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
        await Review.findByIdAndDelete(reviewId);

        req.flash("success","Review deleted!");
        res.redirect(`/listings/${id}`);
}