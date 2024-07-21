import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsSignUpPage from './pages/events.jsx';
import EventsPage from './pages/eventsPage.jsx';
import EventListPage from './pages/eventsListPage.jsx';
import EventEditPage from './pages/eventsEditPage.jsx';
import DisciplineEditPage from './pages/disciplinesEditPage.jsx';
import DisciplineListPage from './pages/disciplinesListPage.jsx';
import DisciplineSignUpPage from './pages/disciplines.jsx';
import DisciplinePage from './pages/disciplinePage.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/disciplines" element={<DisciplinePage />} />
        <Route path="/create-discipline" element={<DisciplineSignUpPage />} />
        <Route path="/disciplines-list" element={<DisciplineListPage />} />
        <Route path="/edit-discipline/:id" element={<DisciplineEditPage />} />
      <Route path="/events" element={<EventsPage />} />
        <Route path="/events-list" element={<EventListPage />} />
        <Route path="/edit-event/:id" element={<EventEditPage />} />
        <Route path="/create-event" element={<EventsSignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;