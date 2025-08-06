const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = (data) => prisma.product.create({ data: {
    name: data.name,
    price: parseFloat(data.price),
    ownerId: data.ownerId
} });

const getUserProducts = (userId) =>
  prisma.product.findMany({ where: { ownerId: userId } });

const getProductById = (id) => prisma.product.findUnique({ where: { id } });

const updateProduct = (id, data) =>
  prisma.product.update({ where: { id }, data });

const deleteProduct = (id) => prisma.product.delete({ where: { id } });

const findByIdAndOwner = (id, ownerId) => {
    return prisma.product.findFirst({
      where: {
        id,
      },
    });
  };

module.exports = {
  createProduct,
  getUserProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  findByIdAndOwner
};
