// import dependencies
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from "express-session";

// import dotenv
import { config } from "dotenv";
config();

// database connection
import connnectDatabase from "./src/framework/database/config/dbConfig";

// import the route file
import { adminRoutes, userRoutes,ngoRoutes,restaurantRotues } from "./src/interface/routes";

// creat express application
const app = express();

// cors setting
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// user route
app.use('/', userRoutes);
app.use('/ngo', ngoRoutes);
app.use('/admin', adminRoutes);
app.use('/restaurant', restaurantRotues);

// database connecting & app listen
const port = process.env.PORT || 8000;
connnectDatabase()
  .then((res) => {
    console.log(res);
    app.listen(port, (): void => console.log(`Server running...`));
  })
  .catch((error) => console.log(`Failed to connect database`, error));
