
import React, { useState, useCallback, useEffect } from 'react';
import { getRouteOptimizations } from '../../services/geminiService';
import { RefreshIcon } from '../../components/icons/Icons';

interface OptimizationResult {
    optimized_schedules: {
        route_name: string;
        new_departure_times: string[];
        justification: string;
    }[];
    new_route_suggestions: {
        from: string;
        to: string;
        suggested_times: string[];
        rationale: string;
    }[];
}

const LoadingSpinner: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800 rounded-lg">
        <RefreshIcon className="w-12 h-12 text-sky-400 animate-spin mb-4" />
        <p className="text-lg font-semibold text-gray-300">Optimizing Routes...</p>
        <p className="text-sm text-gray-500">Our AI is analyzing traffic patterns and schedules.</p>
    </div>
);

const RouteOptimizer: React.FC = () => {
    const [optimizations, setOptimizations] = useState<OptimizationResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOptimizations = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getRouteOptimizations();
            setOptimizations(data);
        } catch (err) {
            setError('Failed to fetch route optimizations. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchOptimizations();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="space-y-8">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold">AI-Powered Suggestions</h3>
                    <p className="text-gray-400">Get intelligent suggestions to improve efficiency and profitability.</p>
                </div>
                <button
                    onClick={fetchOptimizations}
                    disabled={isLoading}
                    className="flex items-center bg-sky-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    <RefreshIcon className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? 'Refreshing...' : 'Refresh Suggestions'}
                </button>
            </div>
            
            {isLoading && <LoadingSpinner />}
            {error && <div className="text-center p-8 bg-red-900/50 text-red-300 rounded-lg">{error}</div>}

            {optimizations && !isLoading && (
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <h4 className="text-lg font-bold mb-4 text-sky-300">Optimized Schedules</h4>
                        <div className="space-y-4">
                            {optimizations.optimized_schedules.map((opt, index) => (
                                <div key={index} className="bg-gray-900/50 p-4 rounded-md">
                                    <p className="font-semibold">{opt.route_name}</p>
                                    <p className="text-sm text-gray-400 my-2">New Times: <span className="font-mono text-emerald-400">{opt.new_departure_times.join(', ')}</span></p>
                                    <p className="text-sm text-gray-500 italic">"{opt.justification}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                        <h4 className="text-lg font-bold mb-4 text-purple-300">New Route Suggestions</h4>
                        <div className="space-y-4">
                            {optimizations.new_route_suggestions.map((sug, index) => (
                                <div key={index} className="bg-gray-900/50 p-4 rounded-md">
                                    <p className="font-semibold">{sug.from} &rarr; {sug.to}</p>
                                    <p className="text-sm text-gray-400 my-2">Suggested Times: <span className="font-mono text-emerald-400">{sug.suggested_times.join(', ')}</span></p>
                                    <p className="text-sm text-gray-500 italic">"{sug.rationale}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RouteOptimizer;
