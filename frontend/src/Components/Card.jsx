import React from "react";
import { TrendingUp, TrendingDown, Wallet, CircleDollarSign } from "lucide-react";

const Card = ({ title, value, type = "default", icon: Icon }) => {
  
  // 1. Color System Configuration
  // We define specific color palettes for different financial states.
  // This ensures consistency across the app.
  const styles = {
    income: {
      gradient: "from-emerald-500/20 to-teal-500/5",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      iconBg: "bg-emerald-500/10 text-emerald-400",
      glow: "group-hover:bg-emerald-500/10",
      defaultIcon: TrendingUp
    },
    expense: {
      gradient: "from-rose-500/20 to-red-500/5",
      border: "border-rose-500/20",
      text: "text-rose-400",
      iconBg: "bg-rose-500/10 text-rose-400",
      glow: "group-hover:bg-rose-500/10",
      defaultIcon: TrendingDown
    },
    balance: {
      gradient: "from-indigo-500/20 to-violet-500/5",
      border: "border-indigo-500/20",
      text: "text-indigo-400",
      iconBg: "bg-indigo-500/10 text-indigo-400",
      glow: "group-hover:bg-indigo-500/10",
      defaultIcon: Wallet
    },
    default: {
      gradient: "from-slate-800/50 to-slate-900/50",
      border: "border-slate-700/50",
      text: "text-slate-200",
      iconBg: "bg-slate-800 text-slate-400",
      glow: "group-hover:bg-slate-700/30",
      defaultIcon: CircleDollarSign
    }
  };

  const theme = styles[type] || styles.default;
  const DisplayIcon = Icon || theme.defaultIcon;

  return (
    <div className={`
      relative overflow-hidden rounded-2xl p-6 border backdrop-blur-md group transition-all duration-300
      bg-gradient-to-br ${theme.gradient} ${theme.border}
      hover:translate-y-[-2px] hover:shadow-lg
    `}>
      
      {/* Ambient Glow Orb (moves on hover) */}
      <div className={`
        absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl transition-colors duration-500
        bg-white/5 ${theme.glow}
      `}></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-white tracking-tight mt-1">
            {value}
          </h3>
        </div>
        
        <div className={`p-3 rounded-xl border border-white/5 ${theme.iconBg} shadow-inner`}>
          <DisplayIcon size={22} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

export default Card;