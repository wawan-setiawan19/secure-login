const productService = require('../services/productService');

const create = async (req, res) => {
  try {
    console.log(req.user.userId)
    const product = await productService.createProduct(req.user.userId, req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const list = async (req, res) => {
  const products = await productService.getUserProducts(req.user.userId);
  res.json(products);
};

const update = async (req, res) => {
  try {
    const updated = await productService.updateProduct(req.user.userId, parseInt(req.params.id), req.body);
    res.json(updated);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const destroy = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.user.userId, parseInt(req.params.id));
    res.json(deleted);
  } catch (err) {
    res.status(403).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const product = await productService.findByIdAndOwner(Number(id), userId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: 'Failed to get product '+ err  });
    }
  };
  

module.exports = {
  create,
  list,
  update,
  destroy,
  getProductById
};
