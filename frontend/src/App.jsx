import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Players from "./pages/Players";
import Teams from "./pages/Teams";
import Matches from "./pages/Matches";
import Performances from "./pages/Performances";
import Achievements from "./pages/Achievements";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import PlayerProfile from "./pages/PlayerProfile"; // Import the PlayerProfile component
import TeamProfile from "./pages/TeamProfile"; // Import the TeamProfile component
import MatchDetails from "./pages/MatchDetails"; // Import the MatchDetails component
import Leaderboards from "./pages/Leaderboards"; // Import the Leaderboards component
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Router>
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
          path="/players/:id" // Define the route with the :id parameter
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
          path="/teams/:id" // Define the route with the :id parameter
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
              <ErrorBoundary>
                <Performances />
              </ErrorBoundary>
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

        {/* Redirect unknown routes to Login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;