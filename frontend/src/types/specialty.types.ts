import { ReactElement } from "react";

export interface Specialty {
  name: string;
  imageUrl: string;
  icon: ReactElement;
  gradientClass: string;
  linkTo: string;
}
