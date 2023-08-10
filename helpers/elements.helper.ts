import { Locator } from '@playwright/test';

export async function fillIfValueNotEmpty(input: Locator, value: string | undefined) {
    if (value) {
        await input.clear();
        await input.fill(value);
    }
}
