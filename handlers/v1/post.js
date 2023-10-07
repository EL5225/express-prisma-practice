import { prisma } from "../../prisma/client/index.js";

export const createPost = async (req, res, next) => {
  try {
    const { title, body, authorId, categories } = req.body;

    const newCategories = [];

    const category = await prisma.category.findMany();

    categories.map((c) => {
      newCategories.push({
        assignedAt: new Date(),
        category: {
          connectOrCreate: {
            where: {
              id: !!category.find((cat) => cat?.name === c)?.id
                ? category.find((cat) => cat?.name === c)?.id
                : category[category.length - 1]?.id + 1,
            },
            create: {
              name: c,
              id: category[category.length - 1]?.id + 1,
            },
          },
        },
      });
    });

    const createPost = await prisma.post.create({
      data: {
        title,
        body,
        published: true,
        author: {
          connect: {
            id: authorId,
          },
        },
        CategoriesOnPosts: {
          create: newCategories,
        },
      },
    });

    res.status(201).json({
      status: true,
      message: "Post was created",
      data: createPost,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const getPost = await prisma.post.findMany({
      include: {
        CategoriesOnPosts: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
            postId: false,
            categoryId: false,
            assignedAt: true,
          },
        },
      },
    });

    res.status(200).json({
      status: true,
      message: "Posts Data Delivered",
      data: { posts: getPost },
    });
  } catch (err) {
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        CategoriesOnPosts: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
            postId: false,
            categoryId: false,
            assignedAt: true,
          },
        },
      },
    });

    res.status(200).json({
      status: true,
      message: "Post Data Delivered",
      data: post,
    });
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { title, body, authorId } = req.body;
    const { id } = req.params;

    const updatePost = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        body,
        published: true,
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });

    res.status(200).json({
      status: true,
      message: "Post was successfully updated",
      data: updatePost,
    });
  } catch (err) {
    next(err);
  }
};

export const assignCategorytoPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { categoryName } = req.body;

    const category = await prisma.category.findMany();

    const assign = await prisma.post.update({
      where: {
        id: Number(id),
      },

      data: {
        CategoriesOnPosts: {
          create: {
            category: {
              connect: {
                id: category.find((cat) => cat?.name === categoryName)?.id,
              },
            },
          },
        },
      },
    });
    res.status(200).json({
      status: true,
      message: "assign category was successfull",
      data: assign,
    });
  } catch (err) {
    next(err);
  }
};
