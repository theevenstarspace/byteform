# Interface: ResizeOptions

The options for buffer resizing.

## Properties

| Property | Type | Description | Defined in |
| :------ | :------ | :------ | :------ |
| `maxByteLength?` | `number` | The maximum byte length of the buffer. **Default** `undefined` | [buffer-writer.ts:18](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L18) |
| `strategy` | [`ResizeStrategy`](../type-aliases/ResizeStrategy.md) | The resize strategy. **Default** `'exponential'` | [buffer-writer.ts:24](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L24) |
| `factor` | `number` | The resize factor for exponential resizing. **Default** `2` | [buffer-writer.ts:30](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L30) |
| `increment` | `number` | The resize increment for additive resizing in bytes. **Default** `256` | [buffer-writer.ts:36](https://github.com/theevenstarspace/byteform/blob/22b39db8569d36f01963b07f07e31283430d4fde/src/buffer-writer.ts#L36) |
