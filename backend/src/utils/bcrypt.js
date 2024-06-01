import bcrypt from "bcryptjs";
const saltRounds = 10;

// Function to hash a password
async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

// Function to compare a password with a hashed password
async function comparePassword(password, hashedPassword) {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
}

const BCRYPT = { hashPassword, comparePassword };
export default BCRYPT;
