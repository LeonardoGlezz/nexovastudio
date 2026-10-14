import { useEffect, useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Showcase from "./components/Showcase";
import WhatsAppFab from "./components/WhatsAppFab";
import Products from "./components/Products";
import Portfolio from "./components/Portfolio";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Account from "./components/Account";
import Admin from "./components/Admin";
import { getCurrentUser } from "./api";

export default function App() {
  const [user, setUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  // Sube cada vez que el panel cambia algo, para que el portafolio público se vuelva a cargar
  const [dataVersion, setDataVersion] = useState(0);

  // Si ya había una sesión guardada, la recupera al cargar la página
  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  // Scroll suave para los links internos (#servicios, #trabajo, etc.)
  useEffect(() => {
    function handleClick(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const href = link.getAttribute("href");
      if (href === "#" || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 68, behavior: "smooth" });
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <Nav user={user} onAccount={() => setAccountOpen(true)} />
      <Hero />
      <Showcase />
      <Products />
      <Portfolio refreshKey={dataVersion} />
      <HowItWorks />
      <WhyUs />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
      <WhatsAppFab />
      {accountOpen && (
        <Account
          user={user}
          onUser={setUser}
          onClose={() => setAccountOpen(false)}
          onOpenPanel={() => { setAccountOpen(false); setPanelOpen(true); }}
        />
      )}
      {panelOpen && user?.role === "admin" && (
        <Admin user={user} onClose={() => setPanelOpen(false)} onChanged={() => setDataVersion((v) => v + 1)} />
      )}
    </>
  );
}
