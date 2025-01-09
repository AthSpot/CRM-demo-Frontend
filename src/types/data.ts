export interface User {
  id: string;
  email: string;
  password_hash: string;
  first_name: string;
  last_name: string;
  photo_url: string;
  birth_date: string;
  created_at: string;
  last_login: string;
  is_active: boolean;
}

export interface UserProfile {
  id: string;
  user_id: string;
  bio: string;
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  preferred_sports: string[];
  location: { latitude: number; longitude: number };
  availability: Record<string, string[]>;
  rating: number;
  updated_at: string;
}

// ... Add other interfaces as needed when implementing specific features