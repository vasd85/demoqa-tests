import crypto from 'crypto';

export async function getSHA256(bytes: Buffer) {
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    const hashArray = Array.from(new Uint8Array(digest));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
