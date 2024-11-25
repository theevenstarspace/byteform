# Class: BufferView

Base class for reading and writing binary data.

## Extended by

- [`BufferWriter`](BufferWriter.md)
- [`BufferReader`](BufferReader.md)

## Accessors

### buffer

#### Get Signature

> **get** **buffer**(): [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

Returns the underlying buffer

##### Returns

[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

#### Defined in

[buffer-view.ts:75](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L75)

***

### view

#### Get Signature

> **get** **view**(): [`DataView`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)

Returns the underlying DataView instance

##### Returns

[`DataView`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView)

#### Defined in

[buffer-view.ts:82](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L82)

***

### position

#### Get Signature

> **get** **position**(): `number`

Returns the current offset in the buffer in bytes.

##### Returns

`number`

#### Defined in

[buffer-view.ts:89](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L89)

## Constructors

### new BufferView()

> **new BufferView**(`buffer`: [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)): [`BufferView`](BufferView.md)

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

[`BufferView`](BufferView.md)

#### Defined in

[buffer-view.ts:30](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L30)

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

#### Defined in

[buffer-view.ts:68](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L68)

## Properties

| Property | Modifier | Type | Description | Defined in |
| :------ | :------ | :------ | :------ | :------ |
| `_buffer` | `protected` | [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) | The underlying buffer. | [buffer-view.ts:9](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L9) |
| `_view` | `protected` | [`DataView`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/DataView) | The DataView instance to read data from the buffer. | [buffer-view.ts:14](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L14) |
| `_u8` | `protected` | [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | The Uint8Array instance to read data from the buffer. | [buffer-view.ts:19](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L19) |
| `_offset` | `protected` | `number` | The current offset in the buffer in bytes. | [buffer-view.ts:24](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-view.ts#L24) |
