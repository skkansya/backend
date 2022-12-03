const dotenv = require("dotenv");

dotenv.config();
const path = require("path");
const express = require("express");
const cors = require("cors");
require("./model/config");
const User = require("./model/User");
const Product = require("./model/Product");
const Cart = require("./model/Cart");
const Other = require("./model/Other");
const Consignment = require("./model/Consignment");
const Comment = require("./model/Comment");
const Invoice = require("./model/Invoice");
const Photo = require("./model/Photo");
const Media = require("./model/Media");
const Address = require("./model/Address");
const Order = require("./model/Order");
const Review = require("./model/Review");
const Specification = require("./model/Specification");
const Stock = require("./model/Stock");
const Supplier = require("./model/Supplier");
const Quotation = require("./model/Quotation");
const PurchaseInvoice = require("./model/PurchaseInvoice");
const Area = require("./model/Area");
const BackOrder = require("./model/BackOrder");
const Vehicle = require("./model/Vehicle");
const PinCode = require("./model/PinCode");
const Deliveryman = require("./model/Deliveryman");
const Variation = require("./model/Variation");
const Wishlist = require("./model/Wishlist");
const Jwt = require("jsonwebtoken");
const jwtKey = process.env.ACCESS_TOKEN_SECRET;
const app = express();
const bcrypt= require("bcryptjs")
// app.options('*', cors());
app.use(cors());

app.use(express.json());
const bodyParser = require("body-parser");
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb', parameterLimit:50000 }));

// app.use(express.bodyParser());
// app.use(express.limit('4Mb'));
// app.use(express.urlencoded({ extended: false, limit: '2gb' }));

app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "./client/build")));

const PORT = process.env.PORT || 5000;
//------------a new method----------
//
app.use(express.json({ limit: "10mb", extended: true }));
app.use(
  express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
);
const Item = require("./model/Item");



app.post("/api/item", async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.send("Hello");
  }
});

//------------method end-----------

//---------------------------------CREATING AND PUSHING NEW DATA IN VARIOUS COLLECTION--------------------------------
app.post("/api/test", verifyToken, async (req, resp) => {
  //add area
  resp.send(req.body);
});

app.post("/api/area", async (req, resp) => {
  //add area
  let area = new Area(req.body);
  let result = await area.save();
  resp.send(result);
});

app.post("/api/register/:id", async (req, resp) => {
  //registering a new user
  try {
    // req.body.password =await bcrypt.hashSync(req.body.password, 9)
    let sponsor = await User.findById(req.params.id);
    let user = new User(req.body);
    let result = await user.save();
    sponsor.refrences.push(result);
    result = result.toObject();
    delete result.password;
    Jwt.sign(
      { result },
      jwtKey,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME },
      (err, token) => {
        if (err) {
          resp.status(401).send({
            result: "Something went wrong, Please try after some time.",
          });
        }
        resp.send({ result, auth: token });
      }
    );
  } catch {
    resp.status(422).send({ message: "Mobile Number or email already exist" });
  }
});

app.post("/api/register/supplier", async (req, resp) => {
  //registering a new Supplier
  let supplier = new Supplier(req.body);
  let result = await supplier.save();
  result = result.toObject();
  resp.send({ result });
});

