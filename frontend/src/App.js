import React, { useState } from 'react';
import { 
  Search, 
  Database, 
  Target, 
  Lightbulb, 
  AlertTriangle, 
  TrendingUp, 
  RefreshCw,
  Filter,
  FileText,
  X,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { MOCK_HYPOTHESES, CHART_DATA } from './data/mockData';
import { Card } from './components/Card';
import { Badge } from './components/Badge';
import { StatCard } from './components/StatCard';
import { HypothesisCard } from './components/HypothesisCard';

// --- Main App ---

export default function App() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedHypothesis, setSelectedHypothesis] = useState(null);
  const [hypotheses, setHypotheses] = useState(MOCK_HYPOTHESES);
  const [kpi, setKpi] = useState("Повысить коррозионную стойкость сплава Ni-Cr");
  const [knowledgeBase, setKnowledgeBase] = useState("Объем литературы: 45 статей, 12 отчетов, 5 экспериментов");

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-sky-200">
              <Lightbulb size={24} />
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight">Nornickel <span className="text-sky-600">HypoGen AI</span></h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Material Science Discovery</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <p className="text-xs font-medium text-slate-500">System Status</p>
              <div className="flex items-center justify-end space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-emerald-600">READY</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-5 space-y-5">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="text-sky-600" size={20} />
              <h2 className="font-bold text-lg">Параметры задачи</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Целевой KPI / Объект</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={kpi}
                    onChange={(e) => setKpi(e.target.value)}
                    className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all outline-none"
                  />
                  <Target className="absolute right-3 top-3 text-slate-300" size={16} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">База знаний (Knowledge Base)</label>
                <div className="relative">
                  <textarea 
                    rows="4"
                    value={knowledgeBase}
                    onChange={(e) => setKnowledgeBase(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all outline-none resize-none"
                  />
                  <Database className="absolute right-3 top-3 text-slate-300" size={16} />
                </div>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-lg ${
                  isGenerating 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-sky-600 text-white hover:bg-sky-700 hover:shadow-sky-200 active:scale-[0.98]'
                }`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="animate-spin" size={18} />
                    <span>Генерация гипотез...</span>
                  </>
                ) : (
                  <>
                    <Lightbulb size={18} />
                    <span>Запустить ИИ-анализ</span>
                  </>
                )}
              </button>
            </div>
          </Card>
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-slate-700 flex items-center space-x-2">
                <TrendingUp size={16} className="text-sky-500" />
                <span className="whitespace-nowrap">Ранжирование метрик</span>
              </h3>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CHART_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#f8fafc'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                  />
                  <Bar dataKey="impact" radius={[4, 4, 0, 0]}>
                    {CHART_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 1 ? '#0ea5e9' : '#cbd5e1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-4">
             <StatCard icon={FileText} label="Гипотез" value={hypotheses.length} colorClass="bg-blue-500" />
             <StatCard icon={AlertTriangle} label="Риск (ср.)" value="34%" colorClass="bg-rose-500" />
          </div>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="px-1">
              <h2 className="text-2xl font-bold text-slate-800">Сгенерированные гипотезы</h2>
              <p className="text-slate-500 text-sm font-medium">На основе {knowledgeBase.split(' ').length} параметров</p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                <Filter size={20} />
              </button>
              <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500 transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {isGenerating ? (
               <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="relative">
                    <RefreshCw className="animate-spin text-sky-500" size={48} />
                    <div className="absolute inset-0 animate-ping bg-sky-500 rounded-full opacity-20"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-slate-700">ИИ анализирует данные...</p>
                    <p className="text-slate-400 text-sm">Применяем графовые модели и NLP-фильтры</p>
                  </div>
               </div>
            ) : (
              <>{hypotheses.map(h => (
                  <HypothesisCard 
                    key={h.id} 
                    hypothesis={h} 
                    onClick={setSelectedHypothesis} 
                  />
                ))}</>
            )}
          </div>
        </div>
      </main>

      {selectedHypothesis && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
            onClick={() => setSelectedHypothesis(null)}
          ></div>
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
             <div className="sticky top-0 bg-white border-b border-slate-200 p-4 flex justify-between items-center z-10">
                <h2 className="font-bold text-lg">Детали гипотезы</h2>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
