const STATS = [
  { num: "3", suffix: "+", label: "Proyectos reales desarrollados" },
  { num: "48", suffix: "h", label: "Entrega de primer demo" },
  { num: "8", suffix: "+", label: "Tecnologías dominadas" },
  { num: "100", suffix: "%", label: "Desarrollo directo, sin intermediarios" },
];

export default function Stats() {
  return (
    <div className="stats">
      {STATS.map((s) => (
        <div className="stat" key={s.label}>
          <div className="stat-num">
            {s.num}
            <span>{s.suffix}</span>
          </div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}