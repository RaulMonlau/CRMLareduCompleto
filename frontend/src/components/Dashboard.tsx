import { Link } from "react-router-dom";

export default function Dashboard() {
    const cards = [
        { title: 'Cursos', path: '/courses', icon: '📚', color: 'from-blue-500 to-blue-700', description: 'Gestión de cursos académicos' },
        { title: 'Asignaturas', path: '/subjects', icon: '📖', color: 'from-emerald-500 to-emerald-700', description: 'Todas las materias por curso' },
        { title: 'Tareas', path: '/assignments', icon: '✏️', color: 'from-purple-500 to-purple-700', description: 'Actividades pendientes' },
        { title: 'Entregas', path: '/submissions', icon: '📝', color: 'from-amber-500 to-amber-700', description: 'Control de entregas realizadas' },
        { title: 'Mensajes', path: '/messages', icon: '💬', color: 'from-rose-500 to-rose-700', description: 'Comunicación interna' },
    ];
    
    return (
        <div className="bg-gray-50 min-h-[calc(100vh-72px)]">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-3">Bienvenido a Laredu CRM</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Plataforma de gestión educativa para facilitar la comunicación entre profesores y alumnos
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <Link 
                            key={card.path}
                            to={card.path} 
                            className={`bg-gradient-to-br ${card.color} text-white rounded-lg shadow-lg 
                                        hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden`}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-2xl font-bold">{card.title}</h2>
                                    <span className="text-3xl">{card.icon}</span>
                                </div>
                                <p className="text-white/80">{card.description}</p>
                                <div className="mt-6 flex justify-end">
                                    <span className="text-sm bg-white/30 rounded-full px-3 py-1">
                                        Acceder →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}