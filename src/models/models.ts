export interface User {
  avatarURL: string;
  username: string;
  snowflake: string;
  watched: boolean;
}

export interface Guild {
  id: string;
  users: User[];
  totalOnline: number;
  guildImage?: string;
}

export interface CreeperInfo {
  messages: string[];
  guilds: Guild[];
}
