import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Curriculum from './pages/Curriculum';
import Lesson from './pages/Lesson';
import Exam from './pages/Exam';
import Practice from './pages/Practice';
import Playground from './pages/Playground';
import Projects from './pages/Projects';
import Certificate from './pages/Certificate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/learn/:topicId" element={<Lesson />} />
            <Route path="/exam/:topicId" element={<Exam />} />
            <Route path="/practice/:topicId" element={<Practice />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/certificate" element={<Certificate />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
