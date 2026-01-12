import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

// Admin Pages
import Dashboard from './pages/Dashboard';
import Announcements from './pages/Announcements';
import Events from './pages/Events';
import DailyProblems from './pages/DailyProblems';
import Projects from './pages/Projects';
import ODRequests from './pages/ODRequests';
import Members from './pages/Members';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import DailyTask from './pages/student/DailyTask';
import StudentEvents from './pages/student/StudentEvents';
import StudentOD from './pages/student/StudentOD';
import Profile from './pages/student/Profile';

import PlaceholderPage from './pages/Placeholder';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to admin by default */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Admin Section */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="events" element={<Events />} />
          <Route path="daily-problems" element={<DailyProblems />} />
          <Route path="projects" element={<Projects />} />
          <Route path="od-requests" element={<ODRequests />} />
          <Route path="members" element={<Members />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Student Section */}
        <Route path="/student" element={<Layout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="daily-task" element={<DailyTask />} />
          <Route path="events" element={<StudentEvents />} />
          <Route path="od" element={<StudentOD />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<PlaceholderPage title="Not Found" />} />
      </Routes>
    </Router>
  );
}

export default App;
