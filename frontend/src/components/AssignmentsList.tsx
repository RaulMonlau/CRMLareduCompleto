import React, { useEffect, useState } from "react";

interface Assignment {
    id: number;
    title: string;
    due_date: string;
    subject_id: number;
}

export default function AssignmentsList() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/assignments", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al obtener las tareas");
                }
                return res.json();
            })
            .then((data) => {
                setAssignments(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    // Función para determinar si una tarea está próxima a vencer (menos de 3 días)
    const isApproachingDeadline = (dueDate: string) => {
        const today = new Date();
        const deadline = new Date(dueDate);
        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 3 && diffDays >= 0;
    };

    // Función para determinar si una tarea está vencida
    const isPastDeadline = (dueDate: string) => {
        const today = new Date();
        const deadline = new Date(dueDate);
        return deadline < today;
    };

    // Función para formatear la fecha de entrega
    const formatDueDate = (dueDate: string) => {
        const options: Intl.DateTimeFormatOptions = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dueDate).toLocaleDateString('es-ES', options);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Tareas asignadas</h2>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {assignments.length} tareas
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
            
            {assignments.length === 0 && !error ? (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
                    No hay tareas asignadas en este momento.
                </div>
            ) : (
                <div className="space-y-4">
                    {assignments.map((assignment) => {
                        const isOverdue = isPastDeadline(assignment.due_date);
                        const isApproaching = isApproachingDeadline(assignment.due_date);
                        
                        return (
                            <div 
                                key={assignment.id} 
                                className={`bg-white rounded-lg border shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300
                                    ${isOverdue ? 'border-red-300' : isApproaching ? 'border-yellow-300' : 'border-gray-200'}`}
                            >
                                <div className={`h-1 ${isOverdue ? 'bg-red-600' : isApproaching ? 'bg-yellow-500' : 'bg-purple-600'}`}></div>
                                <div className="p-5">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">{assignment.title}</h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Asignatura ID: {assignment.subject_id}
                                            </p>
                                        </div>
                                        <div className="mt-2 md:mt-0">
                                            <span 
                                                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full 
                                                    ${isOverdue 
                                                        ? 'bg-red-100 text-red-800' 
                                                        : isApproaching 
                                                            ? 'bg-yellow-100 text-yellow-800' 
                                                            : 'bg-green-100 text-green-800'}`}
                                            >
                                                {isOverdue 
                                                    ? 'Vencida' 
                                                    : isApproaching 
                                                        ? 'Próxima a vencer' 
                                                        : 'En plazo'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 flex items-center">
                                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                                        </svg>
                                        <span className={`text-sm ${isOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                                            Fecha de entrega: {formatDueDate(assignment.due_date)}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-4 flex justify-end space-x-2">
                                        <button className="px-3 py-1 text-sm font-medium bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                                            Ver detalles
                                        </button>
                                        <button className="px-3 py-1 text-sm font-medium bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                                            Entregar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}