import { ReactElement } from "react";
import {
  GiHeartOrgan,
  GiBrain,
  GiStomach,
  GiKidneys,
  GiBabyBottle,
  GiPelvisBone,
  GiBoneKnife,
  GiEyeTarget,
  GiChemicalDrop,
  GiSoap,
  GiPsychicWaves,
} from "react-icons/gi";

export interface Specialty {
  code: string;        
  name: string;
  imageUrl: string;
  icon: ReactElement;
  gradientClass: string;
  linkTo: string;
}

export const specialties: Specialty[] = [
  {
    code: "CARD", 
    name: "Cardiología",
    imageUrl: "https://img.mbst.com.ar/panfamanager/health/speciality/cardiologia.jpg",
    icon: <GiHeartOrgan />,
    gradientClass: "bg-gradient-cardiología",
    linkTo: "#cardiología",
  },
  {
    code: "NEUR",
    name: "Neurología",
    imageUrl: "https://img.mbst.com.ar/panfamanager/health/speciality/neurologia.jfif",
    icon: <GiBrain />,
    gradientClass: "bg-gradient-neurología",
    linkTo: "#neurología",
  },
  {
    code: "GAST",
    name: "Gastroenterología",
    imageUrl: "https://img.mbst.com.ar/panfamanager/health/speciality/gastro.jfif",
    icon: <GiStomach />,
    gradientClass: "bg-gradient-gastroenterología",
    linkTo: "#gastroenterología",
  },
  {
    code: "NEFR",
    name: "Nefrología",
    imageUrl: "https://img.mbst.com.ar/panfamanager/health/speciality/nefrologia.jpg",
    icon: <GiKidneys />,
    gradientClass: "bg-gradient-nefrología",
    linkTo: "#nefrología",
  },
  {
    code: "PEDI",
    name: "Pediatría",
    imageUrl: "https://img.mbst.com.ar/panfamanager/health/speciality/pediatría.webp",
    icon: <GiBabyBottle />,
    gradientClass: "bg-gradient-pediatría",
    linkTo: "#pediatría",
  },
  {
    code: "GINE",
    name: "Ginecología",
    imageUrl: "https://img.mbst.com.ar/panfamanager/health/speciality/Ginecologia.png",
    icon: <GiPelvisBone />,
    gradientClass: "bg-gradient-ginecología",
    linkTo: "#ginecología",
  },
  {
    code: "TRAU",
    name: "Traumatología",
    imageUrl: "https://img.mbst.com.ar/panfamanager/health/speciality/traumatologia.jfif",
    icon: <GiBoneKnife />,
    gradientClass: "bg-gradient-traumatología",
    linkTo: "#traumatología",
  },
  {
    code: "PSIQ",
    name: "Psiquiatría",
    imageUrl: "https://img.mbst.com.ar/panfamanager/health/speciality/psiquiatria.jpg",
    icon: <GiPsychicWaves />,
    gradientClass: "bg-gradient-psiquiatría",
    linkTo: "#psiquiatría",
  },

  {
    code: "OFTA",
    name: "Oftalmología",
    imageUrl: "https://img.mbst.com.ar/panfamanager/health/speciality/oftalmologia.jfif",
    icon: <GiEyeTarget />,
    gradientClass: "bg-gradient-oftalmología",
    linkTo: "#oftalmología",
  },
  {
    code: "ENDO",
    name: "Endocrinología",
    imageUrl: "https://img.mbst.com.ar/panfamanager/health/speciality/endocrinologia.jfif",
    icon: <GiChemicalDrop />,
    gradientClass: "bg-gradient-endocrinología",
    linkTo: "#endocrinología",
  },
  {
    code: "DERM",
    name: "Dermatología",
    imageUrl: "https://img.mbst.com.ar/panfamanager/health/speciality/dermatologia.jpg",
    icon: <GiSoap />,
    gradientClass: "bg-gradient-dermatología",
    linkTo: "#dermatología",
  },

];


