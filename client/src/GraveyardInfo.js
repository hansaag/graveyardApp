import stromsoImg from "./images/stromso2.jpg";
import bragernesImg from "./images/bragernes.png";
import StrømsgodsetImg from "./images/stromsgodset.png";
import KonnerudImg from "./images/konnerud.png";

import dummy from "./images/world-map-detailed.jpg";

const graveyards = [
  {
    id: 1,
    value: "Strømsø",
    img: stromsoImg,
    fields: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
  },
  {
    id: 2,
    value: "Bragernes",
    img: bragernesImg,
    fields: [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
    ],
  },
  {
    id: 3,
    value: "Strømsgodset",
    img: StrømsgodsetImg,
    fields: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
  },
  {
    id: 4,
    value: "Konnerud",
    img: KonnerudImg,
    fields: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
  },
];

const weeklyActivities = [
  {
    id: 1,
    value: "Gåklippet",
    img: null,
  },
  {
    id: 2,
    value: "Sitteklippet",
    img: null,
  },
  {
    id: 3,
    value: "Kantklippet",
    img: null,
  },
  {
    id: 4,
    value: "Vannet",
    img: null,
  },
  {
    id: 5,
    value: "Blomster stelt",
    img: null,
  },
  {
    id: 6,
    value: "Fjernet kvist",
    img: null,
  },
  {
    id: 7,
    value: "Luket graver",
    img: null,
  },
  {
    id: 8,
    value: "Skjegget trær",
    img: null,
  },
  {
    id: 9,
    value: "Begravelse",
    img: null,
  },
];

export { graveyards, weeklyActivities };
