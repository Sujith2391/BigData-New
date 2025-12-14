import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Database, Activity, Info, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';

const ProjectInfo = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="space-y-6">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Project Information</h1>
                    <p className="text-slate-400">Documentation and operational details for the Student Record Management System.</p>
                </header>

                <div className="grid gap-6 md:grid-cols-2">
                    <InfoCard
                        icon={Activity}
                        title="Operations Guide"
                        className="md:col-span-2"
                    >
                        <div className="space-y-4 text-slate-300">
                            <section>
                                <h3 className="text-white font-semibold mb-2">Dashboard</h3>
                                <p>The Dashboard provides an overview of key metrics, including total students, enrollment trends, and recent activities. Use this for a quick health check of the system.</p>
                            </section>
                            <section>
                                <h3 className="text-white font-semibold mb-2">Student Management</h3>
                                <p>Navigate to the 'Students' page to perform CRUD operations:</p>
                                <ul className="list-disc list-inside ml-4 space-y-1 text-sm">
                                    <li><strong>Create:</strong> Add new student records using the "Add Student" button.</li>
                                    <li><strong>Read:</strong> View the list of all students with search and filter capabilities.</li>
                                    <li><strong>Update:</strong> Edit existing student details.</li>
                                    <li><strong>Delete:</strong> Remove student records from the database.</li>
                                </ul>
                            </section>
                        </div>
                    </InfoCard>

                    <InfoCard icon={Database} title="MongoDB Connection">
                        <div className="space-y-4 text-slate-300">
                            <p>The application connects to a MongoDB database using the official NodeJS driver.</p>

                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-sm">
                                <div className="text-blue-400 mb-2">// Configuration</div>
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                    <span className="text-slate-500">Driver:</span>
                                    <span>mongodb (Node.js)</span>

                                    <span className="text-slate-500">File:</span>
                                    <span>src/config/mongoClient.js</span>

                                    <span className="text-slate-500">Env Var:</span>
                                    <span className="text-emerald-400">MONGODB_URI</span>

                                    <span className="text-slate-500">Database:</span>
                                    <span className="text-emerald-400">MONGODB_DB_NAME</span>
                                </div>
                            </div>

                            <p className="text-sm">
                                The connection is established asynchronously on server start. Authentication and host details are managed securely via environment variables.
                            </p>
                        </div>
                    </InfoCard>

                    <InfoCard icon={Info} title="Project Details">
                        <div className="space-y-4 text-slate-300">
                            <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
                                <span className="text-slate-500 font-medium">Stack:</span>
                                <span>MERN (MongoDB, Express, React, Node.js)</span>

                                <span className="text-slate-500 font-medium">Frontend:</span>
                                <span>Vite + React + TailwindCSS</span>

                                <span className="text-slate-500 font-medium">Backend:</span>
                                <span>Express + Native MongoDB Driver</span>

                                <span className="text-slate-500 font-medium">Deployment:</span>
                                <span>Vercel (Serverless Functions)</span>
                            </div>
                        </div>
                    </InfoCard>
                </div>
            </div>
        </Layout>
    );
};

const InfoCard = ({ icon: Icon, title, children, className = "" }) => (
    <div className={`bg-slate-800/50 border border-slate-700 rounded-xl p-6 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
                <Icon className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
        </div>
        {children}
    </div>
);

export default ProjectInfo;
