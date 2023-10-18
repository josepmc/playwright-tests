import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

export function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <nav>
        <ul className="flex justify-center">
          <li>
            <Link
              to="/"
              data-testid="home"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
            >
              Home
            </Link>
          </li>
        </ul>
      </nav>

      <hr className="my-4" />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
