import React from 'react';
import { Badge } from './Badge';

export const HypothesisCard = ({ hypothesis, onClick }) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-sky-500 transition-all cursor-pointer group mb-4 overflow-hidden" onClick={() => onClick(hypothesis)}>
    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <Badge variant="info">{hypothesis.type}</Badge>
        <div className="flex items-center space-x-2">
           <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Impact Score</span>
           <span className="text-lg font-bold text-sky-600">{Math.round(hypothesis.kpi_impact * 100)}%</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-sky-700 transition-colors">
        {hypothesis.title}
      </h3>
      <p className="text-slate-600 text-sm line-clamp-2 mb-4">
        {hypothesis.description}
      </p>
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
        <div className="text-center">
          <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Новизна</p>
          <p className="text-sm font-semibold text-slate-700">{Math.round(hypothesis.novelty * 100)}%</p>
        </div>
        <div className="text-center border-x border-slate-100">
          <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Риск</p>
          <p className="text-sm font-semibold text-rose-600">{Math.round(hypothesis.risk * 100)}%</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Ценность</p>
          <p className="text-sm font-semibold text-emerald-600">{Math.round(hypothesis.value * 100)}%</p>
        </div>
      </div>
    </div>
  </div>
);
