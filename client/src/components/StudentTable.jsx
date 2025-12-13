import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentTable = ({ students, onDelete, onEdit }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.usn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden"
        >
            <div className="p-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-700">
                <h2 className="text-xl font-bold text-white">Student Records</h2>

                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-sm rounded-lg pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-900/50 text-slate-200 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-4">Student</th>
                            <th className="px-6 py-4">USN</th>
                            <th className="px-6 py-4">Department</th>
                            <th className="px-6 py-4 text-center">Semester</th>
                            <th className="px-6 py-4 text-center">Marks</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((student) => (
                                <tr key={student._id} className="hover:bg-slate-700/30 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 flex items-center justify-center text-xs font-bold text-white ring-2 ring-slate-800">
                                            {student.name.charAt(0)}
                                        </div>
                                        {student.name}
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs">{student.usn}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-700 text-slate-300 border border-slate-600">
                                            {student.department}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">{student.semester}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={student.marks > 75 ? "text-green-400 font-bold" : "text-slate-300"}>
                                            {student.marks}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="p-1.5 text-blue-400 hover:bg-blue-500/10 rounded-md"
                                                onClick={() => onEdit && onEdit(student)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-md"
                                                onClick={() => onDelete(student._id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                                    No students found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default StudentTable;
