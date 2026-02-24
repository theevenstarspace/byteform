import { Dictionary, u8, u16, u32, f64, text, i8 } from "../../src";
import { writeAndRead } from "./utils";

describe("Dictionary", () => {
  describe("write and read", () => {
    it("should write and read a simple dictionary", () => {
      const dictionary = new Dictionary(u8, f64);

      const map = new Map<number, number>();
      map.set(1, 1.5);
      map.set(2, 2.4);
      map.set(3, 3.6);

      const result = writeAndRead(dictionary, map);

      expect(result).toEqual(map);
      expect(result.size).toBe(3);
    });

    it("should write and read an empty dictionary", () => {
      const dictionary = new Dictionary(u8, f64);

      const map = new Map<number, number>();
      const result = writeAndRead(dictionary, map);

      expect(result).toEqual(map);
      expect(result.size).toBe(0);
    });

    it("should write and read a dictionary with string keys and number values", () => {
      const dictionary = new Dictionary(text, f64);

      const map = new Map<string, number>();
      map.set("x", 1.5);
      map.set("y", 2.4);
      map.set("z", 3.6);

      const result = writeAndRead(dictionary, map);

      expect(result).toEqual(map);
      expect(result.size).toBe(3);
    });

    it("should write and read a dictionary with number keys and string values", () => {
      const dictionary = new Dictionary(u8, text);

      const map = new Map<number, string>();
      map.set(1, "one");
      map.set(2, "two");
      map.set(3, "three");

      const result = writeAndRead(dictionary, map);

      expect(result).toEqual(map);
      expect(result.size).toBe(3);
    });

    it("should write and read a dictionary with custom size schema", () => {
      const dictionary = new Dictionary(u8, f64, u16);

      const map = new Map<number, number>();
      map.set(1, 1.5);
      map.set(2, 2.4);

      const result = writeAndRead(dictionary, map);

      expect(result).toEqual(map);
      expect(result.size).toBe(2);
    });

    it("should write and read a dictionary with large number of entries", () => {
      const dictionary = new Dictionary(u8, u16);

      const map = new Map<number, number>();
      for (let i = 0; i < 100; i++) {
        map.set(i, i * 2);
      }

      const result = writeAndRead(dictionary, map);

      expect(result).toEqual(map);
      expect(result.size).toBe(100);
    });

    it("should write and read a dictionary with zero values", () => {
      const dictionary = new Dictionary(u8, f64);

      const map = new Map<number, number>();
      map.set(0, 0);
      map.set(1, 0);

      const result = writeAndRead(dictionary, map);

      expect(result).toEqual(map);
      expect(result.size).toBe(2);
    });

    it("should write and read a dictionary with negative values", () => {
      const dictionary = new Dictionary(i8, f64);

      const map = new Map<number, number>();
      map.set(-1, -1.5);
      map.set(-2, -2.4);

      const result = writeAndRead(dictionary, map);

      expect(result).toEqual(map);
      expect(result.size).toBe(2);
    });
  });

  describe("stream methods", () => {
    it("should work with stream writeSchema and readSchema methods", () => {
      const dictionary = new Dictionary(u8, f64);

      const map = new Map<number, number>();
      map.set(1, 1.5);
      map.set(2, 2.4);

      const result = writeAndRead(dictionary, map);

      expect(result).toEqual(map);
      expect(result.size).toBe(2);
    });
  });

  describe("edge cases", () => {
    it("should handle dictionary with single entry", () => {
      const dictionary = new Dictionary(u8, f64);

      const map = new Map<number, number>();
      map.set(42, 99.9);

      const result = writeAndRead(dictionary, map);

      expect(result).toEqual(map);
      expect(result.size).toBe(1);
    });

    it("should handle dictionary with maximum u8 values", () => {
      const dictionary = new Dictionary(u8, u8);

      const map = new Map<number, number>();
      map.set(255, 255);
      map.set(0, 0);

      const result = writeAndRead(dictionary, map);

      expect(result).toEqual(map);
      expect(result.size).toBe(2);
    });

    it("should handle dictionary with custom size schema that can handle large sizes", () => {
      const dictionary = new Dictionary(u16, u8, u32);

      const map = new Map<number, number>();
      for (let i = 0; i < 1000; i++) {
        map.set(i, i % 256);
      }

      const result = writeAndRead(dictionary, map, 4 * 1024);

      expect(result).toEqual(map);
      expect(result.size).toBe(1000);
    });
  });

  describe("data integrity", () => {
    it("should preserve key-value pairs exactly", () => {
      const dictionary = new Dictionary(text, f64);

      const map = new Map<string, number>();
      map.set("precision", 3.14159265359);
      map.set("euler", 2.71828182846);
      map.set("golden", 1.61803398875);

      const result = writeAndRead(dictionary, map);

      expect(result.get("precision")).toBeCloseTo(3.14159265359, 10);
      expect(result.get("euler")).toBeCloseTo(2.71828182846, 10);
      expect(result.get("golden")).toBeCloseTo(1.61803398875, 10);
      expect(result.size).toBe(3);
    });

    it("should maintain insertion order of entries", () => {
      const dictionary = new Dictionary(u8, text);

      const map = new Map<number, string>();
      map.set(3, "third");
      map.set(1, "first");
      map.set(2, "second");

      const result = writeAndRead(dictionary, map);

      // Dictionary maintains insertion order in modern JavaScript
      const entries = Array.from(result.entries());
      expect(entries[0]).toEqual([3, "third"]);
      expect(entries[1]).toEqual([1, "first"]);
      expect(entries[2]).toEqual([2, "second"]);
    });
  });
});