app.post("/api/register/deliveryman/:id", async (req, resp) => {
  //registering a new deliveryman
  try {
    let area = await Area.findById(req.params.id);
    let deliveryman = new Deliveryman(req.body);
    let result = await deliveryman.save();
    area.deliverymans.push(result);
    area.save();
    resp.send(area.name + " " + result.owner);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/add-product", async (req, resp) => {
  //add product
  let product = new Product(req.body);
  let result = await product.save();

  resp.send(result);
});

//------------------------------------------Photos and media-----------------------------
app.post("/api/mediap/:key/", async (req, resp) => {
  //pushing a new media in product/variation/user
  try {
    let product = await Product.findById(req.params.key);
    let media = new Media(req.body);
    let result = await media.save();
    product.medias.push(result);
    product.save();
    resp.send(product.company + " " + product.name + " " + result.type);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/mediav/:key/", async (req, resp) => {
  //pushing a new media in product/variation/user
  try {
    let variation = await Variation.findById(req.params.key);
    let media = new Media(req.body);
    let result = await media.save();
    variation.medias.push(result);
    variation.save();
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/mediar/:key/", async (req, resp) => {
  //pushing a new media in product/variation/user
  try {
    let review = await Review.findById(req.params.key);
    let media = new Media(req.body);
    let result = await media.save();
    review.medias.push(result);
    review.save();
    resp.send(review.aReview + " " + result.type);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/photou/:key/", async (req, resp) => {
  //pushing a new photo in user profile

  // try {
  let user = await User.findById(req.params.key);
  let photo = new Photo(req.body);
  let result = await photo.save();
  user.photos.push(result);
  user.save();
  resp.send(result);
  // } catch (error) {
  //   resp.status(403).send("No record found");
  // }
});

app.post("/api/photoa/:key/", async (req, resp) => {
  //pushing a new photo in user profile

  try {
    let address = await Address.findById(req.params.key);
    let photo = new Photo(req.body);
    let result = await photo.save();
    address.photos.push(result);
    address.save();
    resp.send(address.laneVillage + " " + result.type);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/item", async (req, res) => {
  const item = new Item(req.body);
  try {
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.send("Hello");
  }
});

app.post("/api/photos/:key/", async (req, resp) => {
  //pushing a new photo in address and address
  try {
    let user = await User.findById(req.params.id);
    let useraddress = user.Address;
    let photo = new Photo(req.body);
    let result = await photo.save();
    useraddress.photos.push(result);
    useraddress.save();
    resp.send(user.name + " " + result.type);
  } catch (error) {
    try {
      let address = await Address.findById(req.params.key);
      let photo = new Photo(req.body);
      let result = await photo.save();
      address.photos.push(result);
      address.save();
      resp.send(address.laneVillage + " " + result.type);
    } catch (error) {
      resp.status(403).send("No record found");
    }
  }
});

//----------------------------------------photo media ended-------------------------------
app.post("/api/reviews/:key/:id/", async (req, resp) => {
  //pushing a new review in user and product
  try {
    let user = await User.findById(req.params.id);
    let product = await Product.findById(req.params.key);
    let review = new Review(req.body);
    let result = await review.save();
    user.reviews.push(result);
    user.save();
    product.reviews.push(result);
    product.save();
    resp.send(
      user.name +
        " " +
        product.company +
        " " +
        product.name +
        " " +
        result.aReview
    );
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/variations/:key/", async (req, resp) => {
  //pushing a new variation in product
  try {
    let product = await Product.findById(req.params.key);
    let variation = new Variation(req.body);
    let result = await variation.save();
    product.variations.push(result);
    product.save();
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/specifications/:key/", async (req, resp) => {
  //pushing a new specification in variation
  try {
    let variation = await Variation.findById(req.params.key);
    let specification = new Specification(req.body);
    let result = await specification.save();
    variation.specifications.push(result);
    variation.save();
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/stocks/:key/", async (req, resp) => {
  //pushing a new stock in variation
  try {
    let variation = await Variation.findById(req.params.key);
    let stock = new Stock(req.body);
    let result = await stock.save();
    variation.stocks.push(result);
    variation.save();
    resp.send(variation.size + " " + result.type);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/comments/:key/:id/", async (req, resp) => {
  //pushing a new comment in user and variation
  try {
    let user = await User.findById(req.params.id);
    let product = await Variation.findById(req.params.key);
    let comment = new Comment(req.body);
    let result = await comment.save();
    user.comments.push(result);
    user.save();
    product.comments.push(result);
    product.save();
    resp.send(user.name + product + result.aComment);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/address/:id/", async (req, resp) => {
  //pushing a new address in user
  try {
    let user = await User.findById(req.params.id);
    let address = new Address(req.body);
    let result = await address.save();
    user.addresss.push(result);
    user.save();
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/wishlists/:id/", async (req, resp) => {
  //pushing a new wishlist in user
  try {
    let user = await User.findById(req.params.id);
    let wishlist = new Wishlist(req.body);
    let result = await wishlist.save();
    user.wishlists.push(result);
    user.save();
    resp.send(user.name + " " + result.laneVillage);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/carts/:id/", async (req, resp) => {
  //pushing a new cart in user
  try {
    let user = await User.findById(req.params.id);
    let cart = new Cart(req.body);
    let result = await cart.save();
    user.carts.push(result);
    user.save();
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/backorders/:id/", async (req, resp) => {
  //pushing a new backorder for area
  try {
    let area = await Area.findById(req.params.id);
    let backOrder = new BackOrder(req.body);
    let result = await backOrder.save();
    area.backorders.push(result);
    area.save();
    resp.send(area.name + " " + result.name);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/quotations/:id/", async (req, resp) => {
  //pushing a new quotation by supplier
  try {
    let supplier = await Supplier.findById(req.params.id);
    let quotation = new Quotation(req.body);
    let result = await quotation.save();
    supplier.quotations.push(result);
    supplier.save();
    resp.send(supplier.firmName + " " + result.name);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/purchaseinvoice/:id/", async (req, resp) => {
  //pushing a new purchaseinvoice by supplier or by marketer
  try {
    let supplier = await Supplier.findById(req.params.id);
    let purchaseInvoice = new PurchaseInvoice(req.body);
    let result = await purchaseInvoice.save();
    supplier.purchaseInvoices.push(result);
    supplier.save();
    resp.send(supplier.firmName + " " + result.name);
  } catch (error) {
    try {
      let marketer = await User.findById(req.params.id);
      let purchaseInvoice = new PurchaseInvoice(req.body);
      let result = await purchaseInvoice.save();
      marketer.purchaseInvoices.push(result);
      marketer.save();
      resp.send(marketer.name + " " + result.name);
    } catch (error) {
      resp.status(403).send("No record found");
    }
  }
});

app.post("/api/vehicle/:id/", async (req, resp) => {
  //pushing a new vehicles for area
  try {
    let area = await Area.findById(req.params.id);
    let vehicle = new Vehicle(req.body);
    let result = await vehicle.save();
    area.vehicles.push(result);
    area.save();
    resp.send(area.name + " " + result.modelName);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/pincode/:id/", async (req, resp) => {
  //pushing a new vehicles for area
  try {
    let area = await Area.findById(req.params.id);
    let pinCode = new PinCode(req.body);
    let result = await pinCode.save();
    area.pinCodes.push(result);
    area.save();
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/order/:id", async (req, resp) => {
  //pushing a new order in user
  try {
    let invoice = await Invoice.findById(req.params.id);
    let order = new Order(req.body);
    let result = await order.save();
    invoice.orders.push(result);
    invoice.save();
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/invoice/:id/", async (req, resp) => {
  //pushing a new invoice in user
  try {
    let user = await User.findById(req.params.id);
    let invoice = new Invoice(req.body);
    let result = await invoice.save();
    user.invoices.push(result);
    user.save();
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.post("/api/Consignment/:id/", async (req, resp) => {
  //pushing a new invoice in user
  try {
    let deliveryman = await Deliveryman.findById(req.params.id);
    let consignment = new Consignment(req.body);
    let result = await consignment.save();
    deliveryman.consignments.push(result);
    deliveryman.save();
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});
//------------------------------------------READING DATA FROM THE VARIOUS FIELDS------------------------------
app.post("/api/login", async (req, resp) => {
  //login
  console.log(req.body);
  // if (req.body.password && req.body.email) {
    let user = await User.findOne({
      email: req.body.email,
    })
      .populate({ path: "addresss" });
      resp.send(user.password)
  //   let key = await User.findOne(req.body, {
  //     areaCode: 1,
  //     type: 1,
  //     sponsor: 1,
  //     userId: 1,
  //     name: 1,
  //     Gender: 1,
  //     mobileNumber: 1,
  //     altMobileNumber: 1,
  //     email: 1,
  //     mlm: 1,
  //   })
  //   if (user) {
  //     Jwt.sign(
  //       { key },
  //       jwtKey,
  //       // { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME },
  //       (err, token) => {
  //         if (err) {
  //           resp.send({
  //             result: "Something went wrong, Please try after some time.",
  //           });
  //         }
  //         resp.send({ user, auth: token });
  //       }
  //     );
  //   } else {
  //     resp.send({ result: "None User Found" });
  //   }
  // } else {
  //   resp.send({ result: "No User Found" });
  // }
});

app.get("/api/profile/:id", async (req, resp) => {
  //sending detail of one user
  try {
    let result = await User.findById(req.params.id)
      .select("-password")
      .populate({ path: "addresss" });
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/refrence/:id", async (req, resp) => {
  //sending detail of one user
  // try {
  let result = await User.findOne({
    mobileNumber: req.params.id,
  }).select("-password");
  resp.send(result);
  // } catch (error) {
  //   resp.status(403).send("No record found");
  // }
});

app.get("/api/pincodes/:key", async (req, resp) => {
  //sending detail of area pincodes
  let result = await PinCode.find({
    areaCode: req.params.key,
  });
  resp.send(result);
});

app.get("/api/pincodepin/:key", async (req, resp) => {
  const numbers = req.params.key;
  const numberf = parseInt(req.params.key);
  let result = await PinCode.find({
    number: numberf,
  });
  console.log(numbers);
  resp.send(result);
});

app.get("/api/variations/:key", async (req, resp) => {
  //sending detail of product variations
  let result = await Variation.find({
    productId: req.params.key,
  }).populate({ path: "specifications" });
  resp.send(result);
});

app.get("/api/listing/:id", async (req, resp) => {
  //sending detail of one user
  try {
    let result = await User.findById(req.params.id)
      .populate({ path: "carts" })
      .populate({ path: "wishlists" })
      .populate({ path: "invoices" })
      .populate({ path: "addresss" });
    result = result.toObject();
    delete result.password;
    delete result.email;
    delete result.Gender;
    delete result.mobileNumber;
    delete result.altMobileNumber;
    delete result.aadharNumber;
    delete result.panNumber;
    delete result.accountNo;
    delete result.ifscCode;
    delete result.accountType;
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/item", async (req, res) => {
  console.log("get items");
  try {
    const item = await Photo.find();
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/api/cart/:id", async (req, resp) => {
  //sending detail of  cart of one user
  try {
    let result = await Cart.findById(req.params.id);
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/address/:id", async (req, resp) => {
  //sending detail of address of one user
  try {
    let result = await User.findById(req.params.id)
      .populate({ path: "addresss" })
      .populate({ path: "medias" });
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/order/:id", async (req, resp) => {
  //sending detail of order of one user
  try {
    let result = await Order.findById(req.params.id);
    // .populate({ path: "orders" })
    // .populate({ path: "medias" });
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/wishlist/:id", async (req, resp) => {
  //sending detail of wishlist of one user
  try {
    let result = await User.findById(req.params.id)
      .populate({ path: "wishlists" })
      .populate({ path: "medias" });
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/response/:id", async (req, resp) => {
  //sending detail of comment and review  of one user
  try {
    let result = await User.findById(req.params.id)
      .populate({ path: "comments" })
      .populate({ path: "reviews" })
      .populate({ path: "medias" });
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/invoice/:id", async (req, resp) => {
  //sending detail of invoice of one user
  try {
    let result = await User.findById(req.params.id)
      .populate({ path: "invoices" })
      .populate({ path: "medias" });
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/consignments/:id", async (req, resp) => {
  //sending data of all product
  let consignments = await Consignment.find({
    areaCode: req.params.id,
  });
  if (consignments.length > 0) {
    for (let i = 0; i < consignments.length; i++) {
      if (consignments[i].status === "Delivered") {
        consignments.splice(i, 1);
      }
    }
    resp.send(consignments);
  } else {
    resp.send({ result: "No Products found" });
  }
});

app.get("/api/invoices/:id", async (req, resp) => {
  //sending data of all product
  let invoices = await Invoice.find({
    areaCode: req.params.id,
  }).populate({ path: "addressId" });
  if (invoices.length > 0) {
    for (let i = 0; i < invoices.length; i++) {
      if (invoices[i].status === "Delivered") {
        invoices.splice(i, 1);
      }
    }
    resp.send(invoices);
  } else {
    resp.send({ result: "No Products found" });
  }
});

app.get("/api/product/:id", async (req, resp) => {
  //sending detail of one product
  try {
    let result = await Product.findById(req.params.id)
      .populate({ path: "variations" })
      .populate({ path: "reviews" });
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/review/:key", async (req, resp) => {
  //sending media and specification of every variations inside a product
  try {
    let result = await Review.findById(req.params.key).populate({
      path: "medias",
    });
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/product/:id/:key", async (req, resp) => {
  //sending media and specification of every variations inside a product
  try {
    let result = await Variation.findById(req.params.key)
      .populate({ path: "specifications" })
      .populate({ path: "medias" });
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/variation/:id", async (req, resp) => {
  //sending detail of one variations
  try {
    let result = await Variation.findById(req.params.id)
      .populate({ path: "specifications" })
      .populate({ path: "stocks" })
      .populate({ path: "comments" })
      .populate({ path: "medias" });
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/supplier/:id", async (req, resp) => {
  //sending detail of one supplier
  try {
    let result = await Supplier.findById(req.params.id)
      .populate({ path: "quotations" })
      .populate({ path: "purchaseInvoices" });
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.get("/api/area/:id", async (req, resp) => {
  //sending detail of one area
  try {
    let result = await Area.findById(req.params.id)
      .populate({ path: " addresss" })
      .populate({ path: "deliverymans" })
      .populate({ path: "backorders" })
      .populate({ path: "vehicles" })
      .populate({ path: "pincodes" });
    resp.send(result);
  } catch (error) {
    let result = await Area.findById(req.params.id);
    resp.send(result);
  }
});

//--------------------------------------------for updating data of different field----------------------------

app.put("/api/product/:id", async (req, resp) => {
  //update product
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/variation/:id", async (req, resp) => {
  //update variation
  let result = await Variation.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/media/:id", async (req, resp) => {
  //update media
  let result = await Media.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/specification/:id", async (req, resp) => {
  //update specification
  let result = await Specification.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/stock/:id", async (req, resp) => {
  //update stock
  let result = await Stock.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/profile/:id", async (req, resp) => {
  //update user profile
  let result = await User.updateOne({ _id: req.params.id }, { $set: req.body });
  resp.send(result);
});

app.put("/api/address/:id", async (req, resp) => {
  //update user's more addresses
  let result = await Address.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/cart/:id", async (req, resp) => {
  //sending detail of  cart of one user
  try {
    let result = await Cart.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    resp.send(result);
  } catch (error) {
    resp.status(403).send("No record found");
  }
});

app.put("/api/photo/:id", async (req, resp) => {
  //update user's address photo
  let result = await Photo.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/supplier/:id", async (req, resp) => {
  //update a Supplier
  let result = await Supplier.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/deliveryman/:id", async (req, resp) => {
  //update deliveryman
  let result = await Deliveryman.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/area/:id", async (req, resp) => {
  //update An area
  let result = await Area.updateOne({ _id: req.params.id }, { $set: req.body });
  resp.send(result);
});

app.put("/api/backorder/:id", async (req, resp) => {
  //update a backorder
  let result = await BackOrder.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/invoice/:id", async (req, resp) => {
  //update a backorder
  let result = await Invoice.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/consignment/:id/:key", async (req, resp) => {
  //update a consignment with invoice
  let consignment = await Consignment.findById(req.params.id);
  let invoice = await Invoice.findById(req.params.key);
  consignment.invoices.push(invoice);
  consignment.save();
  let result = await Consignment.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});

app.put("/api/photo/:id", async (req, resp) => {
  //update user's address photo
  let result = await Photo.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
});
//--------------------------------------totally diffrent reads------------------------------

app.get("/api/search/:key", async (req, resp) => {
  //search product
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

app.get("/api/search/user/:key/:type", async (req, resp) => {
  //search user according to type and name
  let result = [];
  let result1 = await User.find({
    $and: [
      { name: { $regex: req.params.key } },
      { type: { $regex: req.params.type } },
    ],
  });
  result = result.concat(result1);
  let result2 = await User.find(
    {
      $and: [
        { areaCode: { $regex: req.params.key } },
        { type: { $regex: req.params.type } },
      ],
    },
    { name: 1, mobileNumber: 1, altMobileNumber: 1 }
  );
  result = result.concat(result2);
  resp.send(result);
});

app.get("/api/vehicles/:key", async (req, resp) => {
  //search user according to type and area
  let result = await Vehicle.find(
    { areaCode: { $regex: req.params.key } },
    { modelName: 1, registrationNo: 1 }
  );
  resp.send(result);
});

app.get("/api/products", async (req, resp) => {
  //sending data of all product
  let products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Products found" });
  }
});

app.get("/api/search/:key", async (req, resp) => {
  //search product
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } },
    ],
  }).select("_id");
  resp.send(result);
});

app.get("/api/deliveryman/:key", async (req, resp) => {
  //search product
  let result = await Deliveryman.findOne(
    { userId: req.params.key },
    { status: 1, relation: 1, vehicleNumber: 1, modelName: 1, owner: 1 }
  ).select("_id");
  resp.send(result);
});

app.get("/api/search/variation/:key", async (req, resp) => {
  //search product
  let array = req.params.key.split(",");
  let result = [];
  if (array[4]) {
    let result1 = await Variation.find({
      $and: [
        { tags: { $regex: array[0] } },
        { tags: { $regex: array[1] } },
        { tags: { $regex: array[2] } },
        { tags: { $regex: array[3] } },
        { tags: { $regex: array[4] } },
      ],
    });
    result = result.concat(result1);
  }
  if (array[3]) {
    let result1 = await Variation.find({
      $and: [
        { tags: { $regex: array[0] } },
        { tags: { $regex: array[1] } },
        { tags: { $regex: array[2] } },
        { tags: { $regex: array[3] } },
      ],
    });
    result = result.concat(result1);
  }
  if (array[4]) {
    let result1 = await Variation.find({
      $and: [
        { tags: { $regex: array[1] } },
        { tags: { $regex: array[2] } },
        { tags: { $regex: array[3] } },
        { tags: { $regex: array[4] } },
      ],
    });
    result = result.concat(result1);
  }
  if (array[2]) {
    let result1 = await Variation.find({
      $and: [
        { tags: { $regex: array[0] } },
        { tags: { $regex: array[1] } },
        { tags: { $regex: array[2] } },
      ],
    });
    result = result.concat(result1);
  }
  if (array[3]) {
    let result1 = await Variation.find({
      $and: [
        { tags: { $regex: array[1] } },
        { tags: { $regex: array[2] } },
        { tags: { $regex: array[3] } },
      ],
    });
    result = result.concat(result1);
  }
  if (array[4]) {
    let result1 = await Variation.find({
      $and: [
        { tags: { $regex: array[2] } },
        { tags: { $regex: array[3] } },
        { tags: { $regex: array[4] } },
      ],
    });
    result = result.concat(result1);
  }
  if (array[1]) {
    let result1 = await Variation.find({
      $and: [{ tags: { $regex: array[0] } }, { tags: { $regex: array[1] } }],
    });
    result = result.concat(result1);
  }
  if (array[2]) {
    let result1 = await Variation.find({
      $and: [{ tags: { $regex: array[1] } }, { tags: { $regex: array[2] } }],
    });
    result = result.concat(result1);
  }
  if (array[3]) {
    let result1 = await Variation.find({
      $and: [{ tags: { $regex: array[2] } }, { tags: { $regex: array[3] } }],
    });
    result = result.concat(result1);
  }
  if (array[4]) {
    let result1 = await Variation.find({
      $and: [{ tags: { $regex: array[3] } }, { tags: { $regex: array[4] } }],
    });
    result = result.concat(result1);
  }
  if (array[0]) {
    let result1 = await Variation.find({
      tags: { $regex: array[0] },
    });
    result = result.concat(result1);
  }
  if (array[1]) {
    let result1 = await Variation.find({
      tags: { $regex: array[1] },
    });
    result = result.concat(result1);
  }
  if (array[2]) {
    let result1 = await Variation.find({
      tags: { $regex: array[2] },
    });
    result = result.concat(result1);
  }
  if (array[3]) {
    let result1 = await Variation.find({
      tags: { $regex: array[3] },
    });
    result = result.concat(result1);
  }
  if (array[4]) {
    let result1 = await Variation.find({
      tags: { $regex: array[4] },
    });
    result = result.concat(result1);
  }
  var distinct = [];
  var color = [];
  var size = [];
  var weight = [];
  let newresult = [];
  var model = [];
  var flavour = [];
  try {
    distinct = [...new Set(result.map((item) => item._id))];
    color = [...new Set(result.map((item) => item.colour))];
    size = [...new Set(result.map((item) => item.size))];
    weight = [...new Set(result.map((item) => item.weight))];
    model = [...new Set(result.map((item) => item.model))];
    flavour = [...new Set(result.map((item) => item.flavour))];
    newresult = { distinct, color, size, weight, model, flavour };
  } catch {}
  // console.log(distinct)
  resp.send(newresult);
  // resp.send(result)
});

app.get("/api/search/area/:key", async (req, resp) => {
  //search area
  try {
    let result = await Area.find({
      $or: [
        { name: { $regex: req.params.key } },
        { areaCode: { $regex: req.params.key } },
      ],
    });
    resp.send(result);
  } catch {}
});

app.get("/api/pin/:key", async (req, resp) => {
  //search product
  try {
    let result = await PinCode.findOne({
      number: req.params.key,
    });
    resp.send(result);
  } catch {}
});

app.get("/api/homepage/:key", async (req, resp) => {
  //search product
  try {
    let result = await Other.find({
      title: req.params.key,
    });
    resp.send(result);
  } catch {}
});

app.get("/api/areas", async (req, resp) => {
  //sending detail of all area
  let areas = await Area.find();
  if (areas.length > 0) {
    resp.send(areas);
  } else {
    resp.send({ result: "No areas found" });
  }
});

//----------------------------------------------deleting data from diffetent field---------------------------

app.delete("/api/product/:id", async (req, resp) => {
  //delete product
  const result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.delete("/api/variation/:id/:class", async (req, resp) => {
  //pulling a variation from product
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $pull: { variations: req.params.class } }
  );
  const final = await Variation.deleteOne({ _id: req.params.class });
  resp.send(final);
});

app.delete("/api/pincode/:id/:class", async (req, resp) => {
  //pulling a variation from product
  let result = await Area.updateOne(
    { _id: req.params.id },
    { $pull: { pinCodes: req.params.class } }
  );
  const final = await PinCode.deleteOne({ _id: req.params.class });
  resp.send(final);
});

app.delete("/api/specification/:id/:class", async (req, resp) => {
  //pulling a specification from variation
  let result = await Variation.updateOne(
    { _id: req.params.id },
    { $pull: { specifications: req.params.class } }
  );
  const final = await Specification.deleteOne({ _id: req.params.class });
  resp.send(final);
});

app.delete("/api/mediav/:id/:class", async (req, resp) => {
  //pulling a specification from variation
  let result = await Variation.updateOne(
    { _id: req.params.id },
    { $pull: { medias: req.params.class } }
  );
  const final = await Media.deleteOne({ _id: req.params.class });
  resp.send(final);
});

app.delete("/api/address/:id/:class", async (req, resp) => {
  //pulling a specification from variation
  let result = await User.updateOne(
    { _id: req.params.id },
    { $pull: { addresss: req.params.class } }
  );
  const final = await Address.deleteOne({ _id: req.params.class });
  resp.send(final);
});

app.delete("/api/cart/:id/:class", async (req, resp) => {
  //pulling a specification from variation
  let result = await User.updateOne(
    { _id: req.params.id },
    { $pull: { carts: req.params.class } }
  );
  const final = await Cart.deleteOne({ _id: req.params.class });
  resp.send(final);
});

app.delete("/api/order/:id/:class", async (req, resp) => {
  //pulling a specification from variation
  let result = await User.updateOne(
    { _id: req.params.id },
    { $pull: { orders: req.params.class } }
  );
  const final = await Order.deleteOne({ _id: req.params.class });
  resp.send(final);
});

app.delete("/api/wishlist/:id/:class", async (req, resp) => {
  //pulling a specification from variation
  let result = await User.updateOne(
    { _id: req.params.id },
    { $pull: { wishlists: req.params.class } }
  );
  const final = await Wishlist.deleteOne({ _id: req.params.class });
  resp.send(final);
});

app.delete("/api/quotation/:id/:class", async (req, resp) => {
  //pulling a specification from variation
  let result = await Supplier.updateOne(
    { _id: req.params.id },
    { $pull: { quotations: req.params.class } }
  );
  const final = await Quotation.deleteOne({ _id: req.params.class });
  resp.send(final);
});

app.delete("/api/backorder/:id/:class", async (req, resp) => {
  //pulling a specification from variation
  let result = await Area.updateOne(
    { _id: req.params.id },
    { $pull: { backOrders: req.params.class } }
  );
  const final = await BackOrder.deleteOne({ _id: req.params.class });
  resp.send(final);
});

app.delete("/api/vehicle/:id/:class", async (req, resp) => {
  //pulling a specification from variation
  let result = await Area.updateOne(
    { _id: req.params.id },
    { $pull: { vehicles: req.params.class } }
  );
  const final = await vehicle.deleteOne({ _id: req.params.class });
  resp.send(final);
});

//---------------------------------to be improved--------------------------------------
app.delete("/api/media/:id/:class", async (req, resp) => {
  //pulling a specification from variation
  try {
    let result = await User.updateOne(
      { _id: req.params.id },
      { $pull: { medias: req.params.class } }
    );
  } catch (error) {
    try {
      let result = await Product.updateOne(
        { _id: req.params.id },
        { $pull: { medias: req.params.class } }
      );
    } catch (error) {
      try {
        let result = await Variation.updateOne(
          { _id: req.params.id },
          { $pull: { medias: req.params.class } }
        );
      } catch (error) {
        try {
          let result = await Review.updateOne(
            { _id: req.params.id },
            { $pull: { medias: req.params.class } }
          );
        } catch (error) {
          resp.status(403).send("No record found");
        }
      }
    }
  }
  const final = await Media.deleteOne({ _id: req.params.class });
  resp.send(final);
});

//----------------------------------------------other functions------------------------------
function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];

  console.log("token");
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with header" });
  }
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

//step 3 of heroku
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
});
