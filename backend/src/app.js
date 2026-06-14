const dotenv = require("dotenv");
dotenv.config();
console.log("Mongo URI exists:", !!process.env.MONGODB_URI);
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const serverless = require("serverless-http"); 

const { connectDB } = require("./config/database");
const formRoutes = require("./routes/form.routes");
const submissionRoutes = require("./routes/submission.routes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "https://multi-step-draft-form.netlify.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  }
  next();
});

app.use("/api/forms", formRoutes);
app.use("/api/submissions", submissionRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

if (process.env.NODE_ENV !== "production") {
  connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running locally on port ${process.env.PORT || 5000}`);
    });
  });
}

const handler = serverless(app);

module.exports = {
  handler,
};