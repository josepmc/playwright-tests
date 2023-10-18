import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NotFound, NotFoundType } from './notFound';
import { GetUser, User } from '../utils/user';

export function Profile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    GetUser(id as string)
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        setError(err);
      });
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }
  if (error || !user.address) {
    return <NotFound type={NotFoundType.User} />;
  }

  const {
    image,
    bunny,
    name,
    username,
    email,
    address,
    phone,
    website,
    company,
  } = user;

  return (
    <div
      className="flex flex-col items-center justify-center"
      data-testid="profile-page"
    >
      <h1 className="text-4xl mb-8 text-black-500">{name}'s Profile</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center">
          <img
            src={image}
            alt={username}
            className="w-32 h-32 object-cover rounded-full mr-4"
          />
        </div>
        <div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-lg font-bold mb-2">{name}</div>
            <div className="text-gray-500 mb-2">@{username}</div>
            <div className="text-gray-500 mb-2">{email}</div>
            <div className="text-gray-500 mb-2">{phone}</div>
            <div className="text-gray-500">{website}</div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <iframe
          title="Google Maps"
          className="w-full h-64"
          src={`https://maps.google.com/maps?q=${address.geo.lat},${address.geo.lng}&z=15&output=embed`}
        />
      </div>
      <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 mt-8">
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="text-gray-500 font-bold mr-2">Address:</div>
          <div className="text-gray-700">
            {address.street}, {address.suite}, {address.city}, {address.zipcode}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="text-gray-500 font-bold mr-2">Phone:</div>
          <div className="text-gray-700">{phone}</div>
        </div>
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="text-gray-500 font-bold mr-2">Website:</div>
          <div className="text-gray-700">{website}</div>
        </div>
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="text-gray-500 font-bold mr-2">Company:</div>
          <div className="text-gray-700">
            {company.name}, {company.catchPhrase}, {company.bs}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="text-gray-500 font-bold mr-2">Favourite Bunny:</div>
          <div className="text-gray-700">
            <img
              src={bunny}
              alt="Love, everywhere <3"
              className="w-24 h-24 object-cover rounded-full mr-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
