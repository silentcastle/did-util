# DID Util

Contains DID-related types and utils.

Exposed:

- `DIDDocument` - type for [JSON representation of DID document](https://www.w3.org/TR/did-core/#json),
- `DIDResolution` - type for DIDResolution, as the thing that DID resolver responds with,
- `ParsedDID` - [DID URL](https://www.w3.org/TR/did-core/#did-url-syntax) in parsed form,
- `parse` - transform DID URL string into `ParsedDID`,
- `IResolver` - interface for generic DID Resolver.

## Installation

```
pnpm add @siletncastle/did-util
```

## Usage

```ts
import { parse, ParsedDID } from "@silentcastle/did-util";
const didUrl = "did:key:z6DtMrg4Kv51UMAM8vJcCLcRywJfEB4dpHVxPCR6qm6hSV3N";
const parsed: ParsedDID = parse(didUrl);
```

## Licence

[Apache-2.0](https://opensource.org/licenses/Apache-2.0)
