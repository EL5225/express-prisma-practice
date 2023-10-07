import { prisma } from "../../prisma/client/index.js";

export const createNewCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).json({
      status: true,
      message: "Category was successfully created",
      data: newCategory,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await prisma.category.findMany();

    res.status(200).json({
      status: true,
      message: "Categories Data Delivered",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};
