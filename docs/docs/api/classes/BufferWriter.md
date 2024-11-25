# Class: BufferWriter

A class that provides methods for writing binary data to a buffer.

## Extends

- [`BufferView`](BufferView.md)

## Accessors

### buffer

#### Get Signature

> **get** **buffer**(): [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

Returns the underlying buffer

##### Returns

[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

#### Inherited from

[`BufferView`](BufferView.md).[`buffer`](BufferView.md#buffer)

#### Defined in

[buffer-view.ts:75](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L75)

***

### view

#### Get Signature

> **get** **view**(): [`DataView`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)

Returns the underlying DataView instance

##### Returns

[`DataView`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)

#### Inherited from

[`BufferView`](BufferView.md).[`view`](BufferView.md#view)

#### Defined in

[buffer-view.ts:82](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L82)

***

### position

#### Get Signature

> **get** **position**(): `number`

Returns the current offset in the buffer in bytes.

##### Returns

`number`

#### Inherited from

[`BufferView`](BufferView.md).[`position`](BufferView.md#position)

#### Defined in

[buffer-view.ts:89](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L89)

***

### capacity

#### Get Signature

> **get** **capacity**(): `number`

The current capacity of the buffer.

##### Returns

`number`

#### Defined in

[buffer-writer.ts:143](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L143)

***

### remaining

#### Get Signature

> **get** **remaining**(): `number`

The remaining space in the buffer in bytes.

##### Returns

`number`

#### Defined in

[buffer-writer.ts:150](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L150)

## Constructors

### new BufferWriter()

> **new BufferWriter**(`byteLength`: `number`, `options`: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`ResizeOptions`](../interfaces/ResizeOptions.md)\>): [`BufferWriter`](BufferWriter.md)

Creates a new buffer writer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`byteLength`

</td>
<td>

`number`

</td>
<td>

The initial byte length of the buffer

</td>
</tr>
<tr>
<td>

`options`

</td>
<td>

[`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`ResizeOptions`](../interfaces/ResizeOptions.md)\>

</td>
<td>

The options for buffer resizing

</td>
</tr>
</tbody>
</table>

#### Returns

[`BufferWriter`](BufferWriter.md)

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the initial buffer size is invalid or the maxByteLength is less than the initial buffer size

#### Overrides

[`BufferView`](BufferView.md).[`constructor`](BufferView.md#constructors)

#### Defined in

[buffer-writer.ts:104](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L104)

## Methods

### subarray()

> **subarray**(`start`: `number`, `end`: `number`): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Returns a subarray of the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`start`

</td>
<td>

`number`

</td>
<td>

The start offset in bytes

</td>
</tr>
<tr>
<td>

`end`

</td>
<td>

`number`

</td>
<td>

The end offset in bytes

</td>
</tr>
</tbody>
</table>

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The subarray

#### Remarks

The returned Uint8Array shares the same memory as the buffer.

#### Inherited from

[`BufferView`](BufferView.md).[`subarray`](BufferView.md#subarray)

#### Defined in

[buffer-view.ts:46](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L46)

***

### seek()

> **seek**(`position`: `number`): `void`

Seeks to a specific offset in the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`position`

</td>
<td>

`number`

</td>
<td>

The offset to seek to

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

RangeError if the position is out of bounds

#### Inherited from

[`BufferView`](BufferView.md).[`seek`](BufferView.md#seek)

#### Defined in

[buffer-view.ts:55](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L55)

***

### skip()

> **skip**(`offset`: `number`): `void`

Skips a number of bytes in the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`offset`

</td>
<td>

`number`

</td>
<td>

The number of bytes to skip

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

RangeError if the offset is out of bounds

#### Inherited from

[`BufferView`](BufferView.md).[`skip`](BufferView.md#skip)

#### Defined in

[buffer-view.ts:68](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L68)

***

### reserve()

> `protected` **reserve**(`byteLength`: `number`): `void`

Reserves space in the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`byteLength`

</td>
<td>

`number`

</td>
<td>

The number of bytes to reserve

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is not resizable and the reserved space exceeds the buffer capacity

#### Defined in

[buffer-writer.ts:123](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L123)

***

### reset()

> **reset**(): `void`

Resets the buffer offset to zero, allowing to write from the beginning.

#### Returns

`void`

#### Defined in

[buffer-writer.ts:157](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L157)

***

### commit()

> **commit**(): [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

Commits the buffer.

#### Returns

[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

The ArrayBuffer containing the written data

#### Defined in

[buffer-writer.ts:165](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L165)

***

### commitUint8Array()

> **commitUint8Array**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Commits the buffer as a Uint8Array.

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The Uint8Array containing the written data

#### Defined in

[buffer-writer.ts:173](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L173)

***

### toUint8Array()

> **toUint8Array**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Converts the buffer to a Uint8Array.

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The Uint8Array containing the written data

#### Defined in

[buffer-writer.ts:181](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L181)

***

### writeUint8()

> **writeUint8**(`value`: `number`): `void`

Writes an unsigned 8-bit integer to the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
<td>

The value to write

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if buffer is full and not resizable or has reached its maximum capacity

#### Defined in

[buffer-writer.ts:190](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L190)

***

### writeInt8()

> **writeInt8**(`value`: `number`): `void`

Writes a signed 8-bit integer to the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
<td>

The value to write

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if buffer is full and not resizable or has reached its maximum capacity

#### Defined in

[buffer-writer.ts:201](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L201)

***

### writeUint16()

> **writeUint16**(`value`: `number`, `littleEndian`: `boolean`): `void`

Writes an unsigned 16-bit integer to the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
<td>

The value to write

</td>
</tr>
<tr>
<td>

`littleEndian`

</td>
<td>

`boolean`

</td>
<td>

Whether the integer is little-endian

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if buffer is full and not resizable or has reached its maximum capacity

#### Defined in

[buffer-writer.ts:213](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L213)

***

### writeInt16()

> **writeInt16**(`value`: `number`, `littleEndian`: `boolean`): `void`

Writes a signed 16-bit integer to the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
<td>

The value to write

</td>
</tr>
<tr>
<td>

`littleEndian`

</td>
<td>

`boolean`

</td>
<td>

Whether the integer is little-endian

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if buffer is full and not resizable or has reached its maximum capacity

#### Defined in

[buffer-writer.ts:225](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L225)

***

### writeUint32()

> **writeUint32**(`value`: `number`, `littleEndian`: `boolean`): `void`

Writes an unsigned 32-bit integer to the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
<td>

The value to write

</td>
</tr>
<tr>
<td>

`littleEndian`

</td>
<td>

`boolean`

</td>
<td>

Whether the integer is little-endian

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if buffer is full and not resizable or has reached its maximum capacity

#### Defined in

[buffer-writer.ts:237](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L237)

***

### writeInt32()

> **writeInt32**(`value`: `number`, `littleEndian`: `boolean`): `void`

Writes a signed 32-bit integer to the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
<td>

The value to write

</td>
</tr>
<tr>
<td>

`littleEndian`

</td>
<td>

`boolean`

</td>
<td>

Whether the integer is little-endian

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if buffer is full and not resizable or has reached its maximum capacity

#### Defined in

[buffer-writer.ts:249](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L249)

***

### writeInt64()

> **writeInt64**(`value`: `bigint`, `littleEndian`: `boolean`): `void`

Writes an unsigned 64-bit integer to the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`bigint`

</td>
<td>

The value to write

</td>
</tr>
<tr>
<td>

`littleEndian`

</td>
<td>

`boolean`

</td>
<td>

Whether the integer is little-endian

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if buffer is full and not resizable or has reached its maximum capacity

#### Defined in

[buffer-writer.ts:261](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L261)

***

### writeUint64()

> **writeUint64**(`value`: `bigint`, `littleEndian`: `boolean`): `void`

Writes an unsigned 64-bit integer to the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`bigint`

</td>
<td>

The value to write

</td>
</tr>
<tr>
<td>

`littleEndian`

</td>
<td>

`boolean`

</td>
<td>

Whether the integer is little-endian

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if buffer is full and not resizable or has reached its maximum capacity

#### Defined in

[buffer-writer.ts:273](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L273)

***

### writeFloat32()

> **writeFloat32**(`value`: `number`, `littleEndian`: `boolean`): `void`

Writes a 32-bit float to the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
<td>

The value to write

</td>
</tr>
<tr>
<td>

`littleEndian`

</td>
<td>

`boolean`

</td>
<td>

Whether the float is little-endian

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if buffer is full and not resizable or has reached its maximum capacity

#### Defined in

[buffer-writer.ts:285](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L285)

***

### writeFloat64()

> **writeFloat64**(`value`: `number`, `littleEndian`: `boolean`): `void`

Writes a 64-bit float to the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`value`

</td>
<td>

`number`

</td>
<td>

The value to write

</td>
</tr>
<tr>
<td>

`littleEndian`

</td>
<td>

`boolean`

</td>
<td>

Whether the float is little-endian

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if buffer is full and not resizable or has reached its maximum capacity

#### Defined in

[buffer-writer.ts:297](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L297)

***

### writeBytes()

> **writeBytes**(`src`: [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array), `byteLength`?: `number`): `void`

Writes bytes to the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`src`

</td>
<td>

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

</td>
<td>

The source buffer to write from

</td>
</tr>
<tr>
<td>

`byteLength`?

</td>
<td>

`number`

</td>
<td>

The number of bytes to write

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if buffer is full and not resizable or has reached its maximum capacity

#### Defined in

[buffer-writer.ts:309](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L309)

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| :------ | :------ | :------ | :------ | :------ | :------ |
| `_buffer` | `protected` | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | The underlying buffer. | [`BufferView`](BufferView.md).[`_buffer`](BufferView.md#_buffer) | [buffer-view.ts:9](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L9) |
| `_view` | `protected` | [`DataView`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) | The DataView instance to read data from the buffer. | [`BufferView`](BufferView.md).[`_view`](BufferView.md#_view) | [buffer-view.ts:14](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L14) |
| `_u8` | `protected` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | The Uint8Array instance to read data from the buffer. | [`BufferView`](BufferView.md).[`_u8`](BufferView.md#_u8) | [buffer-view.ts:19](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L19) |
| `_offset` | `protected` | `number` | The current offset in the buffer in bytes. | [`BufferView`](BufferView.md).[`_offset`](BufferView.md#_offset) | [buffer-view.ts:24](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L24) |
| `_options` | `protected` | [`ResizeOptions`](../interfaces/ResizeOptions.md) | The options for buffer resizing. | - | [buffer-writer.ts:91](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L91) |
| `_resizeFn` | `protected` | `ResizeFn` | The function for resizing the buffer. | - | [buffer-writer.ts:96](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L96) |
