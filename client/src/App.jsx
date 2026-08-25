import { useEffect } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Portfolio from "./components/Portfolio";
import HowItWorks from "./components/HowItWorks";
import Founder from "./components/Founder";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
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
      <Nav />
      <Hero />
      <Products />
      <Portfolio />
      <HowItWorks />
      <Founder />
      <WhyUs />
      <Testimonials />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
