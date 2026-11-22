import { Link } from "react-router-dom";

export const Navbar = ({ isLoggedIn, handleLogout }) => {
  return (
    <nav className="flex justify-between items-center px-10 py-4 border-b">
      <Link to="/" className="text-xl font-semibold">
        Online Test
      </Link>

      <div className="flex gap-6">
        {isLoggedIn ? (
          <>
            <Link to="/test">Test</Link>
            <Link to="/test/history">Histories</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};
