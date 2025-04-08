import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

interface NavbarProps {
    onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
    const location = useLocation();
    
    const isActive = (path: string) => location.pathname === path;
    
    return (
        <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-3 md:mb-0">
                        <span className="text-2xl font-bold mr-6">
                            <span className="text-yellow-300">Laredu</span>
                            <span className="text-white">CRM</span>
                        </span>
                        <div className="hidden md:flex space-x-1">
                            {[
                                { path: '/', label: 'Inicio' },
                                { path: '/courses', label: 'Cursos' },
                                { path: '/subjects', label: 'Asignaturas' },
                                { path: '/assignments', label: 'Tareas' },
                                { path: '/submissions', label: 'Entregas' },
                                { path: '/messages', label: 'Mensajes' },
                            ].map(item => (
                                <Link 
                                    key={item.path}
                                    to={item.path} 
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 
                                    ${isActive(item.path) 
                                        ? 'bg-indigo-900 text-white' 
                                        : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'}`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <LogoutButton onLogout={onLogout} />
                    </div>
                </div>
                
                {/* Mobile menu */}
                <div className="md:hidden flex overflow-x-auto space-x-1 py-2">
                    {[
                        { path: '/', label: 'Inicio' },
                        { path: '/courses', label: 'Cursos' },
                        { path: '/subjects', label: 'Asignaturas' },
                        { path: '/assignments', label: 'Tareas' },
                        { path: '/submissions', label: 'Entregas' },
                        { path: '/messages', label: 'Mensajes' },
                    ].map(item => (
                        <Link 
                            key={item.path}
                            to={item.path} 
                            className={`px-3 py-2 rounded-md text-xs font-medium whitespace-nowrap
                            ${isActive(item.path) 
                                ? 'bg-indigo-900 text-white' 
                                : 'text-indigo-100 hover:bg-indigo-700 hover:text-white'}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}