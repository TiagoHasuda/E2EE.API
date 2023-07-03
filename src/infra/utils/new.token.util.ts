export function NewToken() {
    const rand = (Math.random() * 999999).toFixed(0).padStart(6, '0');
    return rand;
}
