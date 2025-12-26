export enum CategoryType {
  AC_APPLIANCE = 'AC & Appliances',
  CLEANING = 'Cleaning',
  PLUMBING = 'Plumbing',
  ELECTRICIAN = 'Electrician',
  PAINTING = 'Painting',
  BEAUTY_MEN = 'Beauty for Men',
  BEAUTY_WOMEN = 'Beauty for Women',
  PEST_CONTROL = 'Pest Control',
  CARPENTRY = 'Carpentry',
  CAR_RENTAL = 'Car Rental',
  LABOUR = 'Labour',
  MISTRI = 'Mistri',
  HOUSE_HELPER = 'House Helper',
  WELDING = 'Welding',
  ROOF_PANEL = 'Roof Panel'
}

export type ViewState =
  | 'HOME'
  | 'CATEGORY'
  | 'SEARCH_RESULTS'
  | 'ABOUT_US'
  | 'REGISTER_PROFESSIONAL'
  | 'DASHBOARD';

export interface Service {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  price: number;
}

export interface BookingDetails {
  id?: number;          // ✅ OPTIONAL (Supabase generates)
  createdAt?: string;   // ✅ OPTIONAL
  serviceId: string;
  serviceName: string;
  category: CategoryType;
  date: string;
  time: string;
  address: string;
  customerName: string;
  customerPhone: string;
  price: number;
  status: 'PENDING' | 'ASSIGNED' | 'COMPLETED';
  provider_id?: string | null;
}

export interface RegistrationForm {
  fullName: string;
  phone: string;
  category: CategoryType;
  experience: string;
  city: string;
}

export interface User {
  id?: string;
  name: string;
  username: string;
  role: 'ADMIN' | 'PROVIDER' | 'USER';
}
