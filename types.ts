// ================== ENUMS ==================
export enum CategoryType {
  AC_APPLIANCE = "AC & Appliances",
  CLEANING = "Cleaning",
  PLUMBING = "Plumbing",
  ELECTRICIAN = "Electrician",
  PAINTING = "Painting",
  BEAUTY_MEN = "Beauty for Men",
  BEAUTY_WOMEN = "Beauty for Women",
  PEST_CONTROL = "Pest Control",
  CARPENTRY = "Carpentry",
  CAR_RENTAL = "Car Rental",
  LABOUR = "Labour",
  MISTRI = "Mistri",
  HOUSE_HELPER = "House Helper",
  WELDING = "Welding",
  ROOF_PANEL = "Roof Panel"
}

export type ViewState =
  | "HOME"
  | "CATEGORY"
  | "SEARCH_RESULTS"
  | "ABOUT_US"
  | "REGISTER_PROFESSIONAL"
  | "DASHBOARD";

// ================== SERVICE ==================
export interface Service {
  id: string;
  name: string;
  description: string;
  category: CategoryType;
  price: number;
  image?: string;
  duration?: string;
  rating?: number;
  reviews?: number;
}

// ================== USER ==================
export interface User {
  username: string;
  name: string;
  role: "ADMIN" | "PROVIDER" | "USER";
  category?: CategoryType;
}

// ================== BOOKING ==================
export interface BookingDetails {
  id?: number;                // Supabase auto id
  serviceId: string;
  serviceName: string;
  category: CategoryType;
  date: string;
  time: string;
  address: string;
  customerName: string;
  customerPhone: string;
  price: number;
  status: "PENDING" | "ASSIGNED" | "COMPLETED";
  provider_id?: string | null;
  createdAt?: string;
}

// ================== PROVIDER ==================
export interface Provider {
  id: number;
  name: string;
  image?: string;
  rating: number;
  bio?: string;
  categories: CategoryType[];
}

// ================== TESTIMONIAL ==================
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

// ================== REGISTRATION ==================
export interface RegistrationForm {
  fullName: string;
  phone: string;
  category: CategoryType;
  experience: string;
  city: string;
}
