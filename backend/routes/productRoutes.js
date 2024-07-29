// import the express router to route the queries from the client to the appropriate function
import express from 'express';
export const productRouter = express.Router();

// import the HTTP status codes to send success and failure codes
import { StatusCodes } from 'http-status-codes';

// import the functions that retrieve the information from the database
import { 
    getAllItems, getSingleItem, getItemsByName, getItemsByCategory, getItemsByBrand, getItemsBySize, getItemsByColor, getItemsSortedByPrice, getItemsSortedByName 
} from '../controllers/productController.js';

// retrives all the products to send to the client 
// TODO: add the admin route to create the product here with POST method and add authentication and authorization middleware
productRouter.route('/').get( async (req, res) => {
    try{
        // get all items from the database
        const items = await getAllItems();

        // send the OK status with the result
        res.status(StatusCodes.OK).json({ items });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND)
    }
});

// retrieve a single product using its ID
// TODO: add the admin route to update the single product and delete the single product using PATCH and DELETE
productRouter.route('/:id').get( async (req, res) => {
    try {
        // extract the item ID
        const id = req.params.id;

        // get the specific item
        const item = await getSingleItem(id);

        // send the OK status with the result
        res.status(StatusCodes.OK).json({ item });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND);
    }
});

// retrieve the products filtered using name, category, brand, size, and color
productRouter.route('/filter/name/:name').get( async (req, res) => {
    try {
        // extract the name
        const name = req.params.name;

        // get items of the same name
        const items = await getItemsByName(name);

        // send the OK status with the result
        res.status(StatusCodes.OK).json({ items });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND);
    }
}); // end of name route

productRouter.route('/filter/category/:category').get( async (req, res) => {
    try {
        // extract the category
        const category = req.params.category;

        // get items of the same category
        const items = await getItemsByCategory(category);

        // send the OK status with the result
        res.status(StatusCodes.OK).json({ items });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND);
    }
}); // end of category route

productRouter.route('/filter/brand/:brand').get( async (req, res) => {
    try {
        // extract the brand
        const brand = req.params.brand;

        // get items of the same brand
        const items = await getItemsByBrand(brand);

        // send the OK status with the result
        res.status(StatusCodes.OK).json({ items });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND);
    }
}); // end of brand route

productRouter.route('/filter/size/:size').get( async (req, res) => {
    try {
        // extract the size
        const size = req.params.size;

        // get items of the same size
        const items = await getItemsBySize(size);

        // send the OK status with the result
        res.status(StatusCodes.OK).json({ items });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND);
    }
}); // end of size route

productRouter.route('/filter/color/:color').get( async (req, res) => {
    try {
        // extract the color
        const color = req.params.color;

        // get items of the same color
        const items = await getItemsByColor(color);

        // send the OK status with the result
        res.status(StatusCodes.OK).json({ items });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND);
    }
}); // end of color route

// retrieve the products sorted by price and name ascending or descending
productRouter.route('/sort/price/:sort').get( async (req, res) => {
    try {
        // extract the sort
        const sort = req.params.sort;

        // get items sorted by price
        const items = await getItemsSortedByPrice(sort);

        // send the OK status with the result
        res.status(StatusCodes.OK).json({ items });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND);
    }
}); // end of sort by price route

productRouter.route('/sort/name/').get( async (req, res) => {
    try {
        // get items sorted by name
        const items = await getItemsSortedByName();

        // send the OK status with the result
        res.status(StatusCodes.OK).json({ items });
    } catch (err) {
        res.status(StatusCodes.NOT_FOUND);
    }
}); // end of sort by name route