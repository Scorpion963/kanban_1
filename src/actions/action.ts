"use server";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "~/server/db";

const schema = z.object({
  name: z
    .string({
      invalid_type_error: "invalid name",
    })
    .trim()
    .min(1, { message: "The name cannot be empty" }),
});

export async function addBoard(formData: FormData) {
  const user = await currentUser();
  if (!user?.id)
    return { message: "Error Happened: you must be logged in to add form" };

  const validatedFields = schema.safeParse({
    name: formData.get("name"),
  });
  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors,
    };
  }

  const newBoard = await db.board.create({
    data: {
      name: formData.get("name") as string,
      owner: user.id,
    },
  });

  redirect(`/?id=${newBoard.id}`);
}

export async function deleteBoard(id: string) {
  const user = await currentUser();
  if (!user?.id)
    return { message: "Error Happened: you must be logged in to add form" };

  await db.board.deleteMany({where: {id}})
}
