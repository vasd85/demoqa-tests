import { Locator } from '@playwright/test';

export async function fillIfValueNotEmpty(input: Locator, value: string | undefined) {
    if (value) {
        await input.clear();
        await input.fill(value);
    }
}

export async function findElement(
    elements: Locator[],
    matchingFunction: (element: Locator) => Promise<boolean>,
): Promise<Locator> {
    let targetElement: Locator | null = null;

    for (const element of elements) {
        if (await matchingFunction(element)) {
            targetElement = element;
            break;
        }
    }

    if (!targetElement) {
        throw new Error('Element not found');
    }
    return targetElement;
}
