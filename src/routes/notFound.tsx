import { useState } from 'react';
export enum NotFoundType {
  Page = 'Page',
  User = 'User',
}

interface NotFoundProps {
  type?: NotFoundType;
}

export function NotFound(props: NotFoundProps) {
  const [error] = useState<Error | null>(null);
  const { type = NotFoundType.Page } = props;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-8 text-red-500">404 - {type} Not Found</h1>
      <p className="text-2xl text-gray-700 mb-8">
        The {type.toLowerCase()} you are looking for does not exist.
      </p>
      {error && (
        <p className="text-2xl text-gray-700 mb-8">
          An error occured: {error.message}
        </p>
      )}
    </div>
  );
}
