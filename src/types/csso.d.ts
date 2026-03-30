declare module "csso" {
  interface MinifyResult {
    css: string;
  }
  export function minify(source: string, options?: Record<string, unknown>): MinifyResult;
}
