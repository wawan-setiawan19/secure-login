const prisma = require('../config/db');

const findByEmail = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } });
  return user;
};

const findById = async (id) => {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
}

const createUser = async (data) => {
    return prisma.user.create({data})
}

module.exports = {
    findByEmail,
    createUser,
    findById
}