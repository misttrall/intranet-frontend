import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("/api/indicadores")
      .then(res => setData(res.data));
  }, []);

  return (
    <div className="box sidebar">
      <h3>📊 Indicadores</h3>

      {data && (
        <div className="indicadores">
          <div className="indicador">
            <span>UF</span>
            <strong>{data.uf}</strong>
          </div>
          <div className="indicador">
            <span>UTM</span>
            <strong>{data.utm}</strong>
          </div>
          <div className="indicador">
            <span>Dólar</span>
            <strong>{data.dolar}</strong>
          </div>
          <div className="indicador">
            <span>Euro</span>
            <strong>{data.euro}</strong>
          </div>
        </div>
      )}

      <h3>🔗 Links</h3>
      <ul className="links">
        <li><a href="#">Portal BUK</a></li>
        <li><a href="#">Correo</a></li>
        <li><a href="#">Soporte TI</a></li>
      </ul>
    </div>
  );
}