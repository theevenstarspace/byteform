
export interface Vector3Interface {
  x: number;
  y: number;
  z: number;
}

export interface BulletInterface {
  position: Vector3Interface;
  velocity: Vector3Interface;
}

export interface PlayerInterface {
  name: string;
  position: Vector3Interface;
  rotation: number;
  bullets: BulletInterface[];
}
