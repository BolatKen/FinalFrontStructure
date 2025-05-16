export type Category = {
  id: number;
  name: string;
  slug: string;
  parent: number | null;
  is_in_welcome: boolean;
};