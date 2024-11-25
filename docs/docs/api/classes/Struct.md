# Class: Struct\<T\>

A type that represents a structure of multiple fields. Similar to an object in JavaScript.

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

The type of the structure where each key is a field name and the value is the type of the field.

</td>
</tr>
</tbody>
</table>

## Implements

- [`BaseType`](../interfaces/BaseType.md)\<`T`\>

## Constructors

### new Struct()

> **new Struct**\<`T`\>(`entries`: `StructTypes`\<`T`\>): [`Struct`](Struct.md)\<`T`\>

Creates a new structure type.

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

`entries`

</td>
<td>

`StructTypes`\<`T`\>

</td>
<td>

The entries of the structure where each key is a field name and the value is the type of the field.

</td>
</tr>
</tbody>
</table>

#### Returns

[`Struct`](Struct.md)\<`T`\>

#### Defined in

[types/struct.ts:25](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/struct.ts#L25)

## Methods

### write()

> **write**(`value`: `T`, `writer`: [`BufferWriter`](BufferWriter.md)): `void`

Writes the structure to the buffer.

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

The structure to write.

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

[types/struct.ts:34](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/struct.ts#L34)

***

### read()

> **read**(`reader`: [`BufferReader`](BufferReader.md)): `T`

Reads the structure from the buffer.

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

`T`

The structure read from the buffer.

#### Implementation of

[`BaseType`](../interfaces/BaseType.md).[`read`](../interfaces/BaseType.md#read)

#### Defined in

[types/struct.ts:45](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/struct.ts#L45)
