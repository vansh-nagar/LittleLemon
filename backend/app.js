import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("helllo");
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email } = req.body;

    const arr = username.split(" ", 2);

    if (!arr[1]) {
      console.log("last name");
      return res.status(400).json({ message: "please enter last name" });
    }

    const searchedUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    console.log("searched user :", searchedUser);

    if (searchedUser) {
      return res.status(400).json({ message: "email already exists in db" });
    }

    if (!username || !email) {
      return res.status(400).json({ message: "All credentials are required" });
    }

    const createdUser = await prisma.user.create({
      data: {
        firstName: arr[0],
        lastName: arr[1],
        email,
      },
    });

    const token = await jwt.sign({ email }, `${process.env.JWT_STRING}`);

    console.log("created user :", createdUser);

    res.status(200).json({ message: "user created ", jwt: token });
  } catch (error) {
    res.status(101).json({ message: error.message });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/getUserDetails", async (req, res) => {
  try {
    const { token } = req.body;

    console.log("token :", token);

    if (!token) {
      res.status(400).json({ message: "invalid token" });
      console.log("invalid token");
      return;
    }

    const decodedToken = jwt.verify(token, process.env.JWT_STRING);

    if (!decodedToken.email) {
      return;
    }

    const userDetails = await prisma.user.findFirst({
      where: {
        email: decodedToken.email,
      },
    });

    res.status(200).json({ data: userDetails });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/saveProfileInfo", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    orderStatusNoti,
    specialOfferNoti,
    passwordChangeNoti,
    newsletterNoti,
    token,
  } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_STRING);
  } catch (err) {
    return res.status(401).json({ message: "Token verification failed" });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: decodedToken.email },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        orderStatusNoti,
        specialOfferNoti,
        passwordChangesNoti: passwordChangeNoti,
        NewsLetterNoti: newsletterNoti,
      },
    });
    res.status(200).json({ message: "Profile updated", data: updatedUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/Logout", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400).message("invalid token");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_STRING);
    if (!decodedToken) {
      return res.status(400);
    }

    await prisma.user.delete({
      where: {
        email: decodedToken.email,
      },
    });
  } catch (error) {
    console.log(err.message);
  }
});
app.listen(3000);
