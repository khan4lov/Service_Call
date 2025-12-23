
import { CategoryType, type Service, type Testimonial, type Provider, type User, type BookingDetails, type RegistrationForm } from './types';

export const CATEGORIES = Object.values(CategoryType);

export const SERVICES: Service[] = [
  {
    id: '1',
    name: 'Split AC Service',
    description: 'Deep cleaning of indoor unit and filter cleaning using jet pump.',
    price: 499,
    rating: 4.8,
    reviews: 1250,
    image: 'https://picsum.photos/400/300?random=1',
    category: CategoryType.AC_APPLIANCE,
    duration: '45 mins'
  },
  {
    id: '2',
    name: 'Bathroom Cleaning',
    description: 'Deep cleaning of tiles, shower, toilet, and sink with specialized chemicals.',
    price: 399,
    rating: 4.7,
    reviews: 890,
    image: 'https://picsum.photos/400/300?random=2',
    category: CategoryType.CLEANING,
    duration: '60 mins'
  },
  {
    id: '3',
    name: 'Tap Repair',
    description: 'Repair of leaking taps or installation of new ones.',
    price: 149,
    rating: 4.6,
    reviews: 560,
    image: 'https://picsum.photos/400/300?random=3',
    category: CategoryType.PLUMBING,
    duration: '30 mins'
  },
  {
    id: '4',
    name: 'Switch/Socket Replacement',
    description: 'Replacement of faulty electrical switches or sockets.',
    price: 99,
    rating: 4.9,
    reviews: 2100,
    image: 'https://picsum.photos/400/300?random=4',
    category: CategoryType.ELECTRICIAN,
    duration: '20 mins'
  },
  {
    id: 'w1',
    name: 'Main Gate & Window Welding',
    description: 'Repairing of broken hinges, gate alignment, and window grill welding.',
    price: 450,
    rating: 4.8,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.WELDING,
    duration: '1-2 Hours'
  },
  {
    id: 'w2',
    name: 'Shutter Fitting & Repair',
    description: 'New shop shutter installation, spring repair, and greasing services.',
    price: 800,
    rating: 4.7,
    reviews: 85,
    image: 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.WELDING,
    duration: '3 Hours'
  },
  {
    id: 'rp1',
    name: 'PVC Wall & Ceiling Paneling',
    description: 'Moisture-proof PVC panel installation for walls and ceilings. Multiple designs available.',
    price: 75,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.ROOF_PANEL,
    duration: 'Per Sq Ft'
  },
  {
    id: 'rp2',
    name: 'POP False Ceiling',
    description: 'Designer POP (Plaster of Paris) ceiling work with lighting provision.',
    price: 95,
    rating: 4.8,
    reviews: 145,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400',
    category: CategoryType.ROOF_PANEL,
    duration: 'Per Sq Ft'
  },
  {
    id: '5',
    name: 'Full Home Pest Control',
    description: 'Complete protection against cockroaches, ants, and termites.',
    price: 999,
    rating: 4.8,
    reviews: 450,
    image: 'https://picsum.photos/400/300?random=5',
    category: CategoryType.PEST_CONTROL,
    duration: '2 hours'
  },
  {
    id: '6',
    name: 'Haircut & Beard Grooming',
    description: 'Professional haircut and styling at your home.',
    price: 299,
    rating: 4.7,
    reviews: 320,
    image: 'https://picsum.photos/400/300?random=6',
    category: CategoryType.BEAUTY_MEN,
    duration: '45 mins'
  },
  {
    id: 'c1',
    name: 'Maruti WagonR',
    description: 'Budget-friendly hatchback. Ideal for small families and local errands. Includes professional driver.',
    price: 1800,
    rating: 4.5,
    reviews: 340,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Maruti_Suzuki_Wagon_R_%28third_generation%29_IMG_6802.jpg/640px-Maruti_Suzuki_Wagon_R_%28third_generation%29_IMG_6802.jpg',
    category: CategoryType.CAR_RENTAL,
    duration: '12 Hours / 250km'
  },
  {
    id: 'l1',
    name: 'General Daily Labour',
    description: 'Helper for shifting household goods, construction site help, gardening, or heavy lifting.',
    price: 600,
    rating: 4.5,
    reviews: 120,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=400', 
    category: CategoryType.LABOUR,
    duration: '8 Hours'
  }
];

export const PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'Vikram Singh',
    rating: 4.9,
    bio: 'Expert electrician with over 8 years of experience in residential wiring and appliance repair.',
    image: 'https://picsum.photos/200/200?random=50',
    categories: [CategoryType.ELECTRICIAN, CategoryType.AC_APPLIANCE],
    completedJobs: 1240,
    experience: '8 Years'
  },
  {
    id: 'pw1',
    name: 'Aslam Welder',
    rating: 4.8,
    bio: 'Specialist in shutter fitting, gate fabrication, and structural iron work.',
    image: 'https://picsum.photos/200/200?random=61',
    categories: [CategoryType.WELDING],
    completedJobs: 540,
    experience: '10 Years'
  },
  {
    id: 'prp1',
    name: 'Deepak Interior',
    rating: 4.9,
    bio: 'Expert in PVC paneling and POP false ceiling design for homes and shops.',
    image: 'https://picsum.photos/200/200?random=62',
    categories: [CategoryType.ROOF_PANEL],
    completedJobs: 320,
    experience: '6 Years'
  },
  {
    id: 'p2',
    name: 'Anita Sharma',
    rating: 4.8,
    bio: 'Specialist in deep cleaning and pest control. Known for attention to detail.',
    image: 'https://picsum.photos/200/200?random=51',
    categories: [CategoryType.CLEANING, CategoryType.PEST_CONTROL],
    completedJobs: 850,
    experience: '5 Years'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Local Shop Owner",
    content: "Service on Call is a blessing for our town. The welder arrived in 30 minutes and fixed my shop's shutter perfectly.",
    image: "https://picsum.photos/100/100?random=20"
  },
  {
    id: 2,
    name: "Sita Devi",
    role: "Homemaker",
    content: "The PVC paneling done in my living room is beautiful. Very professional and tidy work.",
    image: "https://picsum.photos/100/100?random=21"
  }
];

export const INITIAL_USERS: User[] = [
    {
        username: 'admin',
        password: 'password', 
        role: 'ADMIN',
        name: 'Super Admin'
    },
    {
        username: 'welder',
        password: 'password',
        role: 'PROVIDER',
        name: 'Aslam Welder',
        category: CategoryType.WELDING
    }
];

export const INITIAL_BOOKINGS: BookingDetails[] = [
    {
        id: 'B101',
        serviceId: 'w1',
        serviceName: 'Main Gate Welding',
        category: CategoryType.WELDING,
        date: '2023-11-20',
        time: '11:00 AM',
        address: 'Sector 13, Karnal',
        customerName: 'Amit Singh',
        customerPhone: '9876543210',
        price: 450,
        status: 'PENDING',
        createdAt: new Date().toISOString()
    }
];

export const INITIAL_REGISTRATIONS: RegistrationForm[] = [
    {
        id: 'R201',
        fullName: 'Karan Mehra',
        phone: '9000012345',
        category: CategoryType.PAINTING,
        experience: '10',
        city: 'Karnal',
        submittedAt: new Date().toISOString()
    }
];
