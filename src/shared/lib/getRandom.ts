export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * max);
}

export const getRandomArrayItem = <T>(arr: T[]) => {
    const randomIndex = getRandomInt(arr.length)

    return arr[randomIndex];
}
