import { run, bench, group } from 'mitata'
import { base64Decode, base64Encode } from './index.js'

const short = 'Hello, world'
const long = short.repeat(100_000)

const shortB64 = base64Encode(short)
const longB64 = base64Encode(long)

group('encode', () => {
  bench('Built-in Buffer', () => {
	  Buffer.from(short).toString('base64')
	  Buffer.from(long).toString('base64')
  })

  bench('@khaf/base64-simd', () => {
	  base64Encode(short)
	  base64Encode(long)
  })
})

group('decode', () => {
	bench('Built-in Buffer', () => {
    Buffer.from(shortB64, 'base64')
    Buffer.from(longB64, 'base64')
	})

  bench('@khaf/base64-simd', () => {
    base64Decode(shortB64)
    base64Decode(longB64)
  })
})

await run({
  avg: true,
  json: false,
  colors: true,
  min_max: true,
  collect: false,
  percentiles: false
})