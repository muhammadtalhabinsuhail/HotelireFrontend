export interface Destination {
  id: string;
  name: string;
  properties: string;
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: string;
  reviews: string;
  image: string;
  stars: string;
}

export interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: string;
  reviews: string;
  image: string;
  stars: string;
}

export interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
}

export interface Listing {
  id: string;
  name: string;
  location: string;
  type: string;
  rating: string;
  reviews: string;
  image: string;
  stars: string;
  price: string;
  amenities: string[];
  checkIn: string;
  checkOut: string;
  description: string;
}
