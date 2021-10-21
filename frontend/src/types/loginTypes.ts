export type FormInput = {
  username: string;
  password: string;
};
export type File = Blob & {
  readonly lastModified: number;
  readonly name: string;
};
export type Cred = {
  username: string;
  password: string;
};
export type JWT = {
  refresh: string;
  access: string;
};
export type PostProf = {
  id: string;
  img: File | null;
  introduction: string | null;
};
export type Profile = {
  id: string;
  user_profile: number;
  img: string | null;
  introduction: string | null;
};
