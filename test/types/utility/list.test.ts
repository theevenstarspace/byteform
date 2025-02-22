import { ByteStreamWriter, ByteStreamReader, b, bu } from "../../../src";

describe("List", () => {
  it("should write and read", () => {
    const writer = new ByteStreamWriter(1024);

    const list = bu.list(b.f64());
    list.write(writer, [1.5, 2.4, 3.6]);

    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);

    const value = list.read(reader);

    expect(value).toEqual([1.5, 2.4, 3.6]);
  });

  it("should write and read empty", () => {
    const writer = new ByteStreamWriter(1024);

    const list = bu.list(b.f64());
    list.write(writer, []);

    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);

    const value = list.read(reader);

    expect(value).toEqual([]);
  });

  it("should write and read nested", () => {
    const writer = new ByteStreamWriter(1024);

    const list = bu.list(bu.list(b.f64()));
    list.write(writer, [[1.5, 2.4], [3.6]]);

    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);

    const value = list.read(reader);

    expect(value).toEqual([[1.5, 2.4], [3.6]]);
  });

  it("should write and read nested empty", () => {
    const writer = new ByteStreamWriter(1024);

    const list = bu.list(bu.list(b.f64()));
    list.write(writer, [[], []]);

    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);

    const value = list.read(reader);

    expect(value).toEqual([[], []]);
  });

  it("should write and read nested mixed", () => {
    const writer = new ByteStreamWriter(1024);

    const list = bu.list(bu.list(b.f64()));
    list.write(writer, [[1.5], []]);

    const buffer = writer.commit();

    const reader = new ByteStreamReader(buffer);

    const value = list.read(reader);

    expect(value).toEqual([[1.5], []]);
  });

  it("List 'of' should return the correct type", () => {
    const f64 = b.f64();
    const list = bu.list(f64);

    expect(list.of).toBe(f64);
  });
});
