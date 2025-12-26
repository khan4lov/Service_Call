import React from "react";
import { Star } from "lucide-react";
import { Provider, CategoryType } from "../types";

interface ProviderCardProps {
  provider: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ provider }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-all">
      
      {/* Provider Image */}
      <div className="w-20 h-20 mx-auto mb-4">
        <img
          src={provider.image || "https://via.placeholder.com/150"}
          alt={provider.name}
          className="w-full h-full rounded-full object-cover"
        />
      </div>

      {/* Provider Name */}
      <h3 className="text-center font-bold text-slate-800">
        {provider.name}
      </h3>

      {/* Rating */}
      <div className="flex justify-center items-center gap-1 mt-1 text-yellow-500">
        <Star size={14} fill="currentColor" />
        <span className="text-sm font-medium">
          {provider.rating}
        </span>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2 mt-4">
        {provider.categories.map((cat: CategoryType, idx: number) => (
          <span
            key={idx}
            className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProviderCard;
