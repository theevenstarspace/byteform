# Interface: BaseType\<T\>

Base type for all data types.

## Type Parameters

<table>
<thead>
<tr>
<th align="left">Type Parameter</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>

`T`

</td>
<td>

The type of the data to encode and decode.

</td>
</tr>
</tbody>
</table>

## Methods

### write()

> **write**(`value`: `T`, `writer`: [`BufferWriter`](../classes/BufferWriter.md)): `void`

Writes the value to the buffer.

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

`T`

</td>
<td>

The value to write.

</td>
</tr>
<tr>
<td>

`writer`

</td>
<td>

[`BufferWriter`](../classes/BufferWriter.md)

</td>
<td>

The buffer writer.

</td>
</tr>
</tbody>
</table>

#### Returns

`void`

#### Defined in

[types/base.ts:16](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/base.ts#L16)

***

### read()

> **read**(`reader`: [`BufferReader`](../classes/BufferReader.md)): `T`

Reads the value from the buffer.

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

[`BufferReader`](../classes/BufferReader.md)

</td>
<td>

The buffer reader.

</td>
</tr>
</tbody>
</table>

#### Returns

`T`

The value read from the buffer.

#### Defined in

[types/base.ts:23](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/base.ts#L23)
