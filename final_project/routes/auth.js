const express        = require("express");
const passportRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;
const passport = require('passport')
const ensureLogin = require("connect-ensure-login");


// Sign up

passportRouter.get("/signup", (req, res, next) => {
    res.render('signup');
  });
  
passportRouter.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username === "" || password === "") {
      res.render("/signup", { message: "You should have an username and password" });
      return;
    }
  
    User.findOne({ username })
    .then(user => {
      if (user !== null) {
        res.render("signup", { message: "The username already exists" });
        return;
      }
  
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
  
      const newUser = new User({
        username,
        password: hashPass
      });
  
      newUser.save((err) => {
        if (err) {
          res.render("signup", { message: "Something went wrong" });
        } else {
          res.redirect("/");
        }
      });
    })
    .catch(error => {
      next(error)
    })
  });
  
  
  passportRouter.get("/signup", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("private", { user: req.user });
  });
  
  
  // Log in
  
  passportRouter.get("/login", (req, res, next) => {
    res.render("login");
  });
  
  passportRouter.post("/login", passport.authenticate("local", {
    successRedirect: "/my-page",
    failureRedirect: "/login",
    failureFlash: false,
    passReqToCallback: false
  }));

  
  passportRouter.get("/my-page", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("private", { user: req.user });
  });
  
  module.exports = passportRouter;