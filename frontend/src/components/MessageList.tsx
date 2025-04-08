import React, { useEffect, useState } from "react";

interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    is_read: boolean;
    created_at: string;
}

export default function MessageList() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [receiverId, setReceiverId] = useState("");
    const [content, setContent] = useState("");
    const [notification, setNotification] = useState({ message: "", type: "" });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch("http://127.0.0.1:8000/api/messages", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setMessages(data);
                setIsLoading(false);
            })
            .catch(() => {
                setNotification({ 
                    message: "Error al obtener mensajes", 
                    type: "error" 
                });
                setIsLoading(false);
            });
    }, []);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!receiverId || !content) {
            setNotification({ 
                message: "Por favor complete todos los campos", 
                type: "error" 
            });
            return;
        }

        setNotification({ message: "", type: "" });
        
        fetch("http://127.0.0.1:8000/api/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
                receiver_id: parseInt(receiverId),
                content,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                setMessages([data, ...messages]);
                setContent("");
                setNotification({ 
                    message: "Mensaje enviado con éxito", 
                    type: "success" 
                });
                
                // Auto-clear notification after 3 seconds
                setTimeout(() => {
                    setNotification({ message: "", type: "" });
                }, 3000);
            })
            .catch(() => {
                setNotification({ 
                    message: "Error al enviar mensaje", 
                    type: "error" 
                });
            });
    };

    // Format date with time
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 bg-white rounded-xl shadow-soft">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-gray-800">Centro de Mensajería</h2>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    {messages.length} mensajes
                </span>
            </div>

            {notification.message && (
                <div className={`mb-6 p-3 rounded-md flex items-center ${
                    notification.type === "success" 
                        ? "bg-green-50 text-green-700 border border-green-200" 
                        : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                    {notification.type === "success" ? (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                        </svg>
                    )}
                    <p className="text-sm">{notification.message}</p>
                </div>
            )}

            <div className="bg-indigo-50 rounded-lg p-6 mb-8 border border-indigo-100">
                <h3 className="text-lg font-semibold text-indigo-900 mb-4">Nuevo Mensaje</h3>
                <form onSubmit={handleSendMessage} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                            <label htmlFor="receiverId" className="block text-sm font-medium text-gray-700 mb-1">
                                ID Destinatario
                            </label>
                            <input
                                id="receiverId"
                                type="number"
                                placeholder="Ej: 1, 2, 3..."
                                className="w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                value={receiverId}
                                onChange={(e) => setReceiverId(e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label htmlFor="messageContent" className="block text-sm font-medium text-gray-700 mb-1">
                                Mensaje
                            </label>
                            <div className="flex">
                                <input
                                    id="messageContent"
                                    type="text"
                                    placeholder="Escribe tu mensaje aquí..."
                                    className="flex-grow border border-gray-300 rounded-l-md shadow-sm px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <button 
                                    type="submit" 
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800">Historial de Mensajes</h3>
                </div>
                
                {isLoading ? (
                    <div className="flex justify-center items-center h-48">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : messages.length === 0 ? (
                    <div className="p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <p className="text-gray-500">No hay mensajes para mostrar</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {messages.map((msg) => {
                            const isFromMe = msg.sender_id === 2; // Assuming current user id is 2
                            return (
                                <li key={msg.id} className={`p-4 hover:bg-gray-50 transition-colors ${isFromMe ? 'bg-indigo-50' : ''}`}>
                                    <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-2">
                                        <div className="flex items-start">
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-medium ${isFromMe ? 'bg-indigo-600' : 'bg-gray-600'}`}>
                                                {isFromMe ? 'Yo' : msg.sender_id.toString().charAt(0)}
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {isFromMe ? 'Yo' : `Usuario ${msg.sender_id}`}
                                                </p>
                                                <p className="text-sm text-gray-700 mt-1">{msg.content}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500 sm:mt-0 mt-2 sm:ml-4 ml-0">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                                            </svg>
                                            {formatDateTime(msg.created_at)}
                                            {!msg.is_read && !isFromMe && (
                                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                                    Nuevo
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
}