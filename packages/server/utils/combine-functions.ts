type FunctionType<T, U> = (input: T) => U;

export const combineFunctions = <T, U>(...funcs: FunctionType<T, U>[]): FunctionType<T, U[]> => {
    return (input: T): U[] => {
        let results: U[] = [];
        for (const func of funcs)
            results.push(func(input));
        return results;
    };
}