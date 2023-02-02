import mongoose from "mongoose";

/* Database connection configuration */
export const dbConnection = async () => {
  try {
    // const PROD_DB_URI: any = process.env.DB_URI;
    // const TEST_DB_URI: any = process.env.TEST_DB_URI;
    // const ENVIRONMENT: any = process.env.ENVIRONMENT;
 
    // const DB_URI: any = ENVIRONMENT === "TEST" ? TEST_DB_URI : PROD_DB_URI;
    const DB_URI: any = process.env.DB_URI;
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URI);

    console.log("Database connection established.");
    // console.log(`Application in ${ENVIRONMENT} environment mode.`);
  } catch (error: any) {
    if (error) {
      console.log(error);
      console.log("Failed to connect database.");
      // console.log(error);
    }
  }
};
