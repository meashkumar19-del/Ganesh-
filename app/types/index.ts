export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  image: string;
  rate: number;
  rating: number;
  verified: boolean;
  languages: string[];
  specialties: string[];
  description: string;
  availability: string[];
}

export interface Booking {
  id: string;
  profileId: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}
