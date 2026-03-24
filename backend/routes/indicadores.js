const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://mindicador.cl/api");
    const data = await response.json();

    res.json({
      uf: data.uf.valor,
      utm: data.utm.valor,
      dolar: data.dolar.valor,
      euro: data.euro.valor
    });
  } catch (error) {
    console.error(error); // 👈 AGREGA ESTO
    res.status(500).json({ error: "Error indicadores" });
  }
});

module.exports = router;