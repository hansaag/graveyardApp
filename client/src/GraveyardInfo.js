import stromsoImg from "./images/stromso2.jpg";
import bragernesImg from "./images/bragernes.png";
import dummy from "./images/world-map-detailed.jpg";

export const graveyards = [
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
    fields: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
  },
  {
    id: 3,
    value: "Strømsgodset",
    img: dummy,
  },
  {
    id: 4,
    value: "Konnerud",
    img: dummy,
  },
];

export default graveyards;
