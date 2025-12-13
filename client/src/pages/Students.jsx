import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import StudentTable from '../components/StudentTable';
import StudentForm from '../components/StudentForm';
import { Plus } from 'lucide-react';
import api from '../services/api';

const Students = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState(null);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await api.get('/students');
            setStudents(response.data.results);
        } catch (error) {
            console.error("Failed to fetch students", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleAdd = () => {
        setEditingStudent(null);
        setIsFormOpen(true);
    };

    const handleEdit = (student) => {
        setEditingStudent(student);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                await api.delete(`/students/${id}`);
                setStudents(prev => prev.filter(s => s._id !== id));
            } catch (error) {
                console.error("Failed to delete student", error);
                alert("Failed to delete student");
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingStudent) {
                const response = await api.put(`/students/${editingStudent._id}`, formData);
                setStudents(prev => prev.map(s => s._id === response.data._id ? response.data : s));
            } else {
                const response = await api.post('/students', formData);
                // The backend returns the created object directly or inside a wrapper? 
                // Based on controller: res.status(201).json({ _id: result.insertedId, ...value })
                setStudents(prev => [...prev, response.data]);
            }
            setIsFormOpen(false);
        } catch (error) {
            console.error("Failed to save student", error);
            alert("Failed to save student. Please checks USN uniqueness.");
        }
    };

    return (
        <Layout>
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Students</h2>
                    <p className="text-slate-400 mt-1">Manage student records.</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-blue-500/20"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Student</span>
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <StudentTable students={students} onDelete={handleDelete} onEdit={handleEdit} />
            )}

            <StudentForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={editingStudent}
            />
        </Layout>
    );
};

export default Students;
