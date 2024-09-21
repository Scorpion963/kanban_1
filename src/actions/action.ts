"use server";

import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { db } from "~/server/db";

const tailwindBgColors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-gray-500",
  "bg-orange-500",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-emerald-500",
  "bg-fuchsia-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-sky-500",
  "bg-stone-500",
  "bg-neutral-500",
  "bg-red-600",
] as const;

const schema = z.object({
  name: z
    .string({
      invalid_type_error: "invalid name",
    })
    .trim()
    .min(1, { message: "The name cannot be empty" }),
});

const colorSchema = z.object({
  name: z
    .string({
      invalid_type_error: "invalid name",
    })
    .trim()
    .min(1, { message: "The name cannot be empty" }),
  color: z.enum(tailwindBgColors, { invalid_type_error: "Invalid color" }),
});

export async function addBoard(formData: FormData) {
  const user = await currentUser();
  if (!user?.id)
    return { message: "Error Happened: you must be logged in to add form" };

  const validatedFields = schema.safeParse({
    name: formData.get("Name"),
  });
  if (!validatedFields.success) {
    return { message: "Invalid input" };
  }

  const newBoard = await db.board.create({
    data: {
      name: formData.get("Name") as string,
      owner: user.id,
    },
  });

  redirect(`/${newBoard.id}`);
}

export async function deleteBoard(id: string) {
  const user = await currentUser();
  if (!user?.id)
    return { message: "Error Happened: you must be logged in to add form" };

  await db.board.deleteMany({ where: { id } });
  revalidatePath("/");
  redirect("/");
}

export async function updateBoard(formData: FormData, id: string) {
  const user = await currentUser();
  if (!user?.id)
    return { message: "Error Happened: you must be logged in to add form" };

  const validatedFields = schema.safeParse({
    name: formData.get("Name"),
  });
  if (!validatedFields.success) {
    return { message: "Invalid input" };
  }

  const newBoard = await db.board.update({
    where: { id: id },
    data: { name: formData.get("Name") as string },
  });

  redirect(`/${newBoard.id}`);
}

export async function addColumn(formData: FormData, id: string) {
  const user = await currentUser();
  if (!user?.id)
    return { message: "Error Happened: you must be logged in to add form" };

  const validatedFields = colorSchema.safeParse({
    name: formData.get("Name"),
    color: formData.get("Color"),
  });

  if (!validatedFields.success) {
    return { message: "Invalid input" };
  }

  const newColumn = await db.column.create({
    data: {
      name: formData.get("Name") as string,
      boardId: id,
      status_color: formData.get("Color") as string,
    },
  });

  revalidatePath("/");
}

export async function addTask(formData: FormData, id: string) {
  const user = await currentUser();
  if (!user?.id)
    return { message: "Error Happened: you must be logged in to add form" };
}
