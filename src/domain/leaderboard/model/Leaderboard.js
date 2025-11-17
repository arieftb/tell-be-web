import { z } from "zod";
import LeaderboardUser, { LeaderboardUserSchema } from "./LeaderboardUser.js";

export const LeaderboardSchema = z.object({
  user: LeaderboardUserSchema,
  score: z.number().int().min(0),
});

export default class Leaderboard {
  constructor(payload) {
    const validationResult = LeaderboardSchema.safeParse(payload);
    if (!validationResult.success) {
      throw new Error(
        `LEADERBOARD.VALIDATION_ERROR: ${validationResult.error.message}`,
      );
    }

    const { user, score } = validationResult.data;
    this.user = new LeaderboardUser(user);
    this.score = score;
  }
}
