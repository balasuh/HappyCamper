if (process.env.NODE_ENV !== "prod") {
    require('dotenv').config();
}
// const dbUrl = 'mongodb://127.0.0.1:27017/happy-camp'; //dev
const dbUrl = process.env.DB_URL; //prod
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');
const ObjectId = mongoose.Types.ObjectId;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { MongoClient } = require('mongodb');
const client = new MongoClient(`${dbUrl}`, { useUnifiedTopology: true });
// const session = require('cookie-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const mongoSanitize = require('express-mongo-sanitize');

const usersRoutes = require('./routes/users')
const campgroundsRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');
const helmet = require('helmet');


// ** Connecting to MongoDB via Mongoose **

main().catch(err => console.log('Mongo connection error', err));

const Campground = require('./models/campground');
// const { render } = require('ejs');

async function main() {
    await mongoose.connect(`${dbUrl}`);
    console.log('Connection to Main MongoDB open');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// ** Connecting to MongoDB via Mongoose **

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.use(express.json())

app.use(express.urlencoded({ extended: true })); //parse req.body into JS format
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(mongoSanitize());
// app.use(helmet());

async function connectToSessionDB() {
    try {
        // Connect to the MongoDB database
        await client.connect();
        console.log('Connection to Session MongoDB open');
        const store = await new MongoStore({
            client: client,
            ddName: 'happy-camp',
            secret: process.env.SESSION_KEY,
            touchAfter: 24 * 60 * 60
        })
        store.on("error", function (e) {
            console.log("Session Store error:", e);
        })
        const sessionConfig = {
            store: store,
            name: '_rayman',
            secret: process.env.SESSION_KEY,
            resave: false,
            saveUninitialized: true, //you'll learn why we do this later
            cookie: {
                httpOnly: true, //Basic security feature
                // secure: true, // for prod with https certificate only
                expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // one week
                maxAge: 1000 * 60 * 60 * 24 * 7 // one week
            }
        }
        app.use(session(sessionConfig))
    } catch (error) {
        console.error('Failed to connect to the database:', error);
    }
}
connectToSessionDB();
app.use(flash());

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/dfnajwnp3/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
    "https://res.cloudinary.com/dfnajwnp3/",
];
const connectSrcUrls = [
    "https://*.tiles.mapbox.com",
    "https://api.mapbox.com",
    "https://events.mapbox.com",
    "https://res.cloudinary.com/dfnajwnp3/"
];
const fontSrcUrls = ["https://res.cloudinary.com/dfnajwnp3/"];

app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dfnajwnp3/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
                "https://images.unsplash.com/",
                "https://www.pexels.com/"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
            mediaSrc: ["https://res.cloudinary.com/dfnajwnp3/"],
            childSrc: ["blob:"]
        }
    })
);



// Use the below code for express-session
//


// Use the below code for cookie-session

// const sessionConfig = {
//     name: 'session',
//     keys: ['thisshouldbeabettersecret!'],

//     // Cookie Options
//     httpOnly: true, //Basic security feature
//     expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // one week
//     maxAge: 1000 * 60 * 60 * 24 * 7 // one week
// }



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    if (!['/login', '/', '/javascripts/validateForms.js', '/stylesheets/stars.css', '/javascripts/showPageMap.js',
        '/javascripts/clusterMap.js', '/stylesheets/home.css', '/images/home_bg.jpg', '/images/login_top.jpg',
        '/register', '/stylesheets/app.css'].includes(req.originalUrl)) {
        req.session.returnTo = req.originalUrl;
    }
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success'); //Set this before your route Handlers!
    res.locals.error = req.flash('error');
    res.locals.warning = req.flash('warning');
    // console.log(req.query);
    next();
})

app.use('/', usersRoutes);
app.use('/campgrounds', campgroundsRoutes);
app.use('/campgrounds/:campId/reviews', reviewsRoutes);


// app.get('/fakeUser', async (req, res) => {
//     const user = new User({
//         email: "fake2@fake.com",
//         username: 'fakeuser2'
//     });
//     const newUser = await User.register(user, 'fake');
//     res.send(newUser);
// })

app.get('/', (req, res) => {
    res.render('home');
})

// app.get('/makecampground', async (req, res) => {
//     const camp = new Campground({ title: 'My Backyard', description: 'Cheap camping.' });
//     await camp.save();
//     res.send(camp);
// })

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh boy, something went wrong!';
    res.status(statusCode).render('error', { err });
})

app.listen(3000, () => {
    console.log('HappyCamper: Listening on Port 3000');
})