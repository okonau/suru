import { Suru, SuruBit, Task } from "../..";

type TaskRunFn = (...args: any[]) => any;

export const RunBit: SuruBit = (runFn: TaskRunFn) => (t: Task) => {
  const prevRun = (t.runFn || (() => {})).bind(t);

  t.runFn = (...args: string[]) => {
    prevRun(...args);
    runFn(...args);
  };
};
