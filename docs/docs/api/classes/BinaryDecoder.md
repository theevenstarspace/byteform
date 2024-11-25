# Class: BinaryDecoder

A class that provides methods for decoding binary data.

## Constructors

### new BinaryDecoder()

> **new BinaryDecoder**(`writer`: [`BufferReader`](BufferReader.md)): [`BinaryDecoder`](BinaryDecoder.md)

Creates a new binary decoder.

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

[`BufferReader`](BufferReader.md)

</td>
<td>

The buffer reader

</td>
</tr>
</tbody>
</table>

#### Returns

[`BinaryDecoder`](BinaryDecoder.md)

#### Defined in

[binary-decoder.ts:18](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-decoder.ts#L18)

## Methods

### fromArrayBuffer()

> `static` **fromArrayBuffer**(`buffer`: [`ArrayBuffer`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)): [`BinaryDecoder`](BinaryDecoder.md)

Creates a new binary decoder from an ArrayBuffer.

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

The ArrayBuffer to decode

</td>
</tr>
</tbody>
</table>

#### Returns

[`BinaryDecoder`](BinaryDecoder.md)

The new binary decoder instance

#### Defined in

[binary-decoder.ts:27](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-decoder.ts#L27)

***

### decode()

> **decode**\<`T`\>(`schema`: `T`): [`InferBaseType`](../type-aliases/InferBaseType.md)\<`T`\>

Decodes a value from the buffer.

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

The schema of the value to decode

</td>
</tr>
</tbody>
</table>

#### Returns

[`InferBaseType`](../type-aliases/InferBaseType.md)\<`T`\>

The decoded value

#### Throws

[RangeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RangeError) if the byte size of the readable schema is larger than the buffer size

#### Defined in

[binary-decoder.ts:37](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-decoder.ts#L37)

## Properties

| Property | Modifier | Type | Description | Defined in |
| :------ | :------ | :------ | :------ | :------ |
| `reader` | `readonly` | [`BufferReader`](BufferReader.md) | The buffer reader. | [binary-decoder.ts:12](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/binary-decoder.ts#L12) |
