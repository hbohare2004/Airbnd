if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path  = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js")

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const dbUrl = process.env.ATLASDB_URL;

if (!dbUrl) {
  console.error("ERROR: ATLASDB_URL is not set in .env file");
  process.exit(1);
}

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("DB Connection Error:", err);
    process.exit(1);
  });

async function main() {
  await mongoose.connect(dbUrl, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Create session store with compatibility across connect-mongo versions
let store;
const createStoreFn = MongoStore && (MongoStore.create || (MongoStore.default && MongoStore.default.create));
if (typeof createStoreFn === 'function') {
  store = createStoreFn({
    mongoUrl: dbUrl,
    crypto: { secret: process.env.SECRET },
    touchAfter: 24 * 60 * 60 // 24 hours
  });
} else if (typeof MongoStore === 'function') {
  // Older connect-mongo exported a constructor
  try {
    store = new MongoStore({ mongoUrl: dbUrl });
  } catch (e) {
    console.error('Failed to create session store with constructor fallback:', e);
    store = null;
  }
} else {
  console.error('Unsupported connect-mongo import shape; session store not configured.');
  store = null;
}

if (store) {
  store.on("error", (err) => {
    console.log("SESSION STORE ERROR", err);
  });
}

const sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}


app.use(session(sessionOption));
app.use(flash());
 
app.use(passport.initialize());
app.use(passport.session()); //
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


app.get("/demouser", async(req, res) => {
  let fakeUser = new User({
    email : "student@gmail.com",
    username: "harsh007"
  })
  let registeredUser = await User.register(fakeUser,"helloworld");
  res.send(registeredUser);
})


app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let {statusCode = 500, message = "Something went wrong"} = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", {message});
    
});

app.listen(8080, () => {
    console.log("server is listening to 8080");
})   