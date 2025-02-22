import { ByteStreamWriter, ByteStreamReader, b, bu } from "../../../src";

const vec3 = b.struct({
  x: b.f64(),
  y: b.f64(),
  z: b.f64(),
});

const player = b.struct({
  position: vec3,
  age: b.u8(),
  health: b.f64(),
  name: bu.text(),
});

describe("Struct", () => {
  it("should write and read a struct", () => {
    const writer = new ByteStreamWriter(1024);
    player.write(writer, {
      name: "John Doe",
      age: 42,
      health: 98.525,
      position: {
        x: 1.5,
        y: 2.4,
        z: 3.6,
      }
    });

    const reader = new ByteStreamReader(writer.buffer);
    const value = player.read(reader);

    expect(value).toEqual({
      name: "John Doe",
      age: 42,
      health: 98.525,
      position: {
        x: 1.5,
        y: 2.4,
        z: 3.6,
      }
    });
  });

  it("should write and read a struct with stream methods", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeSchema(player, {
      name: "John Doe",
      age: 42,
      health: 98.525,
      position: {
        x: 1.5,
        y: 2.4,
        z: 3.6,
      }
    });

    const reader = new ByteStreamReader(writer.buffer);
    const value = reader.readSchema(player);

    expect(value).toEqual({
      name: "John Doe",
      age: 42,
      health: 98.525,
      position: {
        x: 1.5,
        y: 2.4,
        z: 3.6,
      }
    });
  });
});