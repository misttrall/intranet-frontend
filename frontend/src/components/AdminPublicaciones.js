import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPublicaciones() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [publicaciones, setPublicaciones] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [media, setMedia] = useState(null);

  // cargar publicaciones
  const cargarPublicaciones = () => {
    axios.get("/api/publicaciones")
      .then(res => setPublicaciones(res.data));
  };

  useEffect(() => {
    cargarPublicaciones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo || !contenido) {
      setMensaje("⚠️ Completa todos los campos");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("contenido", contenido);

    if (media) {
      formData.append("media", media);
    }

    try {
      await axios.post("/api/publicaciones", formData);

      setTitulo("");
      setContenido("");
      setMedia(null);
      setMensaje("✅ Publicación creada");

      cargarPublicaciones();

    } catch (error) {
      console.error(error);
      setMensaje("❌ Error al publicar");
    }
  };

  // eliminar publicación
  const eliminar = async (id) => {
    try {
      await axios.delete(`/api/publicaciones/${id}`);
      cargarPublicaciones();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-container">

      <h1>🛠️ Panel RRHH</h1>

      {/* FORMULARIO */}
      <div className="admin-card">
        <h3>Crear publicación</h3>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <input 
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setMedia(e.target.files[0])}
          />

          <textarea
            placeholder="Contenido..."
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
          />

          <button type="submit">Publicar</button>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </div>

      {/* LISTA */}
      <div className="admin-card">
        <h3>Publicaciones</h3>

        {publicaciones.map(p => (
          <div key={p.id} className="admin-post">

            <div>
              <strong>{p.titulo}</strong>
              <p>{p.contenido}</p>

              {/* MEDIA */}
              {p.media && (
                p.media.endsWith(".mp4") ? (
                  <video src={p.media} controls width="200" />
                ) : (
                  <img src={p.media} alt="" width="200" />
                )
              )}
            </div>

            <button 
              className="btn-delete"
              onClick={() => eliminar(p.id)}
            >
              ❌
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}