# Encoding and Decoding

As was mentioned [before](/guides/schema-definition.mdx), data encoding and decoding in Byteform is done using schemas. A schema is a set of rules that define how data is encoded and decoded.

Assuming you have read the [Schema Definition](/guides/schema-definition.mdx) guide, you should be familiar with the concept of schemas. In this guide, we will cover how to encode and decode data using schemas.

***

## Encoding

Encoding in Byteform is the process of converting data from its native format to a binary format. There are two ways to encode data:

### BinaryEncoder

[BinaryEncoder](/api/classes/BinaryEncoder.md) it's an easiest way to encode data. It provides a high-level API that allows you to encode data using a schema.

```typescript
import { BinaryEncoder } from '@evenstar/byteform';

// Create an instance of BinaryEncoder
const encoder = BinaryEncoder.create(256); // 256 bytes buffer is used internally to write the encoded data

encoder.encode(schema, data); // Encode the data using the schema

// Retrieve the encoded data as an ArrayBuffer
const arrayBuffer = encoder.commit(); // Copies the encoded data to a new ArrayBuffer

// Do something with the encoded data
webSocket.send(arrayBuffer);
```

:::info
As you might have noticed, in above example we used a static method `create` to create an encoder instance. It's also possible to create an encoder using it's constructor which takes a BufferWriter as an argument which we will cover in the next section.
:::

It's possible to reuse the same encoder instance to encode multiple objects. However, it's important to call `encoder.reset()` before encoding a new object.

```typescript
encoder.encode(schema1, data1);
const arrayBuffer1 = encoder.commit(); // Encoded data for data1

encoder.reset(); // Reset the encoder
encoder.encode(schema2, data2);
const arrayBuffer2 = encoder.commit(); // Encoded data for data2
```

It's also possible to encode a few objects in a single buffer. You can write as many objects as you want, as long as the buffer has enough space.

```typescript
encoder.encode(schema1, data1);
encoder.encode(schema2, data2);
const arrayBuffer = encoder.commit(); // Encoded data for data1 and data2
```

### BufferWriter

[BufferWriter](/api/classes/BufferWriter.md) is a low-level API that allows you to write data to a buffer manually. It's useful when you need more control over the encoding process.

:::info
Actually, BinaryEncoder is a wrapper around BufferWriter. It provides a more user-friendly API for encoding data.
:::

Let's see how to encode data using BufferWriter:

```typescript
import { BufferWriter } from '@evenstar/byteform';

// Create a writer with a buffer of 256 bytes
const writer = new BufferWriter(256);

// Write data to the buffer
schema.write(data, writer);

// Retrieve the encoded data as an ArrayBuffer
const arrayBuffer = writer.commit();

// Do something with the encoded data
webSocket.send(arrayBuffer);
```

The same way you can reuse the writer instance to encode multiple objects.

```typescript
const writer = new BufferWriter(256);

schema1.write(data1, writer);
const arrayBuffer1 = writer.commit(); // Encoded data for data1

writer.reset(); // Reset the writer
schema2.write(data2, writer);
const arrayBuffer2 = writer.commit(); // Encoded data for data2
```

### Encoding Options

Both `BinaryEncoder.create` and `BufferWriter` constructor accept the following options:

- `byteLength` - The initial byte length of the buffer. Default is 256.
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

### Encoding Strategies

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

### BinaryDecoder

[BinaryDecoder](/api/classes/BinaryDecoder.md) it's an easiest way to decode data. It provides a high-level API that allows you to decode data using a schema.

```typescript
import { BinaryDecoder } from '@evenstar/byteform';

// Create an instance of BinaryDecoder
const decoder = BinaryDecoder.fromArrayBuffer(arrayBuffer); // Create a decoder from an ArrayBuffer

// Decode the data using the schema
const data = decoder.decode(schema);

// Do something with the decoded data
console.log(data);
```

:::info
As you might have noticed, in above example we used a static method `fromArrayBuffer` to create a decoder instance from an ArrayBuffer. It's also possible to create a decoder using it's constructor which takes a BufferReader as an argument.
:::

We will cover BufferReader in the next section, but for now, let's see how to create a decoder using it's constructor:

```typescript
import { BinaryDecoder, BufferReader } from '@evenstar/byteform';

// Create a reader from an ArrayBuffer
const reader = new BufferReader(arrayBuffer);

// Create a decoder from the reader
const decoder = new BinaryDecoder(reader);

// Decode the data using the schema
const data = decoder.decode(schema);
```

### BufferReader

[BufferReader](/api/classes/BufferReader.md) is a low-level API that allows you to read data from a buffer manually. It's useful when you need more control over the decoding process.

> Like BinaryEncoder, BinaryDecoder is a wrapper around BufferReader. It provides a more user-friendly API for decoding data.

Let's see how to decode data using BufferReader:

```typescript
import { BufferReader } from '@evenstar/byteform';

// Create a reader from an ArrayBuffer
const reader = new BufferReader(arrayBuffer);

// Read data from the buffer
const data = schema.read(reader);

// Do something with the decoded data
console.log(data);
```
