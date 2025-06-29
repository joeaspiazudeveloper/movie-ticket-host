export interface Movie {
  id: number;
  title: string;
  imageUrl: string;
}

export interface MovieAvailability extends Movie {
  ticketsAvailable: number;
}