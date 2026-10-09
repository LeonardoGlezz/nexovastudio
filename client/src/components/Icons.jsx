// Iconos de línea, sin librerías externas (así no cargan nada de internet y respetan la CSP).
const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true };

export const ICONS = {
  consult: (
    <svg {...base}><circle cx="12" cy="12" r="9" /><path d="M9.5 9.2a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.2-2.5 3.6" /><circle cx="12" cy="17" r=".5" fill="currentColor" /></svg>
  ),
  chatbot: (
    <svg {...base}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4H6.5A2.5 2.5 0 0 1 4 13.5z" /><path d="M8.5 8.5h7M8.5 11.5h4" /></svg>
  ),
  automation: (
    <svg {...base}><rect x="3" y="4" width="6" height="5" rx="1.2" /><rect x="15" y="4" width="6" height="5" rx="1.2" /><rect x="9" y="15" width="6" height="5" rx="1.2" /><path d="M9 6.5h6M6 9v2.5a1.5 1.5 0 0 0 1.5 1.5H12v2M18 9v2.5a1.5 1.5 0 0 1-1.5 1.5H12" /></svg>
  ),
  software: (
    <svg {...base}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 9v11" /><path d="M12 13.5h6M12 16.5h4" /></svg>
  ),
  mobile: (
    <svg {...base}><rect x="7" y="2.5" width="10" height="19" rx="2.2" /><path d="M10.5 18.5h3" /></svg>
  ),
  bell: (
    <svg {...base}><path d="M18 8.5a6 6 0 1 0-12 0c0 6.5-2.5 8-2.5 8h17s-2.5-1.5-2.5-8" /><path d="M13.7 20a2 2 0 0 1-3.4 0" /></svg>
  ),
  check: (
    <svg {...base}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
  ),
};
