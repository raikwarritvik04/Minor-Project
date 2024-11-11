import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Forgotpassword from './pages/Forgotpassword';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import Questionnaire from './pages/Questionnaire';
import Recommendations from './pages/Recommendations';
import Help from './pages/Help';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './components/Footer';
import PsychologistDetail from './pages/PsychologistDetail';
import Offline from './pages/Offline';
import Online from './pages/Online';
import LoginChoice from './pages/LoginChoice';
import Confirmation from './pages/Confirmation';
import RegisterChoice from './pages/RegisterChoice';
import PsychologistRegister from './pages/PsychologistRegister';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/userLogin" element={<UserLogin />} />
        <Route path="/userRegister" element={<UserRegister />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/psychologist" element={<PsychologistDetail />} /> {/* PsychologistDetail route */}
        <Route path="/online" element={<Online />} />
        <Route path="/offline" element={<Offline />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/registerChoice" element={<RegisterChoice />} />
        <Route path="/psychologistRegister" element={<PsychologistRegister />} />
        <Route path="/loginChoice" element={<LoginChoice />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
