CREATE SCHEMA IF NOT EXISTS ecommerce;

USE ecommerce;

DROP TABLE IF EXISTS PurchaseHistory;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS ShoppingCart;
DROP TABLE IF EXISTS Items;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Address;
DROP TABLE IF EXISTS Reviews;

CREATE TABLE Users (
    id INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role ENUM('customer', 'admin') NOT NULL,
    phone VARCHAR(20),
    PRIMARY KEY (id)
);

CREATE TABLE Address (
    id INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    street VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    province VARCHAR(20) NOT NULL,
    country VARCHAR(20) NOT NULL,
    postalCode VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE Items (
    id VARCHAR(36) NOT NULL,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category VARCHAR(60) NOT NULL,
    brand VARCHAR(60) NOT NULL,
    size VARCHAR(10) NOT NULL,
    color VARCHAR(30) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE ShoppingCart (
    id INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    itemID VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Users(id),
    FOREIGN KEY (itemID) REFERENCES Items(id)
);

CREATE TABLE Orders (
    id INT NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    dateOfPurchase DATETIME NOT NULL,
    totalAmount DECIMAL(10, 2) NOT NULL,
    billingAddressID INT NOT NULL,
    shippingAddressID INT NOT NULL,
    paymentStatus VARCHAR(20) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userID) REFERENCES Users(id),
    FOREIGN KEY (billingAddressID) REFERENCES Address(id),
    FOREIGN KEY (shippingAddressID) REFERENCES Address(id)
);

CREATE TABLE PurchaseHistory (
    orderID INT NOT NULL,
    itemID VARCHAR(36) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (orderID, itemID),
    FOREIGN KEY (orderID) REFERENCES Orders(id),
    FOREIGN KEY (itemID) REFERENCES Items(id)
);

CREATE TABLE Reviews (
    id INT NOT NULL AUTO_INCREMENT,
    itemID VARCHAR(36) NOT NULL,
    userID INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    reviewDate DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (itemID) REFERENCES Items(id),
    FOREIGN KEY (userID) REFERENCES Users(id)
);


INSERT INTO Users (firstName, lastName, email, password, role, phone) VALUES
('Amanda', 'Brown', 'amanda.brown@gmail.com', 'password123', 'customer', '647-123-4567'),
('James', 'Smith', 'james.smith@gmail.com', 'password456', 'customer', '416-123-8569'),
('Admin', 'User', 'test@mark.com', 'adminpassword', 'admin', NULL);

INSERT INTO Address (userID, street, city, province, country, postalCode) VALUES
(1, '567 Yonge St', 'Toronto', 'ON', 'Canada', 'K1E 6T5'),
(2, '943 Avenue Rd', 'Toronto', 'ON', 'Canada', 'M1C 6K5');

INSERT INTO Items (id, name, description, category, brand, size, color, price, quantity, image) VALUES
('cl001', 'T-Shirt', 'Cotton T-Shirt', 'Topwear', 'BrandA', 'M', 'Red', 19.99, 100, 'red_tshirt1.jpg'),
('cl002', 'Jeans', 'Denim Jeans', 'Bottomwear', 'BrandB', '32', 'Blue', 49.99, 50, 'red_tshirt1.jpg'),
('cl003', 'Jacket', 'Leather Jacket', 'Outerwear', 'BrandC', 'L', 'Black', 129.99, 25, 'red_tshirt1.jpg');

INSERT INTO Orders (userID, dateOfPurchase, totalAmount, billingAddressID, shippingAddressID, paymentStatus) VALUES
(1, '2023-07-19 10:00:00', 69.97, 1, 1, 'Paid');

INSERT INTO PurchaseHistory (orderID, itemID, quantity, price) VALUES
(1, 'cl001', 2, 19.99),
(1, 'cl002', 1, 49.99);

INSERT INTO Reviews (itemID, userID, rating, comment, reviewDate) VALUES
('cl001', 1, 5, 'Great T-Shirt, I love it!', '2023-07-19 12:00:00'),
('cl002', 2, 4, 'Good jeans, but a bit tight.', '2023-07-20 15:30:00');