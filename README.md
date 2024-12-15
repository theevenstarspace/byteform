# Byteform

![GitHub branch check runs][checks]
[![Build Size][build-size]][build-size-url]
[![NPM Package][npm]][npm-url]

**Byteform** is a lightweight and versatile TypeScript library designed for encoding and decoding binary data. It provides an intuitive API to work with binary structures, making it an excellent choice for developers dealing with low-level data operations in both browser and Node.js environments.

## Table of contents
1. [Why?](#why-byteform)
2. [Features](#features)
3. [Installation](#installation)
4. [Quick Start](#quick-start)
    1. [Create a Binary Structure](#create-a-binary-structure)
    2. [Encode data](#encode-data)
    3. [Decode data](#decode-data)
5. [Contributing](#contributing)

## Why Byteform?

Byteform simplifies binary data handling by providing an intuitive API without sacrificing performance. Whether you're building network protocols, file parsers, or any other application requiring precise binary data manipulation, Byteform has you covered.

## Features

- Encode and decode binary data with ease.
- Works seamlessly in both browser and Node.js environments.
- Built with performance and simplicity in mind.
- Typescript first.
- No dependencies.

## Installation

Install Byteform via npm:
```bash
npm install @evenstar/byteform
```

Or via yarn:
```bash
yarn add @evenstar/byteform
```

## Quick Start

### Create a Binary Structure

```typescript
import { Struct, List, Text, u8, f32 } from '@evenstar/byteform';

const vec3 = new Struct({
  x: f32,
  y: f32,
  z: f32
});

const bullet = new Struct({
  position: vec3,
  velocity: vec3,
  damage: u8
});

const Player = new Struct({
  name: new Text(32),
  level: u8,
  position: vec3,
  bullets: new List(bullet)
});
```

### Encode data

```typescript
import { ByteStreamWriter } from '@evenstar/byteform';

const encoder = new ByteStreamWriter(1024); // 1KB buffer

// Encode a Player instance
encoder.writeSchema(Player, {
  name: 'Alice',
  level: 10,
  position: { x: 1.0, y: 2.0, z: 3.0 },
  bullets: [
    { 
      position: { x: 10.0, y: 20.0, z: 30.0 },
      velocity: { x: 1.0, y: 0.0, z: 0.0 },
      damage: 10
    },
    { 
      position: { x: 20.0, y: 30.0, z: 40.0 },
      velocity: { x: 0.0, y: 1.0, z: 0.0 },
      damage: 20
    }
  ]
});

/** 
 * Get the encoded binary data
 * Send the buffer over the network, save it to a file, etc.
 */
const { buffer } = encoder.commit();
```

### Decode data

```typescript
import { ByteStreamReader } from '@evenstar/byteform';

const decoder = new ByteStreamReader(buffer);
const player = decoder.readSchema(Player);

console.log(player);
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request to get involved.

[npm]: https://img.shields.io/npm/v/@evenstar/byteform?style=flat-square
[npm-url]: https://www.npmjs.com/package/@evenstar/byteform
[build-size]: https://flat.badgen.net/bundlephobia/minzip/@evenstar/byteform
[build-size-url]: https://bundlephobia.com/result?p=@evenstar/byteform
[checks]: https://img.shields.io/github/check-runs/theevenstarspace/byteform/main?style=flat-square