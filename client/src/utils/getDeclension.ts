export const getDeclension = (count: number, text_forms: string[]): string => {
    const n = Math.abs(count) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) {
        return `${count} ${text_forms[2]}`;
    }
    if (n1 > 1 && n1 < 5) {
        return `${count} ${text_forms[1]}`;
    }
    if (n1 == 1) {
        return `${count} ${text_forms[0]}`;
    }
    return `${count} ${text_forms[2]}`;
};
