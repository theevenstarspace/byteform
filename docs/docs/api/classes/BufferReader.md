# Class: BufferReader

A class that provides methods to read data from a buffer.

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

## Constructors

### new BufferReader()

> **new BufferReader**(`buffer`: [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)): [`BufferReader`](BufferReader.md)

Creates a new buffer view.

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

`buffer`

</td>
<td>

[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

</td>
<td>

The buffer to read/write data from/to

</td>
</tr>
</tbody>
</table>

#### Returns

[`BufferReader`](BufferReader.md)

#### Inherited from

[`BufferView`](BufferView.md).[`constructor`](BufferView.md#constructors)

#### Defined in

[buffer-view.ts:30](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L30)

## Methods

### readUint8()

> **readUint8**(): `number`

Reads an unsigned 8-bit integer from the buffer.

#### Returns

`number`

Read value

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Defined in

[buffer-reader.ts:13](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L13)

***

### readInt8()

> **readInt8**(): `number`

Reads a signed 8-bit integer from the buffer.

#### Returns

`number`

Read value

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Defined in

[buffer-reader.ts:22](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L22)

***

### readUint16()

> **readUint16**(`littleEndian`: `boolean`): `number`

Reads an unsigned 16-bit integer from the buffer.

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

`number`

Read value

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Defined in

[buffer-reader.ts:32](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L32)

***

### readInt16()

> **readInt16**(`littleEndian`: `boolean`): `number`

Reads a signed 16-bit integer from the buffer.

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

`number`

Read value

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Defined in

[buffer-reader.ts:44](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L44)

***

### readUint32()

> **readUint32**(`littleEndian`: `boolean`): `number`

Reads an unsigned 32-bit integer from the buffer.

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

`number`

Read value

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Defined in

[buffer-reader.ts:56](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L56)

***

### readInt32()

> **readInt32**(`littleEndian`: `boolean`): `number`

Reads a signed 32-bit integer from the buffer.

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

`number`

Read value

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Defined in

[buffer-reader.ts:68](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L68)

***

### readInt64()

> **readInt64**(`littleEndian`: `boolean`): `bigint`

Reads an unsigned 64-bit integer from the buffer.

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

`bigint`

Read value

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Defined in

[buffer-reader.ts:80](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L80)

***

### readUint64()

> **readUint64**(`littleEndian`: `boolean`): `bigint`

Reads a signed 64-bit integer from the buffer.

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

`bigint`

Read value

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Defined in

[buffer-reader.ts:92](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L92)

***

### readFloat32()

> **readFloat32**(`littleEndian`: `boolean`): `number`

Reads a 32-bit floating point number from the buffer.

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

`littleEndian`

</td>
<td>

`boolean`

</td>
<td>

Whether the number is little-endian

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

Read value

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Defined in

[buffer-reader.ts:104](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L104)

***

### readFloat64()

> **readFloat64**(`littleEndian`: `boolean`): `number`

Reads a 64-bit floating point number from the buffer.

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

`littleEndian`

</td>
<td>

`boolean`

</td>
<td>

Whether the number is little-endian

</td>
</tr>
</tbody>
</table>

#### Returns

`number`

Read value

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Defined in

[buffer-reader.ts:116](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L116)

***

### readBytes()

> **readBytes**(`byteLength`: `number`): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Reads a set of bytes from the buffer.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
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
</tr>
</tbody>
</table>

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

An Uint8Array containing the read bytes

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Defined in

[buffer-reader.ts:127](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L127)

***

### readBytesUnsafe()

> **readBytesUnsafe**(`byteLength`: `number`): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Reads a set of bytes from the buffer without copying.

#### Parameters

<table>
<thead>
<tr>
<th align="left">Parameter</th>
<th align="left">Type</th>
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
</tr>
</tbody>
</table>

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

An Uint8Array containing the read bytes

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the buffer is out of bounds

#### Remarks

The returned Uint8Array shares the same memory as the buffer.
Use with caution, as modifying the Uint8Array will also modify the buffer.

#### Defined in

[buffer-reader.ts:144](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-reader.ts#L144)

***

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

## Properties

| Property | Modifier | Type | Description | Inherited from | Defined in |
| :------ | :------ | :------ | :------ | :------ | :------ |
| `_buffer` | `protected` | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | The underlying buffer. | [`BufferView`](BufferView.md).[`_buffer`](BufferView.md#_buffer) | [buffer-view.ts:9](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L9) |
| `_view` | `protected` | [`DataView`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) | The DataView instance to read data from the buffer. | [`BufferView`](BufferView.md).[`_view`](BufferView.md#_view) | [buffer-view.ts:14](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L14) |
| `_u8` | `protected` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | The Uint8Array instance to read data from the buffer. | [`BufferView`](BufferView.md).[`_u8`](BufferView.md#_u8) | [buffer-view.ts:19](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L19) |
| `_offset` | `protected` | `number` | The current offset in the buffer in bytes. | [`BufferView`](BufferView.md).[`_offset`](BufferView.md#_offset) | [buffer-view.ts:24](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L24) |
