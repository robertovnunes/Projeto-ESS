import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsSignUpPage from './pages/events/eventSignUpPage.jsx';
import EventsPage from './pages/events/eventsPage.jsx';
import EventListPage from './pages/events/eventsListPage.jsx';
import EventEditPage from './pages/events/eventsEditPage.jsx';
import DisciplineEditPage from './pages/disciplines/disciplinesEditPage.jsx';
import DisciplineListPage from './pages/disciplines/disciplinesListPage.jsx';
import DisciplineSignUpPage from './pages/disciplines/disciplines.jsx';
import DisciplinePage from './pages/disciplines/disciplinePage.jsx';
import EventCalendarPage from './pages/events/eventCalendarPage.jsx';
import DisciplineViewPage from './pages/disciplines/disciplineViewPage.jsx';
import DisciplineRoomsPage from './pages/disciplines/disciplineRoomsPage.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/disciplines" element={<DisciplinePage />} />
        <Route path="/create-discipline" element={<DisciplineSignUpPage />} />
        <Route path="/disciplines-list" element={<DisciplineListPage />} />
        <Route path="/edit-discipline/:id" element={<DisciplineEditPage />} />
        <Route path="/discipline-rooms/:id" element={<DisciplineRoomsPage />} />
        <Route path="/calendar-events" element={<EventCalendarPage />} />
        <Route path= "/discipline-view" element={<DisciplineViewPage />} />
      <Route path="/events" element={<EventsPage />} />
        <Route path="/events-list" element={<EventListPage />} />
        <Route path="/edit-event/:id" element={<EventEditPage />} />
        <Route path="/create-event" element={<EventsSignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;