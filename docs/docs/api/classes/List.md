# Class: List\<T\>

A type that represents a list of items of a specific type. Similar to an array in JavaScript.

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

The type of the items in the list.

</td>
</tr>
</tbody>
</table>

## Implements

- [`BaseType`](../interfaces/BaseType.md)\<`T`[]\>

## Accessors

### of

#### Get Signature

> **get** **of**(): [`BaseType`](../interfaces/BaseType.md)\<`T`\>

Gets the base type of the items in the list.

##### Returns

[`BaseType`](../interfaces/BaseType.md)\<`T`\>

#### Defined in

[types/list.ts:28](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/list.ts#L28)

## Constructors

### new List()

> **new List**\<`T`\>(`of`: [`BaseType`](../interfaces/BaseType.md)\<`T`\>): [`List`](List.md)\<`T`\>

Creates a new list type.

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

`of`

</td>
<td>

[`BaseType`](../interfaces/BaseType.md)\<`T`\>

</td>
<td>

The type of the items in the list.

</td>
</tr>
</tbody>
</table>

#### Returns

[`List`](List.md)\<`T`\>

#### Defined in

[types/list.ts:21](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/list.ts#L21)

## Methods

### write()

> **write**(`value`: `T`[], `writer`: [`BufferWriter`](BufferWriter.md)): `void`

Writes the list to the buffer.

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

`T`[]

</td>
<td>

An array of items to write.

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

[types/list.ts:37](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/list.ts#L37)

***

### read()

> **read**(`reader`: [`BufferReader`](BufferReader.md)): `T`[]

Reads the list from the buffer.

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

`T`[]

An array of items read from the buffer.

#### Implementation of

[`BaseType`](../interfaces/BaseType.md).[`read`](../interfaces/BaseType.md#read)

#### Defined in

[types/list.ts:50](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/list.ts#L50)
