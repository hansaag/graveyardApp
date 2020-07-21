import stromsoImg from "./images/stromso2.jpg";
import bragernesImg from "./images/bragernes.png";
import StrømsgodsetImg from "./images/stromsgodset.png";
import KonnerudImg from "./images/konnerud.png";

import sitteKlipper from "./images/sitteklipper.png";
import gaaKlipper from "./images/gaaklipper.png";
import trimmer from "./images/trimmer.png";
import blomster from "./images/flowers.png";
import kvist from "./images/tree-branch.png";
import vannkanne from "./images/watering-can.png";
import leafblower from "./images/leaf-blower.png";
import hedgetrimmer from "./images/hedge-trimmer.png";
import plow from "./images/plow.png";

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
    img: gaaKlipper,
  },
  {
    id: 2,
    value: "Sitteklippet",
    img: sitteKlipper,
  },
  {
    id: 3,
    value: "Kantklippet",
    img: trimmer,
  },
  {
    id: 4,
    value: "Vannet",
    img: vannkanne,
  },
  {
    id: 5,
    value: "Blomsterstell",
    img: blomster,
  },
  {
    id: 6,
    value: "Fjernet kvist",
    img: kvist,
  },
  {
    id: 7,
    value: "Begravelse",
    img: sitteKlipper,
  },
];

const globalActivities = [
  {
    id: 1,
    value: "Vannet",
    img: vannkanne,
  },
  {
    id: 2,
    value: "Sloddet",
    img: plow,
  },
  {
    id: 3,
    value: "Blåst veier",
    img: leafblower,
  },
  {
    id: 4,
    value: "Hekkeklipp",
    img: hedgetrimmer,
  },
];

export { graveyards, weeklyActivities, globalActivities };
