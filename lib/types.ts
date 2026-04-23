export interface Week {
  id: number;
  photos: string[];
  book: string;
  location: string;
  parsha: { he: string; en: string };
  verse: { he: string; en: string; source: string };
  coords: [number, number];
}

export interface Book {
  id: string;
  he: string;
  en: string;
  subtitle: string;
  color: string;
  narrative: string;
  weekRange: [number, number];
}
