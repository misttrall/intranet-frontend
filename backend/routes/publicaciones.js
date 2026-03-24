const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

let publicaciones = [
  {
    id: 1,
    titulo: "Bienvenidos",
    contenido: "Nueva intranet disponible",
    fecha: new Date()
  }
];

router.get("/", (req, res) => {
  res.json(publicaciones);
});

router.post("/", upload.single("media"), (req, res) => {
  const { titulo, contenido } = req.body;

  const nueva = {
    id: publicaciones.length + 1,
    titulo,
    contenido,
    media: req.file ? `/uploads/${req.file.filename}` : null,
    fecha: new Date()
  };

  publicaciones.unshift(nueva);
  res.json(nueva);
});

router.put("/:id", upload.single("media"), (req, res) => {
  const id = parseInt(req.params.id);
  const pub = publicaciones.find(p => p.id === id);

  if (!pub) {
    return res.status(404).json({ error: "No encontrada" });
  }

  pub.titulo = req.body.titulo;
  pub.contenido = req.body.contenido;

  if (req.file) {
    pub.media = `/uploads/${req.file.filename}`;
  }

  res.json(pub);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  publicaciones = publicaciones.filter(p => p.id !== id);

  res.json({ ok: true });
});

module.exports = router;