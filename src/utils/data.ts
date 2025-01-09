import { User, UserProfile } from "@/types/data";

export const loadUsers = async (): Promise<User[]> => {
  const response = await fetch('/data/users.json');
  const data = await response.json();
  return data.users;
};

export const loadUserProfiles = async (): Promise<UserProfile[]> => {
  const response = await fetch('/data/user_profiles.json');
  const data = await response.json();
  return data.user_profiles;
};

// Add more data loading functions as needed for other entities