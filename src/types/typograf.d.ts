declare module "typograf" {
  interface TypografOptions {
    locale: string[];
  }
  class Typograf {
    constructor(options: TypografOptions);
    execute(text: string): string;
    enableRule(rule: string): this;
    disableRule(rule: string): this;
  }
  export default Typograf;
}
