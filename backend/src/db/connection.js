import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    const { connection } = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`,
      {
        autoIndex: true,
      }
    );
    console.log(
      `MongoDB Connected :: On ${connection.host} with port No ${connection.port}`
    );
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR ::", error.message);
    process.exit(1); // Exit process with failure
  }
};
