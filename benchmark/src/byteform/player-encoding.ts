import benny from 'benny';
import msgpack from 'msgpack-lite';
import { BSON } from 'bson';
import { ByteStreamWriter, b, bu } from '@evenstar/byteform';
import { cleanup, getOptions } from '../utils';
import type { Summary } from 'benny/lib/internal/common-types';
import { encodePlayerFlatbuffer } from './flatbuffers/encode';

export const PlayerEncoding = (): Promise<Summary> => benny.suite(
  'Player encoding',

  benny.add('Byteform', () => {
    /** CREATE SCHEMAS **/
    const vec3 = b.struct({ x: b.f32(), y: b.f32(), z: b.f32() });

    const bullet = b.struct({ position: vec3, velocity: vec3 });

    const player = b.struct({
      name: bu.text(),
      position: vec3,
      rotation: b.f32(),
      bullets: bu.list(bullet),
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
