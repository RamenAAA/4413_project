// import the SQL connection pool, custom errors, HTTP status codes, and check permissions
import { pool } from "../db/connect.js";
import * as CustomError from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { checkPermissions } from "../Utils/checkPermissions.js";

// function to create an order
export const createOrder = async (req, res) => {
  // get the cart items
  const { items, dateOfPurchase } = req.body;

  // raise an error if the items does not exist or the array is empty
  if (!items || items.length < 1) {
    throw new CustomError.BadRequestError("No cart items provided");
  }

  // get the current user ID from the req.user
  const currentUserID = req.user.userId;

  // variables to hold the order items and subtotal
  let orderItems = [];
  let subtotal = 0;

  // loop to read the cart items and calculate the subtotal
  for (const item of items) {
    // get the item from the database
    const [result] = await pool.query(`SELECT * FROM Items WHERE id=?`, [
      item.itemID,
    ]);

    // raise an error if the item does not exist
    if (!result[0]) {
      throw new CustomError.NotFoundError("No product found");
    }

    // raise an error if the item quantity exceeds the stock
    if (item.amount > result[0].quantity) {
      throw new CustomError.BadRequestError("Insufficient item quantity");
    }

    // insert itemID, amount and price in orderItems
    orderItems = [
      ...orderItems,
      { itemID: result[0].id, amount: item.amount, price: result[0].price },
    ];

    // calculate the subtotal
    subtotal += result[0].price * item.amount;
  }

  // get the address ID stored in the database
  const [result] = await pool.query(`SELECT id FROM Address WHERE userID=?`, [
    currentUserID,
  ]);

  // raise an error if the address is not found
  if (!result[0]) {
    throw new CustomError.NotFoundError("No address found");
  }

  // extract the address ID
  const addressID = result[0].id;

  // create an order for the current user
  [result] = await pool.query(
    `INSERT INTO Orders (userID, dateOfPurchase, totalAmount, billingAddressID, shippingAddressID, paymentStatus) VALUES
    (?,?,?,?,?,?)`,
    [currentUserID, dateOfPurchase, subtotal, addressID, addressID, "Pending"]
  );

  // extract the order ID
  const orderID = result[0].insertID;

  // loop to insert the items in the PurchaseHistory table
  for (const item of orderItems) {
    // insert the items into the database
    await pool.query(
      `INSERT INTO PurchaseHistory (orderID, itemID, quantity, price) VALUES (?,?,?,?)`,
      [orderID, item.itemID, item.amount, item.price]
    );
  }

  res.status(StatusCodes.CREATED).send("Order Created");
};

// function to update the order
export const updateOrder = async (req, res) => {
  // get the order ID
  const orderID = req.params.id;

  // retrieve the order from the database
  const [result] = await pool.query(`SELECT * FROM Orders WHERE id=?`, [
    orderID,
  ]);

  // raise an error if the order does not exist
  if (!result[0]) {
    throw new CustomError.NotFoundError("No order created");
  }

  // check permissions
  checkPermissions(req.user, result[0].userID);

  // get the items from the database
  [result] = await pool.query(
    `SELECT itemID, quantity FROM PurchaseHistory WHERE orderID=?`,
    [orderID]
  );

  // reduce the inventory of the products
  for (const item of result[0]) {
    // variable to store the current quantity in the database
    const currentQuantity = 0;

    // get the current quantity
    const [result] = await pool.query(`SELECT quantity from Items WHERE id=?`, [
      item.itemID,
    ]);

    // update the quantity to the backend
    await pool.query(`UPDATE Items SET quantity=? WHERE id=?`, [
      currentQuantity - item.quantity,
      item.itemID,
    ]);
  }

  // update the status of the order from pending to paid
  await pool.query(`UPDATE Orders SET paymentStatus=? WHERE id=?`, [
    "Paid",
    orderID,
  ]);

  res.status(StatusCodes.OK).send("Order Processed");
};

