export type UserDTO = {
  id: number;
  photoUrl: string;
  name: string;
  email: string;
  status: 'Active' | 'Flagged' | 'Suspended';
  joined: string;
  bio: string;
  role: string;
  active: boolean;
  isEmailVerified: boolean;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  suspended: boolean;
};

export type Role = 'EDITOR' | 'SUPERADMIN';
