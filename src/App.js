import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import AuthForm from "./components/AuthForm";
import Gallery from "./components/Gallery";
import DraggableGallery from "./components/DraggableGallery";
import DraggableImage from "./components/DraggableImage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const AuthRoute = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign out successful");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  if (!user) {
    return <AuthForm />;
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Gallery App
          </Link>
          <div className="navbar-nav ms-auto">
            <button className="btn btn-outline-primary" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthRoute />}>
            <Route index element={<Gallery />} />
            <Route path="/draggable/images" element={<DraggableGallery />} />
            <Route path="/draggable/images" element={<DraggableImage />} />
          </Route>
        </Routes>
      </Router>
    </DndProvider>
  );
};

export default App;
