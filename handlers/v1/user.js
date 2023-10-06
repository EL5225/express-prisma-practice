import { getPagination } from "../../helpers/index.js";
import { prisma } from "../../prisma/client/index.js";

export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    res.status(201).json({
      status: true,
      message: "User created",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const filter = req.query.filter ? req.query.filter : "asc";

    const usersData = await prisma.user.findMany({
      orderBy: {
        id: filter,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const count = await prisma.user.aggregate({
      _count: { id: true },
    });

    const pagination = getPagination(req, count._count.id, limit, page, filter);

    res.status(200).json({
      status: true,
      message: "Users Data Delivered",
      data: { pagination, usersData },
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Bad Request",
        data: `User not found with id: ${id}`,
      });
    }

    res.status(200).json({
      status: true,
      message: `User Data Delivered with id: ${id}`,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
      },
    });

    res.status(200).json({
      status: true,
      message: `User Data updated with id: ${id}`,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({
      status: true,
      message: `User Data deleted with id: ${id}`,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
