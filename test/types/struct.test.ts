import { BufferWriter, BufferReader, Struct, f64, u8, text } from "../../src";

describe("Struct", () => {
  const vec3 = new Struct({
    x: f64,
    y: f64,
    z: f64,
  });

  const player = new Struct({
    position: vec3,
    age: u8,
    health: f64,
    name: text,
  });

  it("should write and read a struct", () => {
    const writer = new BufferWriter(1024);
    player.write({
      name: "John Doe",
      age: 42,
      health: 98.525,
      position: {
        x: 1.5,
        y: 2.4,
        z: 3.6,
      }
    }, writer);

    const reader = new BufferReader(writer.buffer);
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
});