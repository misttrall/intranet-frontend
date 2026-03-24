require("dotenv").config();
const express = require("express");
const cors = require("cors");

const indicadores = require("./routes/indicadores");
const publicaciones = require("./routes/publicaciones");
const cumpleanos = require("./routes/cumpleanos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/indicadores", indicadores);
app.use("/api/publicaciones", publicaciones);
app.use("/api/cumpleanos", cumpleanos);
app.use("/uploads", express.static("uploads"));

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en puerto " + process.env.PORT);
});