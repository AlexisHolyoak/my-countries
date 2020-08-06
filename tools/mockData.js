const cities = [
  {
    id: 1,
    name: "Lima",
    slug: "lima",
    countryId: 1,
    habitants: "1700"
  },
  {
    id: 2,
    name: "Arequipa",
    slug: "arequipa",
    countryId: 1,
    habitants: "2300"
  },
  {
    id: 3,
    name: "Trujillo",
    slug: "trujillo",
    countryId: 1,
    habitants: "3800"
  },
  {
    id: 4,
    name: "Iquitos",
    slug: "iquitos",
    countryId: 1,
    habitants: "1605"
  },
  {
    id: 5,
    name: "Chimbote",
    slug: "chimbote",
    countryId: 1,
    habitants: "820"
  },
  {
    id: 6,
    title: "Santiago de Chile",
    slug: "santiago-de-chile",
    countryId: 2,
    habitants: "145"
  },
  {
    id: 7,
    title: "Puerto Montt",
    slug: "puerto-montt",
    countryId: 2,
    habitants: "145"
  },
  {
    id: 8,
    title: "Buenos Aires",
    slug: "buenos-aires",
    countryId: 3,
    habitants: "23200"
  },
  {
    id: 9,
    title: "Mar de Plata",
    slug: "mar-de-plata",
    countryId: 3,
    habitants: "89810"
  },
  {
    id: 10,
    title: "La Paz",
    slug: "la-paz",
    countryId: 4,
    habitants: "555400"
  },
  {
    id: 11,
    title: "Bogota",
    slug: "bogota",
    countryId: 5,
    habitants: "1254898"
  },
  {
    id: 12,
    title: "Quito",
    slug: "quito",
    countryId: 6,
    habitants: "985200"
  },
  {
    id: 13,
    title: "Asunción",
    slug: "asuncion",
    countryId: 7,
    habitants: "584100"
  },
  {
    id: 14,
    title: "Ciudad del Este",
    slug: "ciudad-del-este",
    countryId: 7,
    habitants: "23338789"
  },
  {
    id: 15,
    title: "Caracas",
    slug: "caracas",
    countryId: 8,
    habitants: "302235"
  },
  {
    id: 16,
    title: "Ciudad Bolivar",
    slug: "ciudad-bolivar",
    countryId: 8,
    habitants: "302235"
  }
];

const countries = [
  { id: 1, name: "Perú" },
  { id: 2, name: "Chile" },
  { id: 3, name: "Argentina" },
  { id: 4, name: "Bolivia" },
  { id: 5, name: "Colombia" },
  { id: 6, name: "Ecuador" },
  { id: 7, name: "Paraguay" },
  { id: 8, name: "Venezuela" },  
];

const newCity = {
  id: null,
  name: "",
  countryId: null,
  habitants: ""
};
const newCountry = {
  id: null,
  name: ""
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCity,
  newCountry,
  cities,
  countries
};