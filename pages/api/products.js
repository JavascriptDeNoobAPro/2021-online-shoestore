import Product from "../../models/Product";
import initDB from "../../utils/initDB";

initDB();
export default (req, res) => {
  Product.find().then((products) => {
    res.status(200).json(products);
  });
};
