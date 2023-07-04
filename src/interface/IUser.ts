export default interface IUser {
  maximumExperience: number;
  id: string;
  email: string;
  name: string | null;
  level: number;
  experience: number;
  score: number;
  createdAt: number;
}
