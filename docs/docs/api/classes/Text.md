# Class: Text

A type that represents a string of text.

## Implements

- [`BaseType`](../interfaces/BaseType.md)\<`string`\>

## Constructors

### new Text()

> **new Text**(`maxByteLength`: `number`): [`Text`](Text.md)

Creates a new text type.

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

`maxByteLength`

</td>
<td>

`number`

</td>
<td>

The maximum byte length of the encoded string

</td>
</tr>
</tbody>
</table>

#### Returns

[`Text`](Text.md)

#### Defined in

[types/text.ts:34](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/text.ts#L34)

## Methods

### write()

> **write**(`value`: `string`, `writer`: [`BufferWriter`](BufferWriter.md)): `void`

Writes the string to the buffer.

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

`string`

</td>
<td>

The string to write.

</td>
</tr>
<tr>
<td>

`writer`

</td>
<td>

[`BufferWriter`](BufferWriter.md)

</td>
<td>

The buffer writer.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Implementation of

[`BaseType`](../interfaces/BaseType.md).[`write`](../interfaces/BaseType.md#write)

#### Defined in

[types/text.ts:43](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/text.ts#L43)

***

### read()

> **read**(`reader`: [`BufferReader`](BufferReader.md)): `string`

Reads the string from the buffer.

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

`reader`

</td>
<td>

[`BufferReader`](BufferReader.md)

</td>
<td>

The buffer reader.

</td>
</tr>
</tbody>
</table>

#### Returns

`string`

The string read from the buffer.

#### Implementation of

[`BaseType`](../interfaces/BaseType.md).[`read`](../interfaces/BaseType.md#read)

#### Defined in

[types/text.ts:59](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/text.ts#L59)
