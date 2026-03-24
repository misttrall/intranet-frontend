import { useEffect, useState } from "react";
import axios from "axios";

const ITEMS_POR_PAGINA = 14;
const INTERVALO = 15000; // 15 segundos

export default function CumpleanosSlider() {
  const [data, setData] = useState([]);
  const [pagina, setPagina] = useState(0);

  useEffect(() => {
    axios.get("/api/cumpleanos")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  // total páginas
  const totalPaginas = Math.ceil(data.length / ITEMS_POR_PAGINA);

  // auto cambio de página
  useEffect(() => {
    if (totalPaginas === 0) return;

    const interval = setInterval(() => {
      setPagina(prev => (prev + 1) % totalPaginas);
    }, INTERVALO);

    return () => clearInterval(interval);
  }, [totalPaginas]);

  // slice de datos actual
  const inicio = pagina * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;
  const visibles = data.slice(inicio, fin);

  const formatFecha = (dia) => {
    const mes = new Date().getMonth() + 1;
    return `${dia}/${mes.toString().padStart(2, "0")}`;
  };

  return (
    <div className="box cumple-box">
      <h3>🎂 Cumpleaños</h3>

      <div className="cumple-lista">
        {visibles.map((c, i) => (
          <div key={i} className="cumple-row">

            <img
              src={c.foto || "https://via.placeholder.com/40"}
              alt={c.nombre}
              className="cumple-img"
            />

            <span className="nombre">{c.nombre}</span>

            <span className="fecha">{formatFecha(c.dia)}</span>

          </div>
        ))}
      </div>
    </div>
  );
}