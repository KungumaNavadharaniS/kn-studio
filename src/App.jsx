import useSmoothScroll from "./hooks/useSmoothScroll";
import Navbar from "./components/Navbar";
import HeroScene from "./components/HeroScene";
import AboutScene from "./components/AboutScene";
import WorksScene from "./components/WorksScene";
import ConnectScene from "./components/ConnectScene";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
export default function App() {
  useSmoothScroll();

  return (
    <>
      <Navbar />
      <main className="kn-studio">
        <HeroScene />
        <AboutScene />
        <WorksScene />
        <Experience />
        <ConnectScene />
      </main>
      <Footer />
    </>
  );
}
