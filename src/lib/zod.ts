export type SafeParseSuccess<T> = { success: true; data: T };
export type SafeParseError = { success: false; error: Error };
export type SafeParseReturnType<T> = SafeParseSuccess<T> | SafeParseError;

interface ZodType<T> {
  parse: (value: unknown) => T;
  safeParse: (value: unknown) => SafeParseReturnType<T>;
}

class ZodString implements ZodType<string> {
  private checks: ((value: string) => string | void)[] = [];

  min(length: number, message?: string) {
    this.checks.push((value) => (value.length >= length ? undefined : message ?? `Must be at least ${length} characters`));
    return this;
  }

  url(message?: string) {
    this.checks.push((value) => {
      try {
        new URL(value);
        return undefined;
      } catch {
        return message ?? 'Invalid url';
      }
    });
    return this;
  }

  parse(value: unknown): string {
    const asString = typeof value === 'string' ? value : '';
    for (const check of this.checks) {
      const result = check(asString);
      if (result) {
        throw new Error(result);
      }
    }
    return asString;
  }

  safeParse(value: unknown): SafeParseReturnType<string> {
    try {
      return { success: true, data: this.parse(value) };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }
}

class ZodObject<TShape extends Record<string, ZodType<any>>> implements ZodType<{ [K in keyof TShape]: ReturnType<TShape[K]['parse']> }> {
  constructor(private shape: TShape) {}

  parse(value: unknown): { [K in keyof TShape]: ReturnType<TShape[K]['parse']> } {
    if (typeof value !== 'object' || value === null) {
      throw new Error('Expected object');
    }

    const result: Partial<{ [K in keyof TShape]: ReturnType<TShape[K]['parse']> }> = {};

    for (const key of Object.keys(this.shape) as (keyof TShape)[]) {
      const schema = this.shape[key];
      const parsed = schema.parse((value as Record<string, unknown>)[key as string]);
      result[key] = parsed as any;
    }

    return result as { [K in keyof TShape]: ReturnType<TShape[K]['parse']> };
  }

  safeParse(value: unknown): SafeParseReturnType<{ [K in keyof TShape]: ReturnType<TShape[K]['parse']> }> {
    try {
      return { success: true, data: this.parse(value) };
    } catch (error) {
      return { success: false, error: error as Error };
    }
  }
}

export const z = {
  string: () => new ZodString(),
  object: <TShape extends Record<string, ZodType<any>>>(shape: TShape) => new ZodObject(shape),
};

export type infer<T> = T extends ZodType<infer U> ? U : never;
