
import React from 'react';
import { ShieldCheck, Users, Heart, Trophy, Clock } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pb-12">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Empowering Local Communities</h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            "Service on Call" is bridging the gap between skilled professionals and households in semi-urban and rural India. We bring city-standard quality to your doorstep.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1581578731117-10d52143b0e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Our Mission" 
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
            <p className="text-slate-600 mb-4 text-lg leading-relaxed">
              We started with a simple thought: <strong>Why should premium home services be limited to big metros?</strong>
            </p>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              In Tier-2 and Tier-3 cities, finding a trusted electrician, plumber, or beautician is often a hassle involving endless calls and uncertain pricing. "Service on Call" organizes this fragmented market by verifying local experts and providing them with a technology platform to serve you better.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="bg-blue-100 p-3 rounded-full text-accent">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">100% Verified Partners</h4>
                  <p className="text-sm text-slate-500">Every professional undergoes a strict background check.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="bg-green-100 p-3 rounded-full text-green-600">
                  <Heart size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Community Focused</h4>
                  <p className="text-sm text-slate-500">Creating jobs and opportunities for local talent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold text-accent mb-2">15k+</div>
              <div className="text-slate-600 font-medium">Happy Customers</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-accent mb-2">500+</div>
              <div className="text-slate-600 font-medium">Service Partners</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-accent mb-2">25+</div>
              <div className="text-slate-600 font-medium">Cities Covered</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-bold text-accent mb-2">4.8</div>
              <div className="text-slate-600 font-medium">Average Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-12">Why We Are Different</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-50 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Customer First</h3>
            <p className="text-slate-500">We offer a no-questions-asked rework policy if you are not satisfied with the service.</p>
          </div>
          <div className="p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-50 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Quality Assurance</h3>
            <p className="text-slate-500">Standardized pricing and procedures ensure you get the best service every time.</p>
          </div>
          <div className="p-8 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-50 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">On-Time Service</h3>
            <p className="text-slate-500">We respect your time. Our professionals arrive within the booked slot, guaranteed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
