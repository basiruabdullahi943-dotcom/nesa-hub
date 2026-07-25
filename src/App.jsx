import { Routes, Route, useLocation } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import Materials from "./pages/Materials.jsx";
import BottomNav from "./components/BottomNav";
import Profile from "./pages/Profile";
import News from "./pages/News";
import NewsDetails from "./pages/NewsDetails";
import Admin from "./pages/Admin";
import Executives from "./pages/Executives";
import ExecutiveDetails from "./pages/ExecutiveDetails";
import Saved from "./pages/Saved";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import PastQuestions from "./pages/PastQuestions";
import Timetable from "./pages/Timetable";
import Notifications from "./pages/Notifications";
import Feedback from "./pages/Feedback";
import Splash from "./pages/Splash";
import Search from "./pages/Search";
import Contribution from "./pages/Contribution";
import AboutNESA from "./pages/AboutNESA";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import HelpSupport from "./pages/HelpSupport";
import Voting from "./pages/Voting";
import VoteBallot from "./pages/VoteBallot";
import VerifyEmail from "./pages/VerifyEmail";
import ElectionResults from "./pages/ElectionResults";

function App() {

const location = useLocation();
const hideBottomNav = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/admin-login"
].includes(location.pathname);

const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

    setUser(currentUser);
    setLoading(false);

  });

  return () => unsubscribe();

}, []);
if (loading) {
  return <p>Loading...</p>;
}

  return (
    <>
      <Routes>
        <Route
  path="/search"
  element={<Search />}
/>
        <Route path="/" element={<Splash />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
        <Route path="/login" element={<Login />} />
        <Route
  path="/materials"
  element={
    <ProtectedRoute>
      <Materials />
    </ProtectedRoute>
  }
/>
<Route
  path="/election-results"
  element={
    <ProtectedRoute>
      <ElectionResults />
    </ProtectedRoute>
  }
/>
<Route path="/vote-ballot" element={<VoteBallot />} />
<Route
  path="/about"
  element={<AboutNESA />}
/>
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
<Route
  path="/voting"
  element={
    <ProtectedRoute>
      <Voting />
    </ProtectedRoute>
  }
/>
        <Route path="/news" element={<News />} />
<Route
  path="/contribution"
  element={
    <ProtectedRoute>
      <Contribution />
    </ProtectedRoute>
  }
/>
<Route
  path="/terms"
  element={<TermsConditions />}
/>
<Route path="/verify-email" element={<VerifyEmail />} />
<Route
  path="/help"
  element={<HelpSupport />}
/>
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>
<Route
  path="/privacy"
  element={<PrivacyPolicy />}
/>
        <Route path="/executives" element={<Executives />} />
        <Route path="/executive/:id" element={<ExecutiveDetails />} />
        <Route
  path="/saved"
  element={
    <ProtectedRoute>
      <Saved />
    </ProtectedRoute>
  }
/>
        <Route path="/signup" element={<Signup />} />
        <Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>
        <Route
  path="/admin-login"
  element={<AdminLogin />}
/>
<Route
  path="/notifications"
  element={
    <ProtectedRoute>
      <Notifications />
    </ProtectedRoute>
  }
/>
<Route
  path="/past-questions"
  element={
    <ProtectedRoute>
      <PastQuestions />
    </ProtectedRoute>
  }
/>
<Route
  path="/feedback"
  element={
    <ProtectedRoute>
      <Feedback />
    </ProtectedRoute>
  }
/>
<Route
  path="/timetable"
  element={
    <ProtectedRoute>
      <Timetable />
    </ProtectedRoute>
  }
/>
      </Routes>

      {!hideBottomNav && <BottomNav />}

   </> 
  );
}

export default App;