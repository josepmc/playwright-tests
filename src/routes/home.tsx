import { GetCachedUsers } from '../utils/user';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div
      className="flex flex-col items-center justify-center"
      data-testid="homepage-content"
    >
      <div className="mb-4 text-2xl font-bold">Welcome to the home page!</div>
      <div className="mb-4">Click the button below to show feedback.</div>
      <button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md mb-4 cursor-pointer"
        onClick={() => window.CommandBar.trackEvent('testEvent', {})}
        data-testid="show-feedback-button"
      >
        Show Feedback
      </button>
      <div className="mt-4 mb-4">
        Use cmd+k to search for a user or press{' '}
        <button
          className="text-blue-500 hover:bg-blue-100 cursor-pointer"
          data-testid="command-bar-button"
          onClick={() => window.CommandBar.open()}
        >
          Open CommandBar
        </button>
      </div>
      <div className="w-full">
        <div className="text-lg font-bold mb-4">
          These are the users currently loaded in the system:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GetCachedUsers().map((user) => (
            <Link key={user.id} to={`/profile/${user.id}`}>
              <div
                className="bg-white rounded-lg hover:shadow-md overflow-hidden cursor-pointer"
                data-testid="user-card"
              >
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-full h-32 object-cover"
                  data-testid="image"
                />
                <div className="p-1">
                  <div className="text-lg font-bold mb-1" data-testid="name">
                    {user.name}
                  </div>
                  <div className="text-gray-500" data-testid="username">
                    {user.username}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
