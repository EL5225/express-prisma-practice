import { prisma } from "../../prisma/client/index.js";

export const createProfile = async (req, res, next) => {
  try {
    const { identityType, identityNumber, userId } = req.body;
    const profile = await prisma.profile.create({
      data: {
        identityType,
        identityNumber,
        userId,
      },
    });

    res.status(201).json({
      status: true,
      message: "Profile was successfully created",
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await prisma.profile.findMany();

    res.status(200).json({
      status: true,
      message: "Profiles Data Delivered",
      data: profiles,
    });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  const { id } = req.params;
  try {
    const profiles = await prisma.profile.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!profiles) {
      return res.status(404).json({
        status: false,
        message: "Bad Request",
        data: `Profile not found with id: ${id}`,
      });
    }

    res.status(200).json({
      status: true,
      message: `Profile Data Delivered with Id: ${id}`,
      data: profiles,
    });
  } catch (err) {
    next(err);
  }
};
