import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Founder from "./components/Founder";
import Portfolio from "./components/Portfolio";
import Products from "./components/Products";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  // Scroll suave para todos los links internos (#fundador, #portafolio, etc.)
  useEffect(() => {
    function handleClick(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <Founder />
      <Portfolio />
      <Products />
      <HowItWorks />
      <WhyUs />
      <Contact />
      <Footer />
    </>
  );
}
