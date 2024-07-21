import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EventsSignUpPage from './pages/events.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/create-event" element={<EventsSignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;