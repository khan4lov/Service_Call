
export const CategoryType = {
  AC_APPLIANCE: 'AC & Appliance Repair',
  CLEANING: 'Home Cleaning',
  PLUMBING: 'Plumbing',
  ELECTRICIAN: 'Electrician',
  PAINTING: 'Painting & Renovation',
  BEAUTY_MEN: 'Men\'s Salon & Massage',
  BEAUTY_WOMEN: 'Beauty & Spa',
  PEST_CONTROL: 'Pest Control',
  CARPENTRY: 'Carpentry',
  CAR_RENTAL: 'Car Rental & Taxi',
  LABOUR: 'Daily Labour',
  MISTRI: 'Mistri (Mason)',
  HOUSE_HELPER: 'House Helper (Bai)',
  WELDING: 'Welding & Fabrication',
  ROOF_PANEL: 'Ceiling & Wall Panels'
} as const;

export type CategoryType = typeof CategoryType[keyof typeof CategoryType];

export type UserRole = 'ADMIN' | 'PROVIDER';

export interface User {
  username: string;
  password?: string; // In a real app, this would be hashed or handled by auth provider
  role: UserRole;
  name: string;
  category?: CategoryType; // Only for providers
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: CategoryType;
  duration: string;
}

export interface Provider {
  id: string;
  name: string;
  rating: number;
  bio: string;
  image: string;
  categories: CategoryType[];
  completedJobs: number;
  experience: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export type BookingStatus = 'PENDING' | 'ASSIGNED' | 'COMPLETED' | 'CANCELLED';

export interface BookingDetails {
  id: string;
  serviceId: string;
  serviceName: string;
  category: CategoryType;
  date: string;
  time: string;
  address: string;
  customerName: string;
  customerPhone: string;
  price: number;
  status: BookingStatus;
  createdAt: string;
  providerId?: string; // Username of the assigned provider
}

export interface RegistrationForm {
  id: string;
  fullName: string;
  phone: string;
  category: string;
  experience: string;
  city: string;
  submittedAt: string;
}

export type ViewState = 'HOME' | 'CATEGORY' | 'SEARCH_RESULTS' | 'ABOUT_US' | 'REGISTER_PROFESSIONAL' | 'DASHBOARD';
