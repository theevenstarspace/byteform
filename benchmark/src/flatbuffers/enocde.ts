import * as flatbuffers from 'flatbuffers';
import { Player } from './player';
import { Vec3 } from './vec3';
import { Bullet } from './bullet';

export const encodePlayerFlatbuffer = (): Uint8Array => {
  const builder = new flatbuffers.Builder(256);

  Bullet.startBullet(builder);
  Bullet.addPosition(builder, Vec3.createVec3(builder, 1, 2, 3));
  Bullet.addVelocity(builder, Vec3.createVec3(builder, 1, 2, 3));
  const bullet1 = Bullet.endBullet(builder);

  Bullet.startBullet(builder);
  Bullet.addPosition(builder, Vec3.createVec3(builder, 1, 2, 3));
  Bullet.addVelocity(builder, Vec3.createVec3(builder, 1, 2, 3));
  const bullet2 = Bullet.endBullet(builder);

  const bulletsOffset = Player.createBulletsVector(builder, [bullet1, bullet2]);

  const name = builder.createString('Player');

  Player.startPlayer(builder);
  Player.addName(builder, name);

  const position = Vec3.createVec3(builder, 1, 2, 3);
  Player.addPosition(builder, position);

  Player.addRotation(builder, 0);
  Player.addBullets(builder, bulletsOffset);

  const player = Player.endPlayer(builder);

  builder.finish(player);

  return builder.asUint8Array();
};