const Review = require('../models/review');
const Campground = require('../models/campground');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports.createReview = async (req, res, next) => {
    const { campId } = req.params;
    const campground = await Campground.findById(campId);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Successfully Posted Review')
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteReview = async (req, res, next) => {
    const { campId, reviewId } = req.params;
    const reviewObjectId = new ObjectId(reviewId);
    const camp = await Campground.findByIdAndUpdate(campId, { $pull: { reviews: reviewObjectId } }, { new: true });
    console.log(camp);
    const review = await Review.findByIdAndDelete(reviewId);
    req.flash('warning', 'Review Deleted')
    res.redirect(`/campgrounds/${campId}`);
};