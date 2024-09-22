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

const addTaskSchema = z.object({
  name: z
    .string({
      invalid_type_error: "invalid name",
    })
    .trim()
    .min(1, { message: "The name cannot be empty" }),

  description: z
    .string({
      invalid_type_error: "invalid name",
    })
    .trim()
    .min(1, { message: "The description cannot be empty" }),
  subtasks: z.array(
    z
      .object({
        id: z.string().trim().min(1, { message: "Subtask cannot be empty" }),
      })
      .nullable(),
  ),
  id: z
    .string({
      invalid_type_error: "invalid name",
    })
    .trim()
    .min(1, { message: "The name cannot be empty" }),
});

const updateTaskSchema = z.object({
  id: z
    .string({
      invalid_type_error: "invalid name",
    })
    .trim()
    .min(1, { message: "The name cannot be empty" }),
  subtasks: z.array(
    z
      .object({
        id: z.string().trim().min(1, { message: "Subtask cannot be empty" }),
      })
      .nullable(),
  ),
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

export async function addTask(formData: FormData) {
  const user = await currentUser();
  if (!user?.id)
    return { message: "Error Happened: you must be logged in to add form" };

  const subtasksJson = formData.get("Subtasks");
  if (!subtasksJson || typeof subtasksJson !== "string")
    return { message: "Invalid json" };

  const subtasks =
    (JSON.parse(subtasksJson) as { id: string; name: string }[]) || null || [];
  const name = formData.get("Name") as string;
  const description = formData.get("Description") as string;
  const id = formData.get("Color") as string;

  console.log();

  const validatedFields = addTaskSchema.safeParse({
    name,
    description,
    subtasks,
    id,
  });

  if (!validatedFields.success) return { message: "Invalid Input" };

  const task = await db.task.create({
    data: { name: name, description: description, columnId: id },
  });
  if (!task) return { message: "The server could not create the task" };

  if (subtasks.length > 1 || subtasks) {
    const subtasksDatabase = subtasks.map((item) => ({
      name: item.name,
      id: item.id,
      taskId: task.id,
    }));
    const response_subtasks = await db.subtask.createMany({
      data: [...subtasksDatabase],
    });
    if (!response_subtasks)
      return { message: "The server could not add subtasks" };
  }

  revalidatePath("/");
}

export async function updateTask(formData: FormData, taskId: string) {
  console.log("awfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawl")
  
  const columnId = formData.get("Color") as string;
  const subtasksJson = formData.get("Subtasks") as string;

  const subtasks = JSON.parse(subtasksJson) as {
    id: string;
    name: string;
    completed: boolean;
    taskId: string;
  }[];
  console.log("awfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawl")
 
  const validatedFields = updateTaskSchema.safeParse({
    id: columnId,
    subtasks: subtasks,
  });
  console.log("awfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawl")
 
  if (!validatedFields.success) return { message: "Invalid Input" };

  const updatedSubtasks = await db.task.update({
    where: { id: taskId },
    data: { columnId: columnId },
  });
  if (!updatedSubtasks) return { message: "error updating task" };

  const deleteSubtasks = await db.subtask.deleteMany({
    where: { taskId: taskId },
  });
  if (!deleteSubtasks)
    return { message: "error happened while deleting subtasks" };

  const createNewSubtasks = subtasks.map((item) => ({
    name: item.name,
    completed: item.completed,
    taskId: item.taskId,
  }));

  const createSubtasks = await db.subtask.createMany({
    data: [...createNewSubtasks],
  });
  if (!createSubtasks) return { message: "error creating subtasks" };

  console.log();
  revalidatePath("/");
}

export async function getColumns(boardId: string) {
  return await db.column.findMany({
    where: { boardId: boardId },
    include: { Task: { include: { Subtask: true } } },
  });
}

export async function updateFullTask(formData: FormData, taskId: string) {
  console.log("awfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawlawfuhjiefhieluawhfleiuwahfailewhufeuilwahfuilwauilfewahufuliewufhlaweluifwahifhliuweafhuialwfhiuwahuilfhuiawl")
  const user = await currentUser();
  if (!user?.id)
    return { message: "Error Happened: you must be logged in to add form" };

  const subtasksJson = formData.get("Subtasks");
  if (!subtasksJson || typeof subtasksJson !== "string")
    return { message: "Invalid json" };

  const subtasks =
    (JSON.parse(subtasksJson) as { id: string; name: string }[]) || null || [];
  const name = formData.get("Name") as string;
  const description = formData.get("Description") as string;
  const id = formData.get("Color") as string;

  
  console.log();

  const validatedFields = addTaskSchema.safeParse({
    name,
    description,
    subtasks,
    id,
  });

  if (!validatedFields.success) return { message: "Invalid Input" };

  const task = await db.task.update({
    where: { id: taskId },
    data: { name: name, description: description, columnId: id },
  });
  if (!task) return { message: "The server could not create the task" };

  if (subtasks.length > 1 || subtasks) {
    const subtasksDatabase = subtasks.map((item) => ({
      name: item.name,
      id: item.id,
      taskId: taskId,
    }));
    const delete_subtasks = await db.subtask.deleteMany({where: {taskId: taskId}})
    if(!delete_subtasks) return {message: "Error deleting/updating subtasks"}
    const response_subtasks = await db.subtask.createMany({
      data: [...subtasksDatabase],
    });
    if (!response_subtasks)
      return { message: "The server could not add subtasks" };
  }

  revalidatePath("/");
}
