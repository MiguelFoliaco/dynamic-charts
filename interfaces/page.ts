export interface Page<P = Record<string, string>, Q = Record<string, string>> {
    params: P;
    searchParams: Q;
  }
  