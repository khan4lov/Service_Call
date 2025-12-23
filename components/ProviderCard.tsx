
import React from 'react';
import type { Provider } from '../types';
import { Star, ShieldCheck, Briefcase } from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md hover:border-slate-200 transition-all">
      <div className="relative mb-4">
        <img 
          src={provider.image} 
          alt={provider.name} 
          className="w-24 h-24 rounded-full object-cover border-4 border-slate-50"
        />
        <div className="absolute -bottom-1 -right-1 bg-green-100 text-green-700 p-1.5 rounded-full border-2 border-white" title="Verified Professional">
            <ShieldCheck size={16} />
        </div>
      </div>
      
      <h3 className="font-bold text-lg text-slate-800 mb-1">{provider.name}</h3>
      
      <div className="flex items-center gap-2 text-sm text-slate-600 mb-3 bg-slate-50 px-3 py-1 rounded-full">
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-slate-900">{provider.rating}</span>
        </div>
        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
        <span className="flex items-center gap-1 text-slate-500">
          <Briefcase size={12} />
          {provider.completedJobs} Jobs
        </span>
      </div>

      <p className="text-sm text-slate-500 line-clamp-3 mb-4 px-2">
        {provider.bio}
      </p>

      <div className="mt-auto w-full pt-4 border-t border-slate-100">
        <div className="flex flex-wrap gap-2 justify-center">
          {provider.categories.slice(0, 2).map((cat, idx) => (
              <span key={idx} className="text-[10px] uppercase tracking-wider font-semibold bg-blue-50 text-blue-700 px-2 py-1 rounded-md">
                  {cat.split(' ')[0]}
              </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;
