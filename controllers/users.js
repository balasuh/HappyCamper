const User = require('../models/user');

module.exports.renderRegister = (req, res) => {
    res.render('users/register');
};


module.exports.registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        // console.log(registeredUser);
        req.login(registeredUser, err => {
            if (err) {
                return next(err);
            }
            req.flash('success', `Welcome to ${process.env.SITE_NAME}, ${username}!`);
            res.redirect('/campgrounds');
        });
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

module.exports.login = async (req, res) => {
    req.flash('success', `Welcome back, ${req.body.username}`)
    const redirectUrl = req.session.returnTo || '/campgrounds';
    // console.log(redirectUrl);
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Successfully logged out!');
    res.redirect('/campgrounds');
};


