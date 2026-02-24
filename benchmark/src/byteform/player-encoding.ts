import benny from 'benny';
import msgpack from 'msgpack-lite';
import { BSON } from 'bson';
import { ByteStreamWriter, f32, List, Struct, Str } from '@evenstar/byteform';
import { cleanup, getOptions } from '../utils';
import type { Summary } from 'benny/lib/internal/common-types';
import { encodePlayerFlatbuffer } from './flatbuffers/encode';

export const PlayerEncoding = (): Promise<Summary> => benny.suite(
  'Player encoding',

  benny.add('Byteform raw', () => {
    /** CREATE ENCODER **/
    const encoder = new ByteStreamWriter(128);

    const data = {
      name: 'Player',
      position: { x: 1, y: 2, z: 3 },
      rotation: 0,
      bullets: [
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
      ],
    };

    /** CYCLE FUNCTION **/
    return (): void => {
      // Reset the encoder to start from scratch
      encoder.reset();

      // Encode the player object

      encoder.writeString(data.name, 16); // Write name

      encoder.writeFloat32(data.position.x); // X Position
      encoder.writeFloat32(data.position.y); // Y Position
      encoder.writeFloat32(data.position.z); // Z Position

      encoder.writeFloat32(data.rotation); // Rotation

      encoder.writeUint32(data.bullets.length); // Bullet Count
      for (let i = 0; i < data.bullets.length; i++) {
        const bullet = data.bullets[i];

        encoder.writeFloat32(bullet.position.x);
        encoder.writeFloat32(bullet.position.y);
        encoder.writeFloat32(bullet.position.z);

        encoder.writeFloat32(bullet.velocity.x);
        encoder.writeFloat32(bullet.velocity.y);
        encoder.writeFloat32(bullet.velocity.z);
      }

      // Commit the encoded data to a Uint8Array
      encoder.commit();
    };
  }),

  benny.add('Byteform', () => {
    /** CREATE SCHEMAS **/
    const vec3 = new Struct({ x: f32, y: f32, z: f32 });

    const bullet = new Struct({ position: vec3, velocity: vec3 });

    const player = new Struct({
      name: new Str(16),
      position: vec3,
      rotation: f32,
      bullets: new List(bullet),
    });

    /** CREATE ENCODER **/
    const encoder = new ByteStreamWriter(128);

    /** CYCLE FUNCTION **/
    return (): void => {
      // Reset the encoder to start from scratch
      encoder.reset();

      // Encode the player object
      encoder.writeSchema(player, {
        name: 'Player',
        position: { x: 1, y: 2, z: 3 },
        rotation: 0,
        bullets: [
          { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
          { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
        ],
      });

      // Commit the encoded data to a Uint8Array
      encoder.commit();
    };
  }),

  benny.add('JSON', () => {
    /** CYCLE FUNCTION **/
    JSON.stringify({
      name: 'Player',
      position: { x: 1, y: 2, z: 3 },
      rotation: 0,
      bullets: [
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
      ],
    });
  }),

  benny.add('Msgpack-lite', () => {
    /** CYCLE FUNCTION **/
    msgpack.encode({
      name: 'Player',
      position: { x: 1, y: 2, z: 3 },
      rotation: 0,
      bullets: [
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
      ],
    });
  }),

  benny.add('Flatbuffers', encodePlayerFlatbuffer),

  benny.add('BSON', () => {
    /** CYCLE FUNCTION **/
    BSON.serialize({
      name: 'Player',
      position: { x: 1, y: 2, z: 3 },
      rotation: 0,
      bullets: [
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
      ],
    });
  }),

  benny.cycle(),
  benny.complete(cleanup),

  benny.save(getOptions('byteform', 'player-encoding')),
);
