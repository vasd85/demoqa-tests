import { test } from '../../../fixture/test.fixture';
import { getSHA256 } from '../../../helpers/file.helper';
import { expect } from '@playwright/test';

const EXPECTED_IMG_HASH_STRING = '{ hash string of the expected image }';

test.describe('Broken Links - Images page tests', async () => {
    test('Verify broken image [ EXPECTED TO FAIL ]', async ({ page, brokenLinksImagesPage }) => {
        await brokenLinksImagesPage.open();
        const imgUrl = await brokenLinksImagesPage.getImgUrlByTitle('Broken image');

        const response = await page.request.get(imgUrl);
        expect(response.ok(), 'Response status should be ok').toBeTruthy();
        expect(response.headers()['content-type']).toEqual('image/jpeg');

        const bodyBytes = await response.body();
        const hashHex = await getSHA256(bodyBytes);
        expect(hashHex, 'Hash string must match').toEqual(EXPECTED_IMG_HASH_STRING);
    });
});
