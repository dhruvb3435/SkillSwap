import User from './user.model';

export function getById(id: string) {
  return User.findById(id);
}

export function updateById(id: string, data: Partial<{ name: string; bio: string; avatarUrl: string; timezone: string; skillsTeach: string[]; skillsLearn: string[] }>) {
  return User.findByIdAndUpdate(id, data, { new: true });
}

export function searchBySkill(skill?: string) {
  if (!skill) return User.find().limit(50);
  const re = new RegExp(skill, 'i');
  return User.find({ $or: [{ skillsTeach: re }, { skillsLearn: re }] }).limit(50);
}

export function searchByName(name?: string) {
  if (!name) return User.find().limit(50);
  const re = new RegExp(name, 'i');
  return User.find({ name: re }).limit(50);
}