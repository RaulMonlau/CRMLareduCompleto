import { useEffect, useState } from "react";

interface Course {
    id: number;
    name: string;
    description: string;
}

export default function CoursesList() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("No token found. Please log in.");
            setIsLoading(false);
            return;
        }

        fetch("http://127.0.0.1:8000/api/courses", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch courses");
                }
                return res.json();
            })
            .then((data: Course[]) => {
                setCourses(data);
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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md m-6">
                <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                    </svg>
                    {error}
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Cursos disponibles</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {courses.length} cursos
                </span>
            </div>

            {courses.length === 0 ? (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-md">
                    No hay cursos disponibles en este momento.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div 
                            key={course.id} 
                            className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                        >
                            <div className="h-2 bg-blue-600"></div>
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-xl font-bold text-gray-900">{course.name}</h3>
                                    <span className="inline-flex items-center justify-center bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                                        ID: {course.id}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">{course.description}</p>
                                <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                                    Ver detalles
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