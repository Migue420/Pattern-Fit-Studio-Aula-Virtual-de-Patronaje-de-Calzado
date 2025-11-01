
import React, { useState, useCallback } from 'react';
import { getVisionResponse } from '../services/geminiService';
import { UploadIcon, SparklesIcon, AlertTriangleIcon } from './icons/Icons';

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(',')[1]);
        };
        reader.onerror = (error) => reject(error);
    });
};

export const AIAssistant: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [aiResponse, setAiResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setAiResponse('');
            setError('');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!prompt || !imageFile) {
            setError('Por favor, proporciona una imagen y una pregunta.');
            return;
        }

        setIsLoading(true);
        setError('');
        setAiResponse('');

        try {
            const base64Image = await fileToBase64(imageFile);
            const response = await getVisionResponse(prompt, base64Image, imageFile.type);
            setAiResponse(response);
        } catch (err) {
            console.error(err);
            setError('No se pudo obtener una respuesta de la IA. Revisa la consola para más detalles e inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const dropHandler = useCallback((ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
        if (ev.dataTransfer.items) {
            if (ev.dataTransfer.items[0].kind === 'file') {
                const file = ev.dataTransfer.items[0].getAsFile();
                if (file) {
                    setImageFile(file);
                    setImagePreview(URL.createObjectURL(file));
                    setAiResponse('');
                    setError('');
                }
            }
        }
    }, []);

    const dragOverHandler = (ev: React.DragEvent<HTMLDivElement>) => {
        ev.preventDefault();
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
                <div 
                    className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
                    onClick={() => document.getElementById('file-upload')?.click()}
                    onDrop={dropHandler}
                    onDragOver={dragOverHandler}
                >
                    <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    {imagePreview ? (
                        <img src={imagePreview} alt="Vista previa del zapato" className="max-h-64 rounded-lg object-contain" />
                    ) : (
                        <>
                            <UploadIcon className="w-12 h-12 text-slate-400 dark:text-slate-500 mb-2" />
                            <p className="text-slate-600 dark:text-slate-400 font-semibold">Haz clic para subir o arrastra y suelta</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, WEBP</p>
                        </>
                    )}
                </div>

                <div className="flex flex-col">
                    <form onSubmit={handleSubmit} className="flex flex-col h-full">
                        <label htmlFor="prompt" className="sr-only">Tu pregunta</label>
                        <textarea
                            id="prompt"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Ej: ¿De qué material es esta suela y cómo debo limpiarla?"
                            className="flex-grow w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                            rows={4}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !imageFile || !prompt}
                            className="w-full flex justify-center items-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed dark:disabled:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-800"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Analizando...
                                </>
                            ) : (
                                <>
                                    <SparklesIcon className="w-5 h-5 mr-2" />
                                    Preguntar al Experto
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {(aiResponse || error) && (
                 <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Respuesta de la IA:</h3>
                    {error && (
                        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-md flex items-start" role="alert">
                           <AlertTriangleIcon className="w-5 h-5 mr-3 mt-1 flex-shrink-0"/>
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    {aiResponse && (
                        <div className="prose prose-slate dark:prose-invert max-w-none">
                            <p>{aiResponse.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                        </div>
                    )}
                 </div>
            )}
        </div>
    );
};