import {z} from 'zod';

export const LeaderboardUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().nullable(),
  avatar: z.string().url(),
});

export default class LeaderboardUser {
  constructor(payload) {
    const validationResult = LeaderboardUserSchema.safeParse(payload);
    if (!validationResult.success) {
      throw new Error(
          `LEADERBOARD_USER.VALIDATION_ERROR: 
          ${validationResult.error.message}`,
      );
    }

    const {id, name, email, avatar} = validationResult.data;
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
  }
}
