import { Suru, SuruBit, Task } from "../..";

export const NameBit: SuruBit = (name: string) => (t: Task) => {
  t.name = name;
};