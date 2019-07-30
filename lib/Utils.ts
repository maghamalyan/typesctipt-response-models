export function clonePropertyMeta<T>(obj: T): T {
    const clone = <T>{};

    for(let i in obj) {
        clone[i] = <any>{};
        Object.assign(clone[i], obj[i]);
    }
    return clone;
}
