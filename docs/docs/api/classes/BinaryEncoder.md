# Class: BinaryEncoder

A class that provides methods for encoding binary data.

## Constructors

### new BinaryEncoder()

> **new BinaryEncoder**(`writer`: [`BufferWriter`](BufferWriter.md)): [`BinaryEncoder`](BinaryEncoder.md)

Creates a new binary encoder.

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

`writer`

</td>
<td>

[`BufferWriter`](BufferWriter.md)

</td>
<td>

The buffer writer

</td>
</tr>
</tbody>
</table>

#### Returns

[`BinaryEncoder`](BinaryEncoder.md)

#### Defined in

[binary-encoder.ts:19](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-encoder.ts#L19)

## Methods

### create()

> `static` **create**(`byteLength`: `number`, `options`: [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<[`ResizeOptions`](../interfaces/ResizeOptions.md)\>): [`BinaryEncoder`](BinaryEncoder.md)

Creates a new binary encoder from a buffer writer.

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

[BufferWriter](BufferWriter.md) options

</td>
</tr>
</tbody>
</table>

#### Returns

[`BinaryEncoder`](BinaryEncoder.md)

The new binary encoder instance

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the initial buffer size is invalid or the maxByteLength is less than the initial buffer size

#### Defined in

[binary-encoder.ts:30](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-encoder.ts#L30)

***

### reset()

> **reset**(): `void`

Resets the buffer writer.

#### Returns

`void`

#### Defined in

[binary-encoder.ts:37](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-encoder.ts#L37)

***

### encode()

> **encode**\<`T`\>(`schema`: `T`, `value`: [`InferBaseType`](../type-aliases/InferBaseType.md)\<`T`\>): `void`

Encodes a value to the buffer.

#### Type Parameters

<table>
<thead>
<tr>
<th align="left">Type Parameter</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T` *extends* [`BaseType`](../interfaces/BaseType.md)\<`unknown`\>

</td>
</tr>
</tbody>
</table>

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

`schema`

</td>
<td>

`T`

</td>
<td>

The schema of the value to encode

</td>
</tr>
<tr>
<td>

`value`

</td>
<td>

[`InferBaseType`](../type-aliases/InferBaseType.md)\<`T`\>

</td>
<td>

The value to encode

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the value is invalid or the value size is larger than the buffer maximum size

#### Defined in

[binary-encoder.ts:47](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-encoder.ts#L47)

***

### commit()

> **commit**(): [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

Commits the buffer as an ArrayBuffer.

#### Returns

[`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

The ArrayBuffer containing the encoded data

#### Defined in

[binary-encoder.ts:55](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-encoder.ts#L55)

***

### commitUint8Array()

> **commitUint8Array**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Commits the buffer as an Uint8Array.

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The Uint8Array containing the encoded data

#### Defined in

[binary-encoder.ts:63](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-encoder.ts#L63)

***

### toUint8Array()

> **toUint8Array**(): [`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Converts the buffer to an Uint8Array.

#### Returns

[`Uint8Array`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

The Uint8Array containing the encoded data

#### Defined in

[binary-encoder.ts:71](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-encoder.ts#L71)

## Properties

| Property | Modifier | Type | Description | Defined in |
| :------ | :------ | :------ | :------ | :------ |
| `writer` | `readonly` | [`BufferWriter`](BufferWriter.md) | The buffer writer. | [binary-encoder.ts:13](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-encoder.ts#L13) |
