# Creating custom data type

Byteform allows you to create custom data types. This is useful when you need to encode and decode data in a specific format.

There is two ways to create a custom data type:

## Using `createType`

You can create a custom data type using the `createType` function.

This function takes a single argument, which is an object that implements [BaseType](/api/interfaces/BaseType.md) interface.

Here is an example of how to create a custom data type that is able to encode and decode a vector of numbers:

```typescript
import { createType, BaseType } from '@evenstar/byteform';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

const vector3 = createType<Vector3>({
  write(value, writer) {
    writer.writeFloat32(value.x);
    writer.writeFloat32(value.y);
    writer.writeFloat32(value.z);
  },
  read(reader) {
    const x = reader.readFloat32();
    const y = reader.readFloat32();
    const z = reader.readFloat32();

    return { x, y, z };
  },
});

encoder.encode(vector3, { x: 1, y: 2, z: 3 }); // OK
encoder.encode(vector3, { x: 1, y: 2 }); // TypeError: property z is missing

const data = decoder.decode(vector3); // { x: 1, y: 2, z: 3 }
```

## Implementing `BaseType` interface

The second way to create a custom data type is to implement the [BaseType](/api/interfaces/BaseType.md) interface.

Let's create a custom data type that is able to encode and decode a vector of numbers:

```typescript
import { BaseType } from '@evenstar/byteform';

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

class Vector3Type implements BaseType<Vector3> {
  write(value, writer) {
    writer.writeFloat32(value.x);
    writer.writeFloat32(value.y);
    writer.writeFloat32(value.z);
  }

  read(reader) {
    const x = reader.readFloat32();
    const y = reader.readFloat32();
    const z = reader.readFloat32();

    return { x, y, z };
  }
}

const vector3 = new Vector3Type();

encoder.encode(vector3, { x: 1, y: 2, z: 3 }); // OK
encoder.encode(vector3, { x: 1, y: 2 }); // TypeError: property z is missing

const data = decoder.decode(vector3); // { x: 1, y: 2, z: 3 }
```