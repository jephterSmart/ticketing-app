import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scriptAsync = promisify(scrypt);

export const hash = async (password: string): Promise<string> => {
  const salt = randomBytes(8).toString("hex");
  const hashedPassword = (await scriptAsync(password, salt, 64)) as Buffer;
  return `${hashedPassword.toString("hex")}.${salt}`;
};

export const compare = async (storedPassword: string, rawPassword: string) => {
  const [hashedPassword, salt] = storedPassword.split(".");
  const newPassword = (await scriptAsync(rawPassword, salt, 64)) as Buffer;
  return hashedPassword === newPassword.toString("hex");
};
