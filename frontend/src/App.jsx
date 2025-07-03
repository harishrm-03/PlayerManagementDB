import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Players from "./pages/Players";
import Teams from "./pages/Teams";
import Matches from "./pages/Matches";
import Performances from "./pages/Performances";
import Achievements from "./pages/Achievements";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PlayerProfile from "./pages/PlayerProfile";
import TeamProfile from "./pages/TeamProfile";
import MatchDetails from "./pages/MatchDetails";
import Leaderboards from "./pages/Leaderboards";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar />

                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/players"
            element={
              <ProtectedRoute>
                <Navbar />

                <Players />
              </ProtectedRoute>
            }
          />
          <Route
            path="/players/:id"
            element={
              <ProtectedRoute>
                <Navbar />

                <PlayerProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams"
            element={
              <ProtectedRoute>
                <Navbar />

                <Teams />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teams/:id"
            element={
              <ProtectedRoute>
                <Navbar />

                <TeamProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matches"
            element={
              <ProtectedRoute>
                <Navbar />

                <Matches />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matches/:id"
            element={
              <ProtectedRoute>
                <Navbar />

                <MatchDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/performances"
            element={
              <ProtectedRoute>
                <Navbar />

                <Performances />
              </ProtectedRoute>
            }
          />
          <Route
            path="/achievements"
            element={
              <ProtectedRoute>
                <Navbar />

                <Achievements />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboards"
            element={
              <ProtectedRoute>
                <Navbar />

                <Leaderboards />
              </ProtectedRoute>
            }
          />

          {/* Redirect unknown routes to the dashboard */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;