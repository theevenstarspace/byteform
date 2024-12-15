import { ByteStream } from "../src";

describe("BufferView", () => {
  it("should create a buffer view", () => {
    const buffer = new ArrayBuffer(16);
    const view = new ByteStream(buffer);

    expect(view.buffer).toBe(buffer);
    expect(view.view).toBeInstanceOf(DataView);
    expect(view.position).toBe(0);
  });

  it("should seek to a position", () => {
    const buffer = new ArrayBuffer(16);
    const view = new ByteStream(buffer);

    view.seek(8);
    expect(view.position).toBe(8);
  });

  it("should skip to a position", () => {
    const buffer = new ArrayBuffer(16);
    const view = new ByteStream(buffer);

    view.skip(8);
    expect(view.position).toBe(8);
  });

  it("should throw an error when seeking out of bounds", () => {
    const buffer = new ArrayBuffer(16);
    const view = new ByteStream(buffer);

    expect(() => view.seek(17)).toThrow(RangeError);
  });

  it("should throw an error when skipping out of bounds", () => {
    const buffer = new ArrayBuffer(16);
    const view = new ByteStream(buffer);

    expect(() => view.skip(17)).toThrow(RangeError);
  });

  it("should create a subarray", () => {
    const buffer = new ArrayBuffer(16);
    const view = new ByteStream(buffer);

    const subarray = view.subarray(8, 16);
    expect(subarray).toBeInstanceOf(Uint8Array);
    expect(subarray.byteLength).toBe(8);
  });
});