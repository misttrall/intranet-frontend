const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const FILE_PATH = path.join(__dirname, "../data/cumples.json");

// 🔹 Helper: verificar si cache es válido (5 días)
function isCacheValid() {
  if (!fs.existsSync(FILE_PATH)) return false;

  const stats = fs.statSync(FILE_PATH);
  const now = new Date();
  const modified = new Date(stats.mtime);

  const diffDays = (now - modified) / (1000 * 60 * 60 * 24);

  return diffDays <= 5;
}

// 🔹 Obtener datos desde BUK
async function fetchFromBuk() {
  const mesActual = new Date().getMonth() + 1;
  let page = 1;
  let totalPages = 1;
  let resultados = [];

  do {
    const response = await fetch(
      `https://invertec.buk.cl/api/v1/chile/employees/active?page=${page}&page_size=40`,
      {
        headers: {
          "auth_token": process.env.BUK_TOKEN,
          "Accept": "*/*"
        }
      }
    );

    const data = await response.json();

    totalPages = data.pagination.total_pages;

    data.data.forEach(emp => {
      const mes = parseInt(emp.birthday.substring(5, 7));
      const dia = emp.birthday.substring(8, 10);

      if (mes === mesActual) {
        resultados.push({
          nombre: `${emp.first_name.split(" ")[0]} ${emp.surname}`,
          dia,
          foto: emp.picture_url
        });
      }
    });

    page++;
  } while (page <= totalPages);

  // ordenar por día
  resultados.sort((a, b) => a.dia - b.dia);

  return resultados;
}

// 🔹 Ruta principal
router.get("/", async (req, res) => {
  try {
    let data;

    if (isCacheValid()) {
      console.log("📦 Usando cache...");
      data = JSON.parse(fs.readFileSync(FILE_PATH));
    } else {
      console.log("🌐 Consultando BUK...");
      data = await fetchFromBuk();

      // asegurar carpeta
      fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });

      fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    }

    res.json(data);

  } catch (error) {
    console.error("ERROR CUMPLEAÑOS:", error);
    res.status(500).json({ error: "Error obteniendo cumpleaños" });
  }
});

module.exports = router;