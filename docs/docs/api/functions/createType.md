# Function: createType()

> **createType**\<`T`\>(`descriptor`: [`BaseType`](../interfaces/BaseType.md)\<`T`\>): [`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`BaseType`](../interfaces/BaseType.md)\<`T`\>\>

Utility function to create a type descriptor.

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

The type of the schema.

</td>
</tr>
</tbody>
</table>

## Parameters

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

`descriptor`

</td>
<td>

[`BaseType`](../interfaces/BaseType.md)\<`T`\>

</td>
<td>

The type descriptor.

</td>
</tr>
</tbody>
</table>

## Returns

[`Readonly`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype)\<[`BaseType`](../interfaces/BaseType.md)\<`T`\>\>

The schema type.

## Defined in

[types/base.ts:42](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/base.ts#L42)
