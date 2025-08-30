import { PlayerEncoding, PlayerDecoding } from './byteform';
import { BufferSlice, StringDecoding, StringEncoding } from './js';

// Benchmark decoding / encoding
PlayerEncoding();
PlayerDecoding();

// Benchmark JS algorithms
BufferSlice();
StringEncoding();
StringDecoding();
