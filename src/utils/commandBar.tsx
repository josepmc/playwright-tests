import ReactDOMServer from 'react-dom/server';
import { GetAllUsers, User } from './user';

export async function AddRecords() {
  // Preload all the users instead of using a loading function
  // Reduces the number of calls to the API
  const users = await GetAllUsers();

  window.CommandBar.addComponent(
    'record-preview-with-image',
    'Basic Record Preview with an image',
    {
      mount: (elem) => ({
        render: (data) => {
          const { username, image, bunny, email, company } = data as User;
          elem.innerHTML = ReactDOMServer.renderToStaticMarkup(
            <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-4">
              <img
                src={image}
                alt="User"
                className="w-24 h-24 object-cover rounded-full mr-4"
              />
              <div className="text-gray-700 mb-2">Username: @{username}</div>
              <div className="text-gray-700 mb-2">Email: {email}</div>
              <div className="text-gray-700 mb-2">Company: {company.name}</div>
              <div className="text-gray-700 flex items-center">
                <span className="mr-2">Favourite Bunny:</span>
                <img
                  src={bunny}
                  alt="Bunny"
                  className="w-12 h-12 object-cover rounded-full"
                />
              </div>
            </div>,
          );
        },
        unmount: () => {
          // ... clean up any timers, event handlers, etc. ...
        },
      }),
    },
  );

  window.CommandBar.addRecords(
    'users',
    users.map((user) => ({ ...user, label: user.username, icon: user.image })),
    { detail: { type: 'component', value: 'record-preview-with-image' } },
  );
  window.CommandBar.addRecordAction(
    'users',
    {
      text: 'Open Profile',
      name: 'open_profile',
      template: {
        type: 'link',
        value: '/profile/{{record.id}}',
        operation: 'router', // how should the page open
      },
    },
    true,
    true,
  );
}
