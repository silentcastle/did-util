import { parse } from "../parse";

it("returns parts", () => {
  expect(parse("did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX")).toEqual({
    method: "uport",
    id: "2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX",
    did: "did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX",
    didUrl: "did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX",
  });
  expect(
    parse("did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path")
  ).toEqual({
    method: "uport",
    id: "2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX",
    did: "did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX",
    didUrl: "did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path",
    path: "/some/path",
  });
  expect(
    parse("did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#fragment=123")
  ).toEqual({
    method: "uport",
    id: "2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX",
    did: "did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX",
    didUrl: "did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX#fragment=123",
    fragment: "fragment=123",
  });
  expect(
    parse(
      "did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123"
    )
  ).toEqual({
    method: "uport",
    id: "2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX",
    did: "did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX",
    didUrl:
      "did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX/some/path#fragment=123",
    path: "/some/path",
    fragment: "fragment=123",
  });
  expect(parse("did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI")).toEqual(
    {
      method: "nacl",
      id: "Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI",
      did: "did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI",
      didUrl: "did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI",
    }
  );
  expect(
    parse("did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high")
  ).toEqual({
    method: "example",
    id: "21tDAKCERh95uGgKbJNHYp",
    did: "did:example:21tDAKCERh95uGgKbJNHYp",
    didUrl: "did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high",
    params: {
      service: "agent",
      "foo:bar": "high",
    },
  });
  expect(
    parse(
      "did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high?foo=bar"
    )
  ).toEqual({
    method: "example",
    id: "21tDAKCERh95uGgKbJNHYp",
    didUrl:
      "did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high?foo=bar",
    did: "did:example:21tDAKCERh95uGgKbJNHYp",
    query: "foo=bar",
    params: {
      service: "agent",
      "foo:bar": "high",
    },
  });
  expect(
    parse(
      "did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high/some/path?foo=bar#key1"
    )
  ).toEqual({
    method: "example",
    id: "21tDAKCERh95uGgKbJNHYp",
    didUrl:
      "did:example:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high/some/path?foo=bar#key1",
    did: "did:example:21tDAKCERh95uGgKbJNHYp",
    query: "foo=bar",
    path: "/some/path",
    fragment: "key1",
    params: {
      service: "agent",
      "foo:bar": "high",
    },
  });

  expect(
    parse(
      "did:example:test:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high/some/path?foo=bar#key1"
    )
  ).toEqual({
    method: "example",
    id: "test:21tDAKCERh95uGgKbJNHYp",
    didUrl:
      "did:example:test:21tDAKCERh95uGgKbJNHYp;service=agent;foo:bar=high/some/path?foo=bar#key1",
    did: "did:example:test:21tDAKCERh95uGgKbJNHYp",
    query: "foo=bar",
    path: "/some/path",
    fragment: "key1",
    params: {
      service: "agent",
      "foo:bar": "high",
    },
  });
});

it("fails if non compliant", () => {
  expect(() => parse("")).toThrowError(`Missing DID`);
  expect(() => parse("did:")).toThrowError(`Invalid DID did:`);
  expect(() => parse("did:uport")).toThrowError(`Invalid DID did:uport`);
  expect(() => parse("did:uport:")).toThrowError(`Invalid DID did:uport:`);
  expect(() => parse("did:uport:1234_12313***")).toThrowError(
    `Invalid DID did:uport:1234_12313***`
  );
  expect(() => parse("2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX")).toThrowError(
    `Invalid DID 2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX`
  );
});
