import benny from 'benny';
import msgpack from 'msgpack-lite';
import { BSON } from 'bson';
import { BinaryEncoder, f32, List, Struct, text } from '@evenstar/byteform';
import { getOptions } from './utils';
import type { Summary } from 'benny/lib/internal/common-types';
import { encodePlayerFlatbuffer } from './flatbuffers/enocde';

export const PlayerEncoding = (): Promise<Summary> => benny.suite(
  'Player encoding',

  benny.add('Byteform', () => {
    /** CREATE SCHEMAS **/
    const vec3 = new Struct({ x: f32, y: f32, z: f32 });

    const bullet = new Struct({ position: vec3, velocity: vec3 });

    const player = new Struct({
      name: text,
      position: vec3,
      rotation: f32,
      bullets: new List(bullet),
    });

    /** CREATE ENCODER **/
    const encoder = BinaryEncoder.create(128);

    /** CYCLE FUNCTION **/
    return (): void => {
      // Reset the encoder to start from scratch
      encoder.reset();

      // Encode the player object
      encoder.encode(player, {
        name: 'Player',
        position: { x: 1, y: 2, z: 3 },
        rotation: 0,
        bullets: [
          { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
          { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
        ],
      });

      // Commit the encoded data to a Uint8Array
      encoder.commitUint8Array();
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
  benny.complete(),

  benny.save(getOptions('player-encoding')),
);
