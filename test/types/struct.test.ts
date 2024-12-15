import { ByteStreamWriter, ByteStreamReader, Struct, f64, u8, text } from "../../src";

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