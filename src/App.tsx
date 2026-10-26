import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Models from "./pages/Models";
import Prompts from "./pages/Prompts";
import Analytics from "./pages/Analytics";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import DashboardFiltersProvider from "./context/DashboardFiltersProvider";

// "/" at the site root (local development); the repository subpath on GitHub Pages.
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <BrowserRouter basename={routerBasename}>
            <DashboardFiltersProvider>
                <div className="flex min-h-screen bg-page text-primary">
                    <Sidebar
                        isOpen={isSidebarOpen}
                        onClose={() => setIsSidebarOpen(false)}
                    />

                    <main className="min-w-0 flex-1 p-4 md:p-8">
                        <Header onMenuClick={() => setIsSidebarOpen(true)} />

                        <Routes>
                            <Route
                                path="/"
                                element={<Navigate to="/dashboard" replace />}
                            />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/models" element={<Models />} />
                            <Route path="/prompts" element={<Prompts />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                </div>
            </DashboardFiltersProvider>
        </BrowserRouter>
    );
}

export default App;
