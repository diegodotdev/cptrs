"use server";

import prisma from "../db/prisma";

export const fetchUserPosts = async (id: string) => {
  const data = await prisma.post.findMany({
    where: {
      userId: id,
    },
    select: {
      image_url: true,
      id: true,
    },
  });
  return data;
};

export const createPost = async (body: any) => {
  await prisma.post.create({
    data: {
      ...body,
    },
  });
};

export const fetchUniquePost = async (id: string) => {
  const data = await prisma.post.findFirst({
    where: {
      id: id,
    },
  });
  return data;
};

export const fetchUserData = async (id: string) => {
  const data = await prisma.post.findMany({
    where: {
      userId: id,
    },
  });
  return {
    user: {
      name: data[0]?.user,
      avatar: data[0]?.avatar,
    },
    posts: data,
  };
};

export const fetchAllPosts = async () => {
  const data = await prisma.post.findMany();

  return data;
};
