import React from 'react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, color }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className={cn(
                "bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl",
                "flex flex-col justify-between relative overflow-hidden group"
            )}
        >
            <div className="flex justify-between items-start z-10 relative">
                <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">{value}</h3>
                </div>
                <div className={cn("p-3 rounded-lg bg-opacity-20", color)}>
                    <Icon className={cn("w-6 h-6 text-white")} />
                </div>
            </div>

            <div className={cn(
                "absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity",
                color.replace('bg-', 'bg-')
            )} />
        </motion.div>
    );
};

export default StatCard;
