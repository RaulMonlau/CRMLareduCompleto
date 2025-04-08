import React, { useEffect, useState } from "react";

interface Submission {
    id: number;
    assignment_id: number;
    user_id: number;
    submitted_at: string;
    grade: number | null;
}

export default function SubmissionsList() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [assignmentId, setAssignmentId] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/submissions", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al obtener entregas");
                }
                return res.json();
            })
            .then((data) => {
                setSubmissions(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");
        setError("");

        // Validar que el ID es un número
        if (!assignmentId || isNaN(Number(assignmentId))) {
            setError("Por favor introduce un ID de tarea válido");
            setIsSubmitting(false);
            return;
        }

        fetch("http://127.0.0.1:8000/api/submissions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                user_id: 2, // Esto debe cambiarse para tomar el ID del usuario autenticado
                assignment_id: parseInt(assignmentId),
                submitted_at: new Date().toISOString(),
                grade: null,
            }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al entregar tarea");
                }
                return res.json();
            })
            .then((data) => {
                setMessage("Tarea entregada con éxito");
                setAssignmentId("");
                // Añadir la nueva entrega a la lista
                setSubmissions([...submissions, data]);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Entregas de tareas</h2>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                    {submissions.length} entregas
                </span>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Nueva entrega</h3>
                
                {message && (
                    <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
                        <p className="flex items-center text-sm">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            {message}
                        </p>
                    </div>
                )}
                
                {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
                        <p className="flex items-center text-sm">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                            </svg>
                            {error}
                        </p>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-grow">
                        <label htmlFor="assignmentId" className="block text-sm font-medium text-gray-700 mb-1">
                            ID de la tarea a entregar
                        </label>
                        <input
                            id="assignmentId"
                            type="number"
                            placeholder="Ej: 1, 2, 3..."
                            className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                            value={assignmentId}
                            onChange={(e) => setAssignmentId(e.target.value)}
                        />
                    </div>
                    <div className="sm:self-end">
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full sm:w-auto bg-amber-600 text-white py-2 px-4 rounded-md font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-70 transition-colors"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </span>
                            ) : "Entregar tarea"}
                        </button>
                    </div>
                </form>
            </div>

            {submissions.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
                    No has realizado ninguna entrega todavía.
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID Tarea
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Fecha de entrega
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Calificación
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Estado
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {submissions.map((submission) => (
                                <tr key={submission.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {submission.assignment_id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(submission.submitted_at).toLocaleDateString()} - {new Date(submission.submitted_at).toLocaleTimeString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {submission.grade !== null ? (
                                            <span className="font-medium text-green-700">{submission.grade}</span>
                                        ) : (
                                            <span className="text-gray-400">Sin calificar</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                            ${submission.grade !== null 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'}`}
                                        >
                                            {submission.grade !== null ? 'Calificado' : 'Pendiente'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}