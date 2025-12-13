import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts';
import { motion } from 'framer-motion';

const AnalyticsCharts = ({ semesterData, departmentData }) => {
    const COLORS = ['#3b82f6', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b'];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl p-6"
            >
                <h3 className="text-lg font-bold text-white mb-6">Performance by Semester</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={semesterData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="_id" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(val) => `Sem ${val}`} />
                            <YAxis tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} cursor={{ fill: '#334155', opacity: 0.4 }} />
                            <Bar dataKey="averageMarks" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Avg Marks" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl p-6"
            >
                <h3 className="text-lg font-bold text-white mb-6">Department Distribution</h3>
                <div className="h-[300px] w-full flex items-center justify-center">
                    {departmentData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="averageMarks" nameKey="_id">
                                    {departmentData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : <div className="text-slate-500">No data available</div>}
                </div>
            </motion.div>
        </div>
    );
};

export default AnalyticsCharts;
