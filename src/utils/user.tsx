import { User as SharedUser } from 'types/user';
export type User = SharedUser;

let users: User[] = [];

export function GetCachedUsers() {
  return users;
}

export async function GetAllUsers() {
  users = (await (
    await fetch(`https://jsonplaceholder.typicode.com/users`)
  ).json()) as unknown as User[];
  users = users.map((user) => ({
    ...user,
    image: `https://i.pravatar.cc/200?u=${user.id}`,
    bunny: `https://bunnies.media/gif/${user.id}.gif`,
  }));
  return users;
}

export async function GetUser(id: number | string): Promise<User> {
  let user = users.find((user) => user.id.toString() === id.toString());
  if (!user) {
    console.error('User not found, fetching from API');
    user = (await (
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    ).json()) as unknown as User;
  }
  return user;
}
