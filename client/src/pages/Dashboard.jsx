import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import StudentTable from '../components/StudentTable';
import AnalyticsCharts from '../components/AnalyticsCharts';
import { Users, GraduationCap, Award, TrendingUp, RefreshCw } from 'lucide-react';
import api from '../services/api';

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [semesterStats, setSemesterStats] = useState([]);
    const [departmentStats, setDepartmentStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [studentsRes, semesterRes, deptRes] = await Promise.all([
                api.get('/students'),
                api.get('/analytics/average-by-semester'),
                api.get('/analytics/top-performers')
            ]);
            setStudents(studentsRes.data.results);
            setSemesterStats(semesterRes.data.results);
            setDepartmentStats(deptRes.data.results);
        } catch (err) {
            console.error(err);
            setError("Failed to load dashboard data. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const totalStudents = students.length;
    const avgMarks = students.reduce((acc, curr) => acc + curr.marks, 0) / (totalStudents || 1);
    const topPerformer = students.reduce((max, curr) => (!max || curr.marks > max.marks ? curr : max), null);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this student?")) return;
        try {
            await api.delete(`/students/${id}`);
            setStudents(prev => prev.filter(s => s._id !== id));
        } catch (err) { alert("Failed to delete"); }
    };

    if (loading) return <Layout><div className="flex justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div></Layout>;
    if (error) return <Layout><div className="text-red-500 p-10">{error} <button onClick={fetchData} className="ml-4 underline">Retry</button></div></Layout>;

    return (
        <Layout>
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard Overview</h2>
                    <p className="text-slate-400 mt-1">Real-time insights.</p>
                </div>
                <button onClick={fetchData} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300">
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Students" value={totalStudents} icon={Users} color="bg-blue-500" />
                <StatCard title="Average Marks" value={`${avgMarks.toFixed(1)}%`} icon={TrendingUp} color="bg-emerald-500" />
                <StatCard title="Top Department" value={departmentStats[0]?._id || "N/A"} icon={GraduationCap} color="bg-violet-500" />
                <StatCard title="Top Performer" value={topPerformer?.name?.split(' ')[0] || "N/A"} icon={Award} color="bg-amber-500" />
            </div>

            <AnalyticsCharts semesterData={semesterStats} departmentData={departmentStats} />
            <StudentTable students={students} onDelete={handleDelete} />
        </Layout>
    );
};

export default Dashboard;
