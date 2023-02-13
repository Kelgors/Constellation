export type Point = {
  x: number;
  y: number;
};
export type JumpgateConfiguration = {
  ip: string;
  port: number;
  position: Point;
};
export type SystemConfiguration = {
  name: string;
  ip: string;
  port: number;
  jumpgates: JumpgateConfiguration[];
};
