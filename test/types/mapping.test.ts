import {
  ByteStreamWriter,
  ByteStreamReader,
  Mapping,
  u8,
  u16,
  u32,
  f64,
  text,
  i8,
} from "../../src";

describe("Mapping", () => {
  describe("write and read", () => {
    it("should write and read a simple mapping", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(u8, f64);

      const map = new Map<number, number>();
      map.set(1, 1.5);
      map.set(2, 2.4);
      map.set(3, 3.6);

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result).toEqual(map);
      expect(result.size).toBe(3);
    });

    it("should write and read an empty mapping", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(u8, f64);

      const map = new Map<number, number>();
      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result).toEqual(map);
      expect(result.size).toBe(0);
    });

    it("should write and read a mapping with string keys and number values", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(text, f64);

      const map = new Map<string, number>();
      map.set("x", 1.5);
      map.set("y", 2.4);
      map.set("z", 3.6);

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result).toEqual(map);
      expect(result.size).toBe(3);
    });

    it("should write and read a mapping with number keys and string values", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(u8, text);

      const map = new Map<number, string>();
      map.set(1, "one");
      map.set(2, "two");
      map.set(3, "three");

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result).toEqual(map);
      expect(result.size).toBe(3);
    });

    it("should write and read a mapping with custom size schema", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(u8, f64, u16);

      const map = new Map<number, number>();
      map.set(1, 1.5);
      map.set(2, 2.4);

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result).toEqual(map);
      expect(result.size).toBe(2);
    });

    it("should write and read a mapping with large number of entries", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(u8, u16);

      const map = new Map<number, number>();
      for (let i = 0; i < 100; i++) {
        map.set(i, i * 2);
      }

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result).toEqual(map);
      expect(result.size).toBe(100);
    });

    it("should write and read a mapping with zero values", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(u8, f64);

      const map = new Map<number, number>();
      map.set(0, 0);
      map.set(1, 0);

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result).toEqual(map);
      expect(result.size).toBe(2);
    });

    it("should write and read a mapping with negative values", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(i8, f64);

      const map = new Map<number, number>();
      map.set(-1, -1.5);
      map.set(-2, -2.4);

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result).toEqual(map);
      expect(result.size).toBe(2);
    });
  });

  describe("stream methods", () => {
    it("should work with stream writeSchema and readSchema methods", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(u8, f64);

      const map = new Map<number, number>();
      map.set(1, 1.5);
      map.set(2, 2.4);

      writer.writeSchema(mapping, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = reader.readSchema(mapping);

      expect(result).toEqual(map);
      expect(result.size).toBe(2);
    });
  });

  describe("edge cases", () => {
    it("should handle mapping with single entry", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(u8, f64);

      const map = new Map<number, number>();
      map.set(42, 99.9);

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result).toEqual(map);
      expect(result.size).toBe(1);
    });

    it("should handle mapping with maximum u8 values", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(u8, u8);

      const map = new Map<number, number>();
      map.set(255, 255);
      map.set(0, 0);

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result).toEqual(map);
      expect(result.size).toBe(2);
    });

    it("should handle mapping with custom size schema that can handle large sizes", () => {
      const writer = new ByteStreamWriter(4 * 1024);
      const mapping = new Mapping(u16, u8, u32);

      const map = new Map<number, number>();
      for (let i = 0; i < 1000; i++) {
        map.set(i, i % 256);
      }

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result).toEqual(map);
      expect(result.size).toBe(1000);
    });
  });

  describe("data integrity", () => {
    it("should preserve key-value pairs exactly", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(text, f64);

      const map = new Map<string, number>();
      map.set("precision", 3.14159265359);
      map.set("euler", 2.71828182846);
      map.set("golden", 1.61803398875);

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      expect(result.get("precision")).toBeCloseTo(3.14159265359, 10);
      expect(result.get("euler")).toBeCloseTo(2.71828182846, 10);
      expect(result.get("golden")).toBeCloseTo(1.61803398875, 10);
      expect(result.size).toBe(3);
    });

    it("should maintain insertion order of entries", () => {
      const writer = new ByteStreamWriter(1024);
      const mapping = new Mapping(u8, text);

      const map = new Map<number, string>();
      map.set(3, "third");
      map.set(1, "first");
      map.set(2, "second");

      mapping.write(writer, map);
      const buffer = writer.commit();

      const reader = new ByteStreamReader(buffer);
      const result = mapping.read(reader);

      // Map maintains insertion order in modern JavaScript
      const entries = Array.from(result.entries());
      expect(entries[0]).toEqual([3, "third"]);
      expect(entries[1]).toEqual([1, "first"]);
      expect(entries[2]).toEqual([2, "second"]);
    });
  });
});
