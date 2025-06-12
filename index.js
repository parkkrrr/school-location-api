import "dotenv/config";
import express from "express";
import { addSchool, listSchools } from "./controller.js";
import "./database.js";
const app = express();
app.use(express.json());

function asyncHandler(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

app.post("/addSchool", asyncHandler(addSchool));
app.get("/listSchools", asyncHandler(listSchools));

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Something went wrong" });
});

app.listen(process.env.PORT, () => {
  console.log("Listening on Port: ", process.env.PORT);
});
