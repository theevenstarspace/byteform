import {
  ByteStreamReader,
  ByteStreamWriter,
  createSchema,
  DiscriminatedUnion,
  Struct,
  text,
  u8,
} from "../../src";

const booleanSchema = createSchema<boolean>({
  write: (writer, value) => writer.writeUint8(value ? 1 : 0),
  read: (reader) => reader.readUint8() !== 0,
});

const result = new DiscriminatedUnion("success", booleanSchema, [
  [true, new Struct({ data: text, requestId: u8 })],
  [false, new Struct({ error: text, retryable: booleanSchema })],
] as const);

const messageUnion = new DiscriminatedUnion("kind", text, [
  ["ok", new Struct({ value: text, severity: u8 })],
  ["error", new Struct({ message: text, source: text })],
] as const);

const codeUnion = new DiscriminatedUnion("code", u8, [
  [1, new Struct({ name: text, active: booleanSchema })],
  [2, new Struct({ reason: text, attempts: u8 })],
  [3, new Struct({ detail: text, codeLabel: text })],
  [4, new Struct({ hint: text, temporary: booleanSchema })],
] as const);

const customDiscriminatorSchema = createSchema<"ping" | "pong">({
  write: (writer, value) => writer.writeUint8(value === "ping" ? 10 : 20),
  read: (reader) => {
    const value = reader.readUint8();
    if (value === 10) {
      return "ping";
    }
    if (value === 20) {
      return "pong";
    }
    throw new Error(`Invalid custom discriminator: ${value}`);
  },
});

const customUnion = new DiscriminatedUnion("type", customDiscriminatorSchema, [
  ["ping", new Struct({ payload: text, id: u8 })],
  ["pong", new Struct({ response: text, duration: u8 })],
] as const);

describe("discriminatedUnion", () => {
  it("should write and read a success variant", () => {
    const writer = new ByteStreamWriter(1024);
    result.write(writer, {
      success: true,
      data: "Hello, World!",
      requestId: 7,
    });

    const reader = new ByteStreamReader(writer.buffer);
    const value = result.read(reader);

    expect(value).toEqual({
      success: true,
      data: "Hello, World!",
      requestId: 7,
    });
  });

  it("should write and read an error variant with stream methods", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeSchema(result, {
      success: false,
      error: "Something went wrong",
      retryable: true,
    });

    const reader = new ByteStreamReader(writer.buffer);
    const value = reader.readSchema(result);

    expect(value).toEqual({
      success: false,
      error: "Something went wrong",
      retryable: true,
    });
  });

  it("should write and read a string discriminator variant", () => {
    const writer = new ByteStreamWriter(1024);
    messageUnion.write(writer, {
      kind: "ok",
      value: "done",
      severity: 2,
    });

    const reader = new ByteStreamReader(writer.buffer);
    const value = messageUnion.read(reader);

    expect(value).toEqual({
      kind: "ok",
      value: "done",
      severity: 2,
    });
  });

  it("should write and read a number discriminator variant", () => {
    const writer = new ByteStreamWriter(1024);
    codeUnion.write(writer, {
      code: 2,
      reason: "invalid",
      attempts: 3,
    });

    const reader = new ByteStreamReader(writer.buffer);
    const value = codeUnion.read(reader);

    expect(value).toEqual({
      code: 2,
      reason: "invalid",
      attempts: 3,
    });
  });

  it("should write and read additional number discriminator variants", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeSchema(codeUnion, {
      code: 4,
      hint: "retry later",
      temporary: true,
    });

    const reader = new ByteStreamReader(writer.buffer);
    const value = reader.readSchema(codeUnion);

    expect(value).toEqual({
      code: 4,
      hint: "retry later",
      temporary: true,
    });
  });

  it("should work with a custom discriminator schema", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeSchema(customUnion, {
      type: "pong",
      response: "ok",
      duration: 10,
    });

    const reader = new ByteStreamReader(writer.buffer);
    const value = reader.readSchema(customUnion);

    expect(value).toEqual({
      type: "pong",
      response: "ok",
      duration: 10,
    });
  });

  it("should throw for duplicate discriminator variants", () => {
    expect(() => {
      new DiscriminatedUnion("kind", text, [
        ["ok", new Struct({ value: text })],
        ["ok", new Struct({ message: text })],
      ] as const);
    }).toThrow("Duplicate discriminator variant: ok");
  });

  it("should throw on write when discriminator is unknown", () => {
    const writer = new ByteStreamWriter(1024);

    expect(() => {
      result.write(writer, {
        success: "maybe",
        data: "unexpected",
        requestId: 1,
      } as never);
    }).toThrow("Unknown discriminator variant: maybe");
  });

  it("should throw on read when discriminator is unknown", () => {
    const writer = new ByteStreamWriter(1024);
    writer.writeUint8(99); // unknown code
    text.write(writer, "payload");

    const reader = new ByteStreamReader(writer.buffer);

    expect(() => {
      codeUnion.read(reader);
    }).toThrow("Unknown discriminator variant: 99");
  });
});
