// data/user.ts
export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'beneficiary' | 'child'; // Add role
}

const users: User[] = [
  { id: '1', email: 'admin@email.com', password: 'adminpass', role: 'admin' },
  { id: '2', email: 'beneficiary@email.com', password: 'benefitpass', role: 'beneficiary' },
  { id: '3', email: 'child@email.com', password: 'childpass', role: 'child' },
];

export const getUserByEmail = (email: string): User | undefined =>
  users.find(user => user.email === email);