// function to get all orders (admin only function)
export const getAllOrders = async (req, res) => {
  // return all orders, the user information, the item information and the address
  const [result] = await pool.query(`SELECT 
        o.id AS orderId,
        o.dateOfPurchase,
        o.totalAmount,
        o.paymentStatus,
        u.id AS userId,
        u.firstName,
        u.lastName,
        u.email,
        u.phone,
        ba.id AS billingAddressId,
        ba.street AS billingStreet,
        ba.city AS billingCity,
        ba.province AS billingProvince,
        ba.country AS billingCountry,
        ba.postalCode AS billingPostalCode,
        sa.id AS shippingAddressId,
        sa.street AS shippingStreet,
        sa.city AS shippingCity,
        sa.province AS shippingProvince,
        sa.country AS shippingCountry,
        sa.postalCode AS shippingPostalCode,
        i.id AS itemId,
        i.name AS itemName,
        i.description AS itemDescription,
        i.category AS itemCategory,
        i.brand AS itemBrand,
        i.size AS itemSize,
        i.color AS itemColor,
        ph.quantity AS itemQuantity,
        ph.price AS itemPrice
    FROM 
        Orders o
    JOIN 
        Users u ON o.userID = u.id
    JOIN 
        Address ba ON o.billingAddressID = ba.id
    JOIN 
        Address sa ON o.shippingAddressID = sa.id
    JOIN 
        PurchaseHistory ph ON o.id = ph.orderID
    JOIN 
        Items i ON ph.itemID = i.id
    ORDER BY 
        o.id`);

  res.status(StatusCodes.OK).send(result[0]);
};

// function to get single order
export const getSingleOrder = async (req, res) => {
    // extract the order ID
    const orderID = req.params.id;

    // get the order from the database
    const [result] = await pool.query(`SELECT 
        o.id AS orderID,
        o.dateOfPurchase,
        o.totalAmount,
        o.paymentStatus,
        u.id AS userID,
        u.firstName,
        u.lastName,
        u.email,
        u.phone,
        ba.id AS billingAddressID,
        ba.street AS billingStreet,
        ba.city AS billingCity,
        ba.province AS billingProvince,
        ba.country AS billingCountry,
        ba.postalCode AS billingPostalCode,
        sa.id AS shippingAddressID,
        sa.street AS shippingStreet,
        sa.city AS shippingCity,
        sa.province AS shippingProvince,
        sa.country AS shippingCountry,
        sa.postalCode AS shippingPostalCode,
        i.id AS itemID,
        i.name AS itemName,
        i.description AS itemDescription,
        i.category AS itemCategory,
        i.brand AS itemBrand,
        i.size AS itemSize,
        i.color AS itemColor,
        ph.quantity AS itemQuantity,
        ph.price AS itemPrice
    FROM 
        Orders o
    JOIN 
        Users u ON o.userID = u.id
    JOIN 
        Address ba ON o.billingAddressID = ba.id
    JOIN 
        Address sa ON o.shippingAddressID = sa.id
    JOIN 
        PurchaseHistory ph ON o.id = ph.orderID
    JOIN 
        Items i ON ph.itemID = i.id
    WHERE 
        o.id=?`, [orderID]);

    // raise an error if the order does not exist
    if(!result[0]) {
        throw new CustomError.NotFoundError('No order found');
    }

    // check permissions
    checkPermissions(req.user, result[0].userID);

    res.status(StatusCodes.OK).send(result[0]);
};

// function to get the orders of the current user
export const getCurrentUserOrders = async (req, res) => {
    // extract the current user id
    const userID = req.user.userId;

    // get the orders from the database
    const [result] = await pool.query(`SELECT 
        o.id AS orderID,
        o.dateOfPurchase,
        o.totalAmount,
        o.paymentStatus,
        u.id AS userID,
        u.firstName,
        u.lastName,
        u.email,
        u.phone,
        ba.id AS billingAddressID,
        ba.street AS billingStreet,
        ba.city AS billingCity,
        ba.province AS billingProvince,
        ba.country AS billingCountry,
        ba.postalCode AS billingPostalCode,
        sa.id AS shippingAddressID,
        sa.street AS shippingStreet,
        sa.city AS shippingCity,
        sa.province AS shippingProvince,
        sa.country AS shippingCountry,
        sa.postalCode AS shippingPostalCode,
        i.id AS itemID,
        i.name AS itemName,
        i.description AS itemDescription,
        i.category AS itemCategory,
        i.brand AS itemBrand,
        i.size AS itemSize,
        i.color AS itemColor,
        ph.quantity AS itemQuantity,
        ph.price AS itemPrice
    FROM 
        Orders o
    JOIN 
        Users u ON o.userID = u.id
    JOIN 
        Address ba ON o.billingAddressID = ba.id
    JOIN 
        Address sa ON o.shippingAddressID = sa.id
    JOIN 
        PurchaseHistory ph ON o.id = ph.orderID
    JOIN 
        Items i ON ph.itemID = i.id
    WHERE 
        o.userID=?`, [userID]);

    // raise an error if the orders does not exist
    if(!result[0]) {
        throw new CustomError.NotFoundError('No orders found');
    }

    // check permissions
    checkPermissions(req.user, result[0].userID);

    res.status(StatusCodes.OK).send(result[0]);
};
