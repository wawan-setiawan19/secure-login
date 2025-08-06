const productRepo = require('../repositories/productRepository');

const createProduct = async (userId, productData) => {
  return await productRepo.createProduct({ ...productData, ownerId: userId });
};

const getUserProducts = async (userId) => {
  return await productRepo.getUserProducts(userId);
};

const updateProduct = async (userId, productId, productData) => {
  const existing = await productRepo.getProductById(productId);
  if (!existing || existing.ownerId !== userId) throw new Error('Unauthorized');
  return await productRepo.updateProduct(productId, productData);
};

const deleteProduct = async (userId, productId) => {
  const existing = await productRepo.getProductById(productId);
  if (!existing || existing.ownerId !== userId) throw new Error('Unauthorized');
  return await productRepo.deleteProduct(productId);
};

const findByIdAndOwner = async (id, ownerId) => {
  return await productRepo.findByIdAndOwner(id, ownerId);
};

module.exports = {
  createProduct,
  getUserProducts,
  updateProduct,
  deleteProduct,
  findByIdAndOwner
};
