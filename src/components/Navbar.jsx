import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/source-definitions"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Source Definitions
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create-source"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Create Source
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/create-workspace"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Create Workspace
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/update-workspace"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            Update Workspace
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
