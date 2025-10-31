import { ReactElement } from "react";

export interface Specialty {
  code: string;       
  name: string;
  imageUrl: string;
  icon: ReactElement;
  gradientClass: string;
  linkTo: string;
}
