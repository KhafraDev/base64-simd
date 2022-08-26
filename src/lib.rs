#![deny(clippy::all)]

use base64_simd::Base64;
use napi::Error;
use napi::bindgen_prelude::Uint8Array;

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn base64_encode(value: String) -> String {
  let base64 = Base64::STANDARD;
  let bytes = value.as_bytes();

  base64.encode_to_boxed_str(bytes).into_string()
}

#[napi]
pub fn base64_decode(value: String) -> Result<Uint8Array, Error> {
  let base64 = Base64::STANDARD;
  let bytes = value.as_bytes();

  let result = base64.decode_to_boxed_bytes(bytes);

  match result {
    Ok(value) => Ok(Uint8Array::new(value.to_vec())),
    Err(error) => Err(Error::from_reason(error.to_string()))
  }
}