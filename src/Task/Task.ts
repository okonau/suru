import { __package } from "../private";

export class Task {
  public name?: string;
  public desc?: string;
  public package?: string;
  public runFn: (...args: any[]) => any = () => {};

  public run(...args: any[]) {
    global.suru.run_in_package(this.package, () => {
      this.runFn.call(this, ...args);
    })
  }
}
