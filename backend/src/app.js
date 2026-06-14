const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const { connectDB } = require("./config/database");

const formRoutes = require("./routes/form.routes");
const submissionRoutes = require("./routes/submission.routes");

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.use("/api/forms", formRoutes);

app.use(
  "/api/submissions",
  submissionRoutes
);

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message:
      err.message ||
      "Something went wrong",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on port ${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();