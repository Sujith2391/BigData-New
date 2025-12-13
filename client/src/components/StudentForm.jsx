import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const StudentForm = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        name: '',
        usn: '',
        email: '',
        department: '',
        semester: '',
        marks: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                usn: initialData.usn || '',
                email: initialData.email || '',
                department: initialData.department || '',
                semester: initialData.semester || '',
                marks: initialData.marks || ''
            });
        } else {
            setFormData({
                name: '',
                usn: '',
                email: '',
                department: '',
                semester: '',
                marks: ''
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Sanitize data before sending
        const payload = {
            ...formData,
            marks: Number(formData.marks),
            semester: Number(formData.semester),
            email: formData.email === '' ? undefined : formData.email // Handle empty email
        };
        onSubmit(payload);
    };

    const departments = ['CSE', 'ISE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'AIML'];
    const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" onClick={onClose} />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-lg pointer-events-auto flex flex-col max-h-[90vh]">
                            <div className="flex justify-between items-center p-6 border-b border-slate-700">
                                <h2 className="text-xl font-bold text-white">
                                    {initialData ? 'Edit Student' : 'Add New Student'}
                                </h2>
                                <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">USN</label>
                                        <input
                                            type="text"
                                            name="usn"
                                            required
                                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                            value={formData.usn}
                                            onChange={handleChange}
                                            disabled={!!initialData} // USN usually unique/immutable
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Marks (%)</label>
                                        <input
                                            type="number"
                                            name="marks"
                                            required
                                            min="0"
                                            max="100"
                                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                            value={formData.marks}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Department</label>
                                        <select
                                            name="department"
                                            required
                                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                            value={formData.department}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Dept</option>
                                            {departments.map(dept => (
                                                <option key={dept} value={dept}>{dept}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-300 mb-1">Semester</label>
                                        <select
                                            name="semester"
                                            required
                                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                            value={formData.semester}
                                            onChange={handleChange}
                                        >
                                            <option value="">Select Sem</option>
                                            {semesters.map(sem => (
                                                <option key={sem} value={sem}>{sem}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-1">Email (Optional)</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="pt-4 flex justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
                                    >
                                        {initialData ? 'Update Student' : 'Add Student'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default StudentForm;
