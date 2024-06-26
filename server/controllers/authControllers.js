const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const User = require("../models/UserModels.js");
const db = require("../database/index.js");
const { JWT_SECRET } = require("../../config");
const { where } = require("sequelize");

async function login(req, res) {
  const { username,email,password } = req.body;

  try {
    //user
    const user = await db.User.findOne({ where: { username } });
    //seller
    const seller = await db.Seller.findOne({ where: { username } });
    //admin
    const admin= await db.admin.findOne({where:{username}})
    console.log(user,admin,seller);
    //user
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token, user });
    } else if (seller) {
      const PasswordisValid = await bcrypt.compare(
        password,

        seller.password
      );
      if (!PasswordisValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
      const tokenSeller = jwt.sign(
        { sellerId: seller.id, role: seller.role },
        JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ tokenSeller, seller });
    }else if (admin){
     const validpassword= await bcrypt.compare(password,admin.password)
    //  if(!validpassword){
    //   return res.status(401).json({message :"invalid password"})
    //  }
     const tokenadmin= jwt.sign(
      {adminId:admin.id,role:admin.role},
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
     )
     return res.status(200).json({tokenadmin,admin})
    }
     else {
      return res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error" });
  }
}

async function register(req, res) {
  const { username, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === "user") {
      const user = await db.User.create({
        username,
        email,
        password: hashedPassword,
        role: "user",
      });
    }
   else if(role==="admin") {
  const admin= await db.admin.create({
    username,
    email,
    password:hashedPassword,
    role: "admin"
  })
    }
     else {
      const seller = await db.Seller.create({
        username,
        email,
        password: hashedPassword,
        role: "seller",
      });
    }

    return res.status(201).json({ message: "created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "error" });
  }
}

module.exports = { login, register };
