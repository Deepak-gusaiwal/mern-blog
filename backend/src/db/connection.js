import mongoose from "mongoose";
export const connectDb = async () => {
  try {
    const { connection:{host,port} } = await mongoose.connect( `${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
    console.log(
      `MongoDB Connected :: On ${host} with port No ${port}`
    );
  } catch (error) {
    console.error("MONGODB CONNECTION ERROR ::", error.message);
    process.exit(1); // Exit process with failure
  }
};
