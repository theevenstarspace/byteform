# Tips & Tricks

## Type Inference

While we learned how to create a typed schema, we can also infer the type from the schema definition. This is useful when you want to avoid repeating the type definition.

```typescript
import { InferBaseType, Struct, u8, u16, u32, f32, f64 } from '@evenstar/byteform';

const vec3 = new Struct({
  x: f32,
  y: f32,
  z: f32
});

const bullet = new Struct({
  position: vec3,
  velocity: vec3,
  damage: u8
});

// Infer the type from the schema
type BulletType = InferBaseType<typeof bullet>;

/**
 * BulletType is equivalent to:
 * {
 *  position: { x: number, y: number, z: number };
 *  velocity: { x: number, y: number, z: number };
 *  damage: number;
 * }
 */
```

## Performance optimizations

### Reusing the encoder

When you encode multiple objects, you can reuse the encoder instance to avoid creating a new buffer each time.

```typescript
import { BinaryEncoder } from '@evenstar/byteform';

const encoder = new BinaryEncoder(1024); // 1KB buffer

// Encode data1
encoder.encode(schema1, data1);
const arrayBuffer1 = encoder.commit(); // Encoded data for data1 (copy of the buffer)

// Reset the encoder
encoder.reset();

// Encode data2
encoder.encode(schema2, data2);
const arrayBuffer2 = encoder.commit(); // Encoded data for data2 (copy of the buffer)
```

### Convert instead of commit

Both `BinaryEncoder` and `BufferWriter` share the same set of functions:

- `commit()` - returns the encoded data as an `ArrayBuffer` by making a copy of the buffer.
- `commitUint8Array()` - returns the encoded data as a `Uint8Array` by making a copy of the buffer.
- `toUint8Array()` - returns the encoded data as a `Uint8Array` without making a copy of the buffer.

While `commiting` the buffer is safe, as it creates a copy of the buffer. It's not always necessary. If you don't need to keep the buffer, you can use `toUint8Array` to avoid the copy.

```typescript
import { BinaryEncoder } from '@evenstar/byteform';

async function encodeLargeData(data: any) {
  const encoder = new BinaryEncoder(2 ** 28); // 256MB buffer

  // Encode the data
  encoder.encode(schema, data);

  // Just cast encoded data to Uint8Array instead of making a copy from 256MB buffer
  const uint8Array = encoder.toUint8Array();

  // Compress the encoded data
  const compressedData = preformCompression(uint8Array);

  // Write the data to a file
  await writeToFile(compressedData);
};
```



