"use server";

import { prisma } from "../lib/db";
import { revalidatePath } from "next/cache";


export async function createPost(formData) {
  const title = formData.get("title");
  const description = formData.get("description");

  await prisma.post.create({
    data: { title, description },
  });

  revalidatePath("/");
}


export async function deletePost(id) {
  await prisma.post.delete({
    where: { id },
  });

  revalidatePath("/");
}


export async function updatePost(formData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title");
  const description = formData.get("description");

  await prisma.post.update({
    where: { id },
    data: { title, description },
  });

  revalidatePath("/");
}