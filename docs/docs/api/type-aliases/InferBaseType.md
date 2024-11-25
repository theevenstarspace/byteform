# Type Alias: InferBaseType\<T\>

> **InferBaseType**\<`T`\>: `T` *extends* [`BaseType`](../interfaces/BaseType.md)\<infer U\> ? `U` : `never`

Infer the data type from a schema.

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

The schema to infer the data type from.

</td>
</tr>
</tbody>
</table>

## Defined in

[types/base.ts:32](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/types/base.ts#L32)
