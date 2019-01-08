export type QueryOption <T> = {
    type: (value: string) => any,
    default: T,
    in?: (value: string) => T,
    out?: (value: T) => string,
}

export type QueryOptions = {
    [key: string]: QueryOption<any>,
}

export type QueryParam = any;

export type QueryParams = {
    [key: string]: QueryParam,
}

export type Dictionary<T> = { [key: string]: T };
