import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <BrowserRouter>
            <div className="flex min-h-screen">
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />

                <main className="min-w-0 flex-1 p-4 md:p-8">
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="mb-4 rounded-lg border p-2 md:hidden"
                        onClick={() => setIsSidebarOpen(true)}
                        aria-label="Open navigation"
                    >
                        ☰
                    </button>

                    <Header
                        title="AI Product Intelligence"
                        subTitle="Monitor AI usage, performance and costs"
                    />

                    <Routes>
                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/models"
                            element={<Models />}
                        />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;