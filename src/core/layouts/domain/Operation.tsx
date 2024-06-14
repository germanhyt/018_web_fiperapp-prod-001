export interface Operation {
  id: number;
  title: string;
  description: string | null;
  mount: number;
  createdAt: Date | null;
  operationtypeId: number;
}
