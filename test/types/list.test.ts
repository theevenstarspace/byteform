import { BufferWriter, BufferReader, List, f64 } from "../../src";

describe("List", () => {
  it("should write and read", () => {
    const writer = new BufferWriter(1024);

    const list = new List(f64);
    list.write([1.5, 2.4, 3.6], writer);

    const buffer = writer.commit();

    const reader = new BufferReader(buffer);

    const value = list.read(reader);

    expect(value).toEqual([1.5, 2.4, 3.6]);
  });

  it("should write and read empty", () => {
    const writer = new BufferWriter(1024);

    const list = new List(f64);
    list.write([], writer);

    const buffer = writer.commit();

    const reader = new BufferReader(buffer);

    const value = list.read(reader);

    expect(value).toEqual([]);
  });

  it("should write and read nested", () => {
    const writer = new BufferWriter(1024);

    const list = new List(new List(f64));
    list.write([[1.5, 2.4], [3.6]], writer);

    const buffer = writer.commit();

    const reader = new BufferReader(buffer);

    const value = list.read(reader);

    expect(value).toEqual([[1.5, 2.4], [3.6]]);
  });

  it("should write and read nested empty", () => {
    const writer = new BufferWriter(1024);

    const list = new List(new List(f64));
    list.write([[], []], writer);

    const buffer = writer.commit();

    const reader = new BufferReader(buffer);

    const value = list.read(reader);

    expect(value).toEqual([[], []]);
  });

  it("should write and read nested mixed", () => {
    const writer = new BufferWriter(1024);

    const list = new List(new List(f64));
    list.write([[1.5], []], writer);

    const buffer = writer.commit();

    const reader = new BufferReader(buffer);

    const value = list.read(reader);

    expect(value).toEqual([[1.5], []]);
  });

  it("List 'of' should return the correct type", () => {
    const list = new List(f64);

    expect(list.of).toBe(f64);
  });
});
