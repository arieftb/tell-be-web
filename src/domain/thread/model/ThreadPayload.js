import { z } from "zod";

export const ThreadPayloadSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100),
  body: z.string().min(1, { message: "Body is required" }),
  category: z.string().min(1, { message: "Category is required" }).max(50),
});

export class ThreadPayload {
  constructor(payload) {
    const validationResult = ThreadPayloadSchema.safeParse(payload);
    if (!validationResult.success) {
      throw new Error(
        `THREAD_PAYLOAD.VALIDATION_ERROR: ${validationResult.error.message}`,
      );
    }

    const { title, body, category } = validationResult.data;
    this.title = title;
    this.body = body;
    this.category = category;
  }
}
