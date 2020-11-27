const NoResolutionErrorTag = Symbol.for("NoResolutionError");
export class NoResolutionError extends Error {
  protected readonly _tag = NoResolutionErrorTag;

  static [Symbol.hasInstance](instance: any) {
    return instance && instance._tag === NoResolutionErrorTag;
  }

  constructor(readonly identifier: string) {
    super(`Can not resolve ${identifier}`);
  }
}
