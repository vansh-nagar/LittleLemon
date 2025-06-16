import express, { json } from "express";
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

    const token = await jwt.sign(
      { id: createdUser.id },
      `${process.env.JWT_STRING}`
    );

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

    if (!decodedToken.id) {
      return;
    }

    const userDetails = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
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
      where: { id: decodedToken.id },
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
        id: decodedToken.id,
      },
    });
  } catch (error) {
    console.log(err.message);
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/getMenu", async (req, res) => {
  const filter = req.body.filter || "All";
  const { input } = req.body;

  try {
    if (!input) {
      let menuItems;
      if (filter === "All") {
        menuItems = await prisma.menuItem.findMany();
      } else {
        menuItems = await prisma.menuItem.findMany({
          where: {
            title: filter,
          },
        });
        console.log("hello");
      }
      res.status(200).json({ data: menuItems });
    } else {
      const menuItems = await prisma.menuItem.findMany({
        where: {
          name: {
            contains: input,
            mode: "insensitive",
          },
        },
      });
      console.log("hi:", menuItems);

      res.status(200).json({ data: menuItems });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/////////////////////////////////////////////
app.post("/AddToCart", async (req, res) => {
  try {
    const { item, data } = req.body;

    const decodedToken = jwt.verify(data, process.env.JWT_STRING);
    console.log(decodedToken.id, item.id);

    const itemAdded = await prisma.cartItem.create({
      data: {
        quantity: 1,
        menuItemId: item.id,
        UserId: decodedToken.id,
      },
    });

    res.status(200).json({ message: itemAdded });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
});
/////////////////////////////////////////////////////////
app.post("/getCart", async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);

    const decodedToken = jwt.verify(token, process.env.JWT_STRING);
    console.log(decodedToken.id);

    const data = await prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      include: {
        cart: {
          include: {
            menuItem: true,
          },
        },
      },
    });

    res.status(200).json({
      message: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/////////////////////////////////////////////////////////////////
app.post("/CartCount", async (req, res) => {
  try {
    console.log("call");
    const { token } = req.body;
    const decodedToken = jwt.verify(token, process.env.JWT_STRING);

    const data = await prisma.cartItem.findMany({
      where: {
        UserId: decodedToken.id,
      },
    });

    console.log(data);

    let CartCount = 0;
    data.forEach((ele) => {
      console.log(ele.quantity);
      CartCount += ele.quantity;
    });

    console.log(CartCount);

    res.status(200).json({ message: CartCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//////////////////////////////////////////////////////////////////////////////////
app.post("/IncreaseQuant", async (req, res) => {
  try {
    const { data, token } = req.body;

    if (!data) {
      return res.status(400).json({ message: "decrement data is undefined" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_STRING);

    if (decodedToken.id !== data.userId) {
      return res.status(400).json({ message: "invalid Id" });
    }

    const updatedData = await prisma.cartItem.update({
      where: {
        id: data.ItemId,
      },
      data: {
        quantity: { increment: 1 },
      },
    });

    console.log(updatedData);

    console.log(data, decodedToken);

    res.status(200).json({
      message: updatedData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/////////////////////////////////////////////////////////////////////
app.post("/DecreaseQuant", async (req, res) => {
  try {
    const { data, token } = req.body;

    if (!data) {
      return res.status(400).json({ message: "decrement data is undefined" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_STRING);

    if (decodedToken.id !== data.userId) {
      return res.status(400).json({ message: "invalid Id" });
    }

    const updatedData = await prisma.cartItem.update({
      where: {
        id: data.ItemId,
      },
      data: {
        quantity: { decrement: 1 },
      },
    });

    console.log("Updated Data ", updatedData);
    if (updatedData.quantity === 0) {
      const deletedItem = await prisma.cartItem.delete({
        where: {
          id: data.ItemId,
        },
      });

      console.log("Deleted Item:", deletedItem);
    }

    console.log(data, decodedToken);
    res.status(200).json({
      message: updatedData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.listen(3000);
