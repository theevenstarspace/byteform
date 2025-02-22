import benny from 'benny';
import msgpack from 'msgpack-lite';
import { BSON } from 'bson';
import { ByteStreamReader, ByteStreamWriter, b, bu } from '@evenstar/byteform';
import { cleanup, getOptions } from '../utils';
import type { Summary } from 'benny/lib/internal/common-types';
import { encodePlayerFlatbuffer } from './flatbuffers/encode';
import { decodePlayerFlatbuffer } from './flatbuffers/decode';

export const PlayerDecoding = (): Promise<Summary> => benny.suite(
  'Player decoding',

  benny.add('Byteform', () => {
    /** CREATE SCHEMAS **/
    const vec3 = b.struct({ x: b.f32(), y: b.f32(), z: b.f32() });

    const bullet = b.struct({ position: vec3, velocity: vec3 });

    const player = b.struct({
      name: b.cstr(8),
      position: vec3,
      rotation: b.f32(),
      bullets: bu.list(bullet),
    });

    /** CREATE ENCODER AND ENCODE PLAYER **/
    const encoder = new ByteStreamWriter(128);

    encoder.writeSchema(player, {
      name: 'Player',
      position: { x: 1, y: 2, z: 3 },
      rotation: 0,
      bullets: [
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
      ],
    });

    /** GET ENCODED DATA **/
    const buffer = encoder.commit();

    /** CYCLE FUNCTION **/
    return (): void => {
      // Create a decoder from the encoded data
      const decoder = new ByteStreamReader(buffer);

      // Decode the player object
      decoder.readSchema(player);
    };
  }),

  benny.add('JSON', () => {
    /** ENCODE PLAYER TO JSON **/
    const json = JSON.stringify({
      name: 'Player',
      position: { x: 1, y: 2, z: 3 },
      rotation: 0,
      bullets: [
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
      ],
    });

    /** CYCLE FUNCTION **/
    return (): void => {
      // Parse the JSON string
      JSON.parse(json);
    };
  }),

  benny.add('Msgpack-lite', () => {
    /** ENCODE PLAYER TO MESSAGEPACK **/
    const buffer = msgpack.encode({
      name: 'Player',
      position: { x: 1, y: 2, z: 3 },
      rotation: 0,
      bullets: [
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
      ],
    });

    /** CYCLE FUNCTION **/
    return (): void => {
      // Decode the MessagePack buffer
      msgpack.decode(buffer);
    };
  }),

  benny.add('Flatbuffers', () => {
    /** ENCODE PLAYER TO FLATBUFFER **/
    const data = encodePlayerFlatbuffer();

    /** CYCLE FUNCTION **/
    return (): void => decodePlayerFlatbuffer(data);
  }),

  benny.add('BSON', () => {
    /** ENCODE PLAYER TO BSON **/
    const buffer = BSON.serialize({
      name: 'Player',
      position: { x: 1, y: 2, z: 3 },
      rotation: 0,
      bullets: [
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
        { position: { x: 1, y: 2, z: 3 }, velocity: { x: 1, y: 2, z: 3 } },
      ],
    });

    /** CYCLE FUNCTION **/
    return (): void => {
      // Decode the BSON buffer
      BSON.deserialize(buffer);
    };
  }),

  benny.cycle(),
  benny.complete(cleanup),

  benny.save(getOptions('byteform', 'player-decoding')),
);
