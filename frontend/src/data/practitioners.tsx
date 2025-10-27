
export interface Practitioner {
  id: string;
  name: string;
  title: string;
  email: string;
  specialty: string;
  imageUrl?: string;
}

export const practitioners: Practitioner[] = [
  {
    id: "1",
    name: "Dra. Ana Cardio",
    title: "Cardióloga clínica",
    email: "ana.cardio@healthtech.com",
    specialty: "Cardiología",
    imageUrl: "/images/practitioners/ana.jpg",
  },
  {
    id: "2",
    name: "Dr. Pablo Neuron",
    title: "Neurólogo infantil",
    email: "pablo.neuron@healthtech.com",
    specialty: "Neurología",
    imageUrl: "/images/practitioners/pablo.jpg",
  },
  {
    id: "3",
    name: "Dra. Laura Gastro",
    title: "Gastroenteróloga",
    email: "laura.gastro@healthtech.com",
    specialty: "Gastroenterología",
    imageUrl: "/images/practitioners/laura.jpg",
  },
]