import * as flatbuffers from 'flatbuffers';
import { Player } from './player';
import type { PlayerInterface } from './types';

export const decodePlayerFlatbuffer = (buffer: Uint8Array): void => {
  // Create a player object from the Flatbuffer data
  const instance = Player.getRootAsPlayer(new flatbuffers.ByteBuffer(buffer));

  const entity = {} as PlayerInterface;

  entity.name = instance.name()!;

  const entityPosition = instance.position()!;

  entity.position = {} as PlayerInterface['position'];
  entity.position.x = entityPosition.x();
  entity.position.y = entityPosition.y();
  entity.position.z = entityPosition.z();

  entity.rotation = instance.rotation();

  const bullets = [] as PlayerInterface['bullets'];
  const bulletsCount = instance.bulletsLength();

  for (let i = 0; i < bulletsCount; i++) {
    const bullet = instance.bullets(i)!;

    const bulletPosition = bullet.position()!;
    const bulletVelocity = bullet.velocity()!;

    bullets.push({
      position: {
        x: bulletPosition.x(),
        y: bulletPosition.y(),
        z: bulletPosition.z(),
      },
      velocity: {
        x: bulletVelocity.x(),
        y: bulletVelocity.y(),
        z: bulletVelocity.z(),
      },
    });
  }

  entity.bullets = bullets;
};