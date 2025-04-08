import React, { useEffect, useState } from "react";

interface Subject {
    id: number;
    name: string;
    course_id: number;
    teacher_id: number;
}

export default function SubjectsList() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/subjects", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al obtener las asignaturas");
                }
                return res.json();
            })
            .then((data) => {
                setSubjects(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Asignaturas</h2>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    {subjects.length} asignaturas
                </span>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                    <p className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                        {error}
                    </p>
                </div>
            )}
            
            {subjects.length === 0 && !error ? (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
                    No hay asignaturas disponibles en este momento.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {subjects.map((subject) => (
                        <div 
                            key={subject.id} 
                            className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="h-2 bg-green-600"></div>
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{subject.name}</h3>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="inline-flex items-center text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                        Curso ID: {subject.course_id}
                                    </span>
                                    <span className="inline-flex items-center text-xs font-medium bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                        Profesor ID: {subject.teacher_id}
                                    </span>
                                </div>
                                <button className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800">
                                    Ver contenido
                                    <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}