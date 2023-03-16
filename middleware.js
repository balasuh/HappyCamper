const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Campground = require('./models/campground');
const Review = require('./models/review');
const { ObjectId } = require('mongodb');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'You must be logged in first!')
        return res.redirect('/login');
    }
    next();
}

module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
        req.flash('error', 'Your URL was tampered. Check your Links!');
        return res.redirect('/campgrounds');
    }
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash('error', 'Cannot Find That Campground!');
        return res.redirect('/campgrounds');
    }
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to do that!')
        return res.redirect(`/campgrounds/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    // console.log('In validateReview'); - Debug Code
    if (error) {
        // console.log(error); - Debug Code
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { campId, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review) {
        req.flash('error', 'Cannot Find That Review!');
        return res.redirect(`/campgrounds/${campId}`);
    }
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You are not authorized to do that!')
        return res.redirect(`/campgrounds/${campId}`);
    }
    next();
}