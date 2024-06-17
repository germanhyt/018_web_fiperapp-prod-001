import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      userId: number;
      email: string;
      token: string;
      name?: string;
      image?: string;
      profile?: Profile | null;
      account?: Account | null;
    };
  }

  interface Account {
    provider: string;
  }

  interface Profile {
    email: string;
    email_verified: boolean;
  }
}
