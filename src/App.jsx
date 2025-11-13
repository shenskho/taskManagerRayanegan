import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/dashboard/Dashboard'
import KanbanBoard from './pages/kanban/KanbanBoard'
import Tasks from './pages/tasks/Tasks'
import Projects from './pages/projects/Projects'
import Calendar from './pages/Calendar'
import Team from './pages/Team'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/kanban" element={<KanbanBoard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/team" element={<Team />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App