import React from 'react';

export const StatCard = ({ icon: Icon, label, value, colorClass }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex items-center space-x-4`}>
    <div className={`p-3 rounded-lg ${colorClass}`}>
      <Icon size={24} className="text-white" />
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{label}</p>
      <p className="text-xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);
