import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";
// Derive a 32-byte key from JWT_SECRET or fallback
const SECRET_KEY = crypto
  .createHash("sha256")
  .update(process.env.JWT_SECRET || "default_secret_key_32_bytes_long!")
  .digest();

export const encrypt = (text) => {
  if (!text) return "";
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
};

export const decrypt = (encryptedData) => {
  if (!encryptedData) return "";
  try {
    const parts = encryptedData.split(":");
    if (parts.length !== 2) return encryptedData; // fallback if plain text
    const iv = Buffer.from(parts[0], "hex");
    const encryptedText = parts[1];
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    return encryptedData; // fallback if decryption fails
  }
};
