import CumpleanosSlider from "./components/CumpleanosSlider";
import Publicaciones from "./components/Publicaciones";
import Sidebar from "./components/Sidebar";
import "./styles.css"; // 👈 IMPORTANTE

export default function Home() {
  return (
    <div className="layout">
      <CumpleanosSlider />
      <Publicaciones />
      <Sidebar />
    </div>
  );
}