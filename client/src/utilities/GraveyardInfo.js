import stromsoImg from "../images/stromso2.jpg";
import bragernesImg from "../images/bragernes.png";
import StrømsgodsetImg from "../images/stromsgodset.png";
import KonnerudImg from "../images/konnerud.png";

import sitteKlipper from "../images/sitteklipper.png";
import gaaKlipper from "../images/gaaklipper.png";
import trimmer from "../images/trimmer.png";
import blomster from "../images/flowers.png";
import kvist from "../images/tree-branch.png";
import vannkanne from "../images/watering-can.png";
import leafblower from "../images/leaf-blower.png";
import hedgetrimmer from "../images/hedge-trimmer.png";
import plow from "../images/plow.png";
import scythe from "../images/scythe.png";

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

const fieldActivities = [
  {
    id: 1,
    value: "Gåklippet",
    dbValue: "gåklippet",
    tag: "field",
    img: gaaKlipper,
  },
  {
    id: 2,
    value: "Sitteklippet",
    dbValue: "sitteklippet",
    tag: "field",
    img: sitteKlipper,
  },
  {
    id: 3,
    value: "Kantklippet",
    dbValue: "kantklippet",
    tag: "field",
    img: trimmer,
  },
  {
    id: 4,
    value: "Blomster stelt",
    dbValue: "blomsterstell",
    tag: "field",
    img: blomster,
  },
  {
    id: 5,
    value: "Klippet hekk",
    dbValue: "klippet_hekk",
    tag: "field",
    img: hedgetrimmer,
  },

  {
    id: 6,
    value: "Skjegget trær",
    dbValue: "skjegget_trær",
    tag: "field",
    img: scythe,
  },
  {
    id: 7,
    value: "Begravelse",
    dbValue: "begravelse",
    tag: "field",
    img: sitteKlipper,
  },
];

const globalActivities = [
  {
    id: 1,
    value: "Vannet",
    dbValue: "vannet",
    tag: "global",
    img: vannkanne,
  },
  {
    id: 2,
    value: "Sloddet",
    dbValue: "slaaddet",
    tag: "global",
    img: plow,
  },
  {
    id: 3,
    value: "Blåst veier",
    dbValue: "blaast_veier",
    tag: "global",
    img: leafblower,
  },
  {
    id: 4,
    value: "Fjernet kvist",
    dbValue: "fjernet_kvist",
    tag: "global",
    img: kvist,
  },
];

const extraActivities = [
  {
    id: 1,
    value: "Vannet",
    dbValue: "vannet",
    tag: "extra",
    img: vannkanne,
  },
  {
    id: 2,
    value: "Vannet",
    dbValue: "vannet",
    tag: "extra",
    img: vannkanne,
  },
  {
    id: 3,
    value: "Vannet",
    dbValue: "vannet",
    tag: "extra",
    img: vannkanne,
  },
  {
    id: 4,
    value: "Vannet",
    dbValue: "vannet",
    tag: "extra",
    img: vannkanne,
  },
];

export { graveyards, fieldActivities, globalActivities, extraActivities };
