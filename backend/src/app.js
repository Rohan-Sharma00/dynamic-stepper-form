const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const serverless = require("serverless-http"); // 1. Import serverless-http

const { connectDB } = require("./config/database");
const formRoutes = require("./routes/form.routes");
const submissionRoutes = require("./routes/submission.routes");

const app = express();

// 2. Dynamically allow both local development and your production Netlify URL
const allowedOrigins = ["http://localhost:5173", "https://your-netlify-app-name.netlify.app"];
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

// 3. Establish Database Connection for Serverless environments
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

// 4. Netlify serverless functions expect the entry point to match the function name mapping
app.use("/.netlify/functions/server/api/forms", formRoutes);
app.use("/.netlify/functions/server/api/submissions", submissionRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

// 5. Keep app.listen only for your local development environment
if (process.env.NODE_ENV === "local") {
  connectDB().then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running locally on port ${process.env.PORT || 5000}`);
    });
  });
}

// 6. Export for Netlify Engine
module.exports = app;
module.exports.handler = serverless(app);