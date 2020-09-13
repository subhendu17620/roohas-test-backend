const { firebase } = require("../../fbConfig");
const admin = require("firebase-admin");
const Users = require("../../userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { roll, password } = req.body;
    const existUser = await Users.findOne({ roll: roll });
    if (existUser)
      return res
        .status(400)
        .json({ message: "Account with this roll already exist." });

    var myId = mongoose.Types.ObjectId();
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new Users({
      _id: myId,
      roll: roll,
      password: passwordHash,
    });
    await newUser.save();

    admin
      .auth()
      .createCustomToken(`${myId}`, {})
      .then(async (customToken) => {
        // console.log(`${uid}`);
        // try {
        //   await firebase.auth().signInWithCustomToken(customToken);
        //   res.json({ message: "Success Login", token: customToken });
        // } catch (error) {
        //   return res.status(500).json({ message: error.message });
        // }
        res.status(200).json({ token: customToken });
      })
      .catch(function (error) {
        res.status(500).json({ message: error.message });
      });
    // res.json({ message: "Signup success. " });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { roll, password } = req.body;
    const user = await Users.findOne({ roll: roll });
    if (!user) return res.status(400).json({ message: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password." });
    let uid = user._id;

    admin
      .auth()
      .createCustomToken(`${uid}`, {})
      .then(async (customToken) => {
        // try {
        //   await firebase.auth().signInWithCustomToken(customToken);
        //   res.json({ message: "Success Login", token: customToken });
        // } catch (error) {
        //   return res.status(500).json({ message: error.message });
        // }
        res.status(200).json({ token: customToken });
      })
      .catch(function (error) {
        return res.status(500).json({ message: error.message });
      });
    // res.json({ token: token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.verify = async (req, res) => {
  const token = await req.header("Authorization").replace("Bearer", "").trim();

  admin
    .auth()
    .verifyIdToken(token)
    .then(function (decodedToken) {
      let uid = decodedToken.uid;
      res.json({ message: "verified", uid: uid });
    })
    .catch(function (error) {
      res.status(500).json({ message: error.message });
      //Handle error
    });
};
