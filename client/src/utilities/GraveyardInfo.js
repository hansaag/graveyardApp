import stromsoImg from "../images/stromso2.jpg";
import bragernesImg from "../images/bragernes.png";
import StrømsgodsetImg from "../images/stromsgodset.png";
import KonnerudImg from "../images/konnerud.png";
import tangenImg from "../images/tangen.png";

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

/* The following array is a template for the graveyards that includes the name image
and field mapping */

const graveyards = [
  {
    id: 1,
    value: "Strømsø",
    img: stromsoImg,
    fields: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"],
  },
  {
    id: 2,
    value: "Tangen",
    img: tangenImg,
    fields: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"],
  },
  {
    id: 2,
    value: "Bragernes",
    img: bragernesImg,
    fields: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P",],
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

/* The following values describe when a task is critical (red)
or approaching critical (yellow) for each activity */

const fieldActivities = [
  {
    id: 1,
    value: "Gåklippet",
    dbValue: "gåklippet",
    tag: "field",
    img: gaaKlipper,
    yellow: 7,
    red: 10,
  },
  {
    id: 2,
    value: "Sitteklippet",
    dbValue: "sitteklippet",
    tag: "field",
    img: sitteKlipper,
    yellow: 7,
    red: 10,
  },
  {
    id: 3,
    value: "Kantklippet",
    dbValue: "kantklippet",
    tag: "field",
    img: trimmer,
    yellow: 7,
    red: 12,
  },
  {
    id: 4,
    value: "Blomster stelt",
    dbValue: "blomsterstell",
    tag: "field",
    img: blomster,
    yellow: 6,
    red: 8,
  },
  {
    id: 5,
    value: "Klippet hekk",
    dbValue: "klippet_hekk",
    tag: "field",
    img: hedgetrimmer,
    yellow: 30,
    red: 50,
  },

  {
    id: 6,
    value: "Skjegget trær",
    dbValue: "skjegget_trær",
    tag: "field",
    img: scythe,
    yellow: 50,
    red: 100,
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
    yellow: 3,
    red: 6,
  },
  {
    id: 2,
    value: "Sloddet",
    dbValue: "slaaddet",
    tag: "global",
    img: plow,
    yellow: 6,
    red: 13,
  },
  {
    id: 3,
    value: "Blåst veier",
    dbValue: "blaast_veier",
    tag: "global",
    img: leafblower,
    yellow: 6,
    red: 13,
  },
  {
    id: 4,
    value: "Fjernet kvist",
    dbValue: "fjernet_kvist",
    tag: "global",
    img: kvist,
    yellow: 10,
    red: 20,
  },
];

/* not yet requested or implemeted */

const extraActivities = [];

export { graveyards, fieldActivities, globalActivities, extraActivities };
