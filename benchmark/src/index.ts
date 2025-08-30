import { PlayerEncoding, PlayerDecoding } from './byteform';
// import { BufferSlice, StringDecoding, StringEncoding } from './js';

// Benchmark decoding / encoding
PlayerEncoding();
PlayerDecoding();

/**
 * Benchmark JS algorithms
 * Useful for comparing performance for native JS implementations.
 * Commented out for now, because they take too long to run and are not essential for the benchmark.
 */
// BufferSlice();
// StringEncoding();
// StringDecoding();
