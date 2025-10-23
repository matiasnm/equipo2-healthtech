import { ReactElement } from "react";
import { GiHeartOrgan, GiBrain, GiStomach, GiKidneys, GiBabyBottle, GiPelvisBone, GiBoneKnife, GiEyeTarget, GiChemicalDrop, GiSoap, GiPsychicWaves,} from "react-icons/gi";

export interface Specialty {
  name: string;
  imageUrl: string;
  icon: ReactElement;
  gradientClass: string;
  linkTo: string;
}

export const specialties: Specialty[] = [
  {
    name: "Cardiología",
    imageUrl: "https://images.pexels.com/photos/6129040/pexels-photo-6129040.jpeg",
    icon: <GiHeartOrgan />,
    gradientClass: "bg-gradient-cardiología",
    linkTo: "#cardiología",
  },
  {
    name: "Neurología",
    imageUrl: "https://images.pexels.com/photos/4226123/pexels-photo-4226123.jpeg",
    icon: <GiBrain />,
    gradientClass: "bg-gradient-neurología",
    linkTo: "#neurología",
  },
  {
    name: "Gastroenterología",
    imageUrl: "https://images.pexels.com/photos/7659573/pexels-photo-7659573.jpeg",
    icon: <GiStomach />,
    gradientClass: "bg-gradient-gastroenterología",
    linkTo: "#gastroenterología",
  },
  {
    name: "Nefrología",
    imageUrl: "https://images.pexels.com/photos/6129688/pexels-photo-6129688.jpeg",
    icon: <GiKidneys />,
    gradientClass: "bg-gradient-nefrología",
    linkTo: "#nefrología",
  },
  {
    name: "Pediatría",
    imageUrl: "https://images.pexels.com/photos/5998445/pexels-photo-5998445.jpeg",
    icon: <GiBabyBottle />,
    gradientClass: "bg-gradient-pediatría",
    linkTo: "#pediatría",
  },
  {
    name: "Ginecología",
    imageUrl: "https://images.pexels.com/photos/7089015/pexels-photo-7089015.jpeg",
    icon: <GiPelvisBone />,
    gradientClass: "bg-gradient-ginecología",
    linkTo: "#ginecología",
  },
  {
    name: "Traumatología",
    imageUrl: "https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg",
    icon: <GiBoneKnife />,
    gradientClass: "bg-gradient-traumatología",
    linkTo: "#traumatología",
  },
  {
    name: "Psiquiatría",
    imageUrl: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg",
    icon: <GiPsychicWaves />,
    gradientClass: "bg-gradient-psiquiatría",
    linkTo: "#psiquiatría",
  },
];

