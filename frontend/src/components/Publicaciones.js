import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001";

export default function Publicaciones() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/publicaciones")
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="box publicaciones">
      <h2>📢 Comunicados RRHH</h2>

      {data.map(p => (
        <div key={p.id} className="post-card">

          {/* HEADER */}
          <div className="post-header">
            <div className="avatar-small">RR</div>

            <div className="post-user">
              <strong>Recursos Humanos</strong>
              <p className="fecha">
                {new Date(p.fecha).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* CONTENIDO */}
          <h3>{p.titulo}</h3>
          <p>{p.contenido}</p>

          {/* MEDIA */}
          {p.media && (
            <div className="post-media">
              {p.media.endsWith(".mp4") ? (
                <video 
                  src={`${API_URL}${p.media}`} 
                  controls 
                />
              ) : (
                <img 
                  src={`${API_URL}${p.media}`} 
                  alt="" 
                />
              )}
            </div>
          )}

        </div>
      ))}
    </div>
  );
}