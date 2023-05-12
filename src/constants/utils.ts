export const sleep = (delay: number) => new Promise(resolve => setTimeout(resolve, delay))

export const isEmpty = (value: any): value is undefined | null => value === null || value === undefined
