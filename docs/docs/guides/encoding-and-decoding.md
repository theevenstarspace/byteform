# Encoding and Decoding

As was mentioned [before](/guides/schema-definition.mdx), data encoding and decoding in Byteform is done using schemas. A schema is a set of rules that define how data is encoded and decoded.

Assuming you have read the [Schema Definition](/guides/schema-definition.mdx) guide, you should be familiar with the concept of schemas. In this guide, we will cover how to encode and decode data using schemas.

***

## Encoding

Encoding in Byteform is the process of converting data from its native format to a binary format.

### ByteStreamWriter

[ByteStreamWriter](/api/classes/ByteStreamWriter.md) provides a high-level API that allows you to encode data using a schema.

```typescript
import { ByteStreamWriter } from '@evenstar/byteform';

// Create an instance of ByteStreamWriter
const encoder = new ByteStreamWriter(256); // 256 bytes buffer is used internally to write the encoded data

encoder.writeSchema(schema, data); // Encode the data using the schema

// Retrieve the encoded data as an Uint8Array
const { buffer } = encoder.commit(); // Copies the encoded data to a new Uint8Array

// Do something with the encoded data
webSocket.send(buffer);
```

It's possible to reuse the same encoder instance to encode multiple objects. However, it's important to call `encoder.reset()` before encoding a new object.

```typescript
encoder.writeSchema(schema1, data1);
const uint8Array1 = encoder.commit(); // Encoded data for data1

encoder.reset(); // Reset the encoder
encoder.writeSchema(schema2, data2);
const uint8Array2 = encoder.commit(); // Encoded data for data2
```

It's also possible to encode a few objects in a single buffer. You can write as many objects as you want, as long as the buffer has enough space.

```typescript
encoder.writeSchema(schema1, data1);
encoder.writeSchema(schema2, data2);
const uint8Array = encoder.commit(); // Encoded data for data1 and data2
```

### ByteStreamWriter Options

ByteStreamWriter constructor accept the following options:

- `byteLengthOrBuffer` - The initial byte length of the buffer or ArrayBuffer/TypedArray to use to write to.
- `options` - An object with encoding options.

Here is the list of available options:

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
      <th>Possible Values</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>maxByteLength</td>
      <td>The maximum byte length of the buffer. Buffer will grow automatically if this option is set, otherwise an error will be thrown when the buffer is full.</td>
      <td>number | undefined</td>
      <td>undefined</td>
    </tr>
    <tr>
      <td>strategy</td>
      <td>The strategy used to grow the buffer.</td>
      <td style={{ whiteSpace: "nowrap" }}>"exponential" | "additive" | "hybrid"</td>
      <td>exponential</td>
    </tr>
    <tr>
      <td>factor</td>
      <td>The factor by which the buffer grows. Is not used when the strategy is <code>additive</code>.</td>
      <td>number</td>
      <td>2</td>
    </tr>
    <tr>
      <td>increment</td>
      <td>The number of bytes by which the buffer grows. Is not used when the strategy is <code>exponential</code>.</td>
      <td>number</td>
      <td>256</td>
    </tr>
  </tbody>
</table>

:::warning

Writing to **SharedArrayBuffer** is not supported yet!

:::

### Writing Strategies

Byteform provides three strategies for growing the buffer:

#### Exponential

The buffer grows exponentially by multiplying the current byte length by the factor. Useful when you need to encode a large amount of data.

The formula for calculating the new byte length is:

> $newByteLength = byteLength * factor$

#### Additive

The buffer grows additively by adding the increment to the current byte length. Useful when you need to encode a small amount of data.

The formula for calculating the new byte length is:

> $newByteLength = byteLength + increment$

#### Hybrid

Combines the exponential and additive strategies. The buffer grows additively until the byte length reaches the factor, then it switches to the exponential strategy. Works well for encoding data of varying sizes.

The formula for calculating the new byte length is:

> $newByteLength = byteLength + max(increment, byteLength * (factor - 1))$

***

## Decoding

Decoding in Byteform is the process of converting data from a binary format to its native format. There are two ways to decode data:

### ByteStreamReader

[ByteStreamReader](/api/classes/ByteStreamReader.md) provides a high-level API that allows you to decode data using a schema.

```typescript
import { ByteStreamReader } from '@evenstar/byteform';

// Create an instance of BinaryDecoder
const decoder = new ByteStreamReader(arrayBuffer); // Create a reader from an ArrayBuffer

// Decode the data using the schema
const data = decoder.readSchema(schema);

// Do something with the decoded data
console.log(data);
```

### ByteStreamReader Options

ByteStreamReader constructor accept the following options:

- `buffer` - ArrayBuffer, SharedArrayBuffer or TypedArray to use to read from.
