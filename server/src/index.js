import cors from "cors";
import express from "express";
import morgan from "morgan";

const port = process.env.PORT ?? "4200";
import pdfRoutes from "./routes/pdf.routes.js";

const app = express();


//Middlewares
app.use(cors());
app.use(morgan("dev"));

// Parse incoming JSON requests. that wouldn't work for streaming
// because it reads the entire body into memory, so once parsed, the req stream is exhausted
// app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

//Routes
app.use("/pdf/", pdfRoutes);



app.listen(port, () => {
  console.log(`app listening on ${port}`);
});