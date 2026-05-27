export const SCHOOL_INFO = {
  name: "EEB Professor Benonívio João Martins",
  shortName: "EEB Benonívio",
  inep: "42004047",
  phone: "(48) 3665-5774",
  email: "benonivio@sed.sc.gov.br",
  whatsapp: "https://wa.me/5548988354422",
  instagramHandle: "@escolabenonivio",
  instagramUrl: "https://instagram.com/escolabenonivio",
  address: {
    street: "Rua Monsenhor Roberto Landel de Moura",
    number: "S/N",
    neighborhood: "Brejaru",
    city: "Palhoça",
    state: "SC",
    zipCode: "88133-490",
    full: "Rua Monsenhor Roberto Landel de Moura, S/N - Brejaru, Palhoça - SC, 88133-490"
  }
};

export const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Sobre a Escola", href: "/sobre" },
  { label: "Feed de Avisos", href: "/#avisos" },
  { label: "Acervo Histórico", href: "/acervo" },
  { label: "Contato", href: "/#contato" }
] as const;
