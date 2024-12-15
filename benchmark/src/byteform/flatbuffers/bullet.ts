/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */

// Generated using: https://flatbuffers.ar.je/

// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { Vec3 } from './vec3';


export class Bullet {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Bullet {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsBullet(bb:flatbuffers.ByteBuffer, obj?:Bullet):Bullet {
    return (obj || new Bullet()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  static getSizePrefixedRootAsBullet(bb:flatbuffers.ByteBuffer, obj?:Bullet):Bullet {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new Bullet()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
  }

  position(obj?:Vec3):Vec3|null {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? (obj || new Vec3()).__init(this.bb_pos + offset, this.bb!) : null;
  }

  velocity(obj?:Vec3):Vec3|null {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset ? (obj || new Vec3()).__init(this.bb_pos + offset, this.bb!) : null;
  }

  static startBullet(builder:flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addPosition(builder:flatbuffers.Builder, positionOffset:flatbuffers.Offset) {
    builder.addFieldStruct(0, positionOffset, 0);
  }

  static addVelocity(builder:flatbuffers.Builder, velocityOffset:flatbuffers.Offset) {
    builder.addFieldStruct(1, velocityOffset, 0);
  }

  static endBullet(builder:flatbuffers.Builder):flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

}