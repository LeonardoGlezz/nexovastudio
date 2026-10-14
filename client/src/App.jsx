import { useEffect, useState } from "react";
import { Header, Hero } from "./components/Header";
import { DemoSection, Portfolio } from "./components/Showcase";
import { Services, Process, Faq, ContactBand, Footer } from "./components/Info";
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

  return (
    <div id="inicio">
      <Header user={user} onPanel={() => setPanelOpen(true)} onAccount={() => setAccountOpen(true)} />
      <main>
        <Hero />
        <DemoSection />
        <Portfolio refreshKey={dataVersion} />
        <Services />
        <Process />
        <Faq />
        <ContactBand />
      </main>
      <Footer onAccess={() => setAccountOpen(true)} />

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
    </div>
  );
}
