// 👉 EDITA ESTOS DATOS con tu información real. Se usan en el formulario, el botón flotante
// de WhatsApp y el pie de página, así que solo hay que cambiarlos aquí.
export const CONTACT_INFO = {
  whatsapp: "522226709233", // con código de país (52 = México)
  whatsappLabel: "222 670 9233",
  email: "contacto.nexovastudio@gmail.com",
  instagram: "https://www.instagram.com/nexovastudio_/",
  linkedin: "https://www.linkedin.com/in/leonardo-gonz%C3%A1lez-cuevas-4ab742219/",
};

export const whatsappUrl = (text = "Hola Nexova Studio") =>
  `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
