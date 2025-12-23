
import React from 'react';
import type { Service } from '../types';
import { Star, Clock } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onBook: (service: Service) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100 overflow-hidden flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={service.image} 
          alt={service.name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md text-xs font-bold shadow-sm flex items-center gap-1">
          <Clock size={12} className="text-gray-500" /> {service.duration}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-slate-800 line-clamp-1">{service.name}</h3>
            <div className="flex items-center bg-green-50 px-2 py-1 rounded text-green-700 text-xs font-bold">
                <Star size={10} className="fill-current mr-1" />
                {service.rating}
            </div>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">{service.description}</p>
        
        <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Starts at</span>
            <span className="font-bold text-lg text-slate-900">₹{service.price}</span>
          </div>
          <button 
            onClick={() => onBook(service)}
            className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
