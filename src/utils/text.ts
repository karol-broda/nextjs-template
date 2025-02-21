type Mode =
  | 'lower'
  | 'upper'
  | 'camel'
  | 'pascal'
  | 'snake'
  | 'kebab'
  | 'title';

type ChangeCaseOptions = {
  mode?: Mode;
  capitalizeEach?: boolean;
};

type TitleCaseOptions = {
  capitalizeEach?: boolean;
};

const TextUtils = {
  toLowerCase(str: string): string {
    return str.toLowerCase();
  },

  toUpperCase(str: string): string {
    return str.toUpperCase();
  },

  capitalizeFirst(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  },

  toTitleCase(
    str: string,
    { capitalizeEach = true }: TitleCaseOptions = {}
  ): string {
    const words = str.toLowerCase().split(/\s+/);
    if (capitalizeEach) {
      return words
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    } else {
      return TextUtils.capitalizeFirst(str);
    }
  },

  toCamelCase(str: string): string {
    const words = str.toLowerCase().split(/[\s-_]+/);
    return words
      .map((word, i) =>
        i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join('');
  },

  toPascalCase(str: string): string {
    return str
      .toLowerCase()
      .split(/[\s-_]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  },

  toSnakeCase(str: string): string {
    return str
      .trim()
      .toLowerCase()
      .replace(/[\s-]+/g, '_');
  },

  toKebabCase(str: string): string {
    return str
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, '-');
  },

  changeCase(
    str: string,
    { mode = 'lower', capitalizeEach = false }: ChangeCaseOptions = {}
  ): string {
    let result: string;
    switch (mode) {
      case 'upper':
        result = TextUtils.toUpperCase(str);
        break;
      case 'camel':
        result = TextUtils.toCamelCase(str);
        break;
      case 'pascal':
        result = TextUtils.toPascalCase(str);
        break;
      case 'snake':
        result = TextUtils.toSnakeCase(str);
        break;
      case 'kebab':
        result = TextUtils.toKebabCase(str);
        break;
      case 'title':
        result = TextUtils.toTitleCase(str, { capitalizeEach });
        break;
      case 'lower':
      default:
        result = TextUtils.toLowerCase(str);
        break;
    }
    return result;
  },
};
