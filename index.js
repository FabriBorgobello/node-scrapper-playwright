import { chromium } from 'playwright';
import notifier from 'node-notifier';
import cron from 'node-cron';

cron.schedule('* * * * *', async () => {
    console.log(
        `Running on: ${new Date().toLocaleString('es-AR', {
            timeZone: 'Europe/Madrid',
        })}`
    );

    // Launch browser and go to the page
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(
        'https://www.zonakids.com/productos/pack-x-25-sobres-de-figuritas-fifa-world-cup-qatar-2022/'
    );

    // Find an specific element
    const content = await page.inputValue('#product_form input[type="submit"]');

    // Make assertions
    if (content === 'Sin stock') {
        console.log('SIN STOCK');
    } else {
        notifier.notify({
            title: 'HAY FIGURITAS!!',
            message: `Se detectó stock en el pack x25 sobres de Panini`,
        });
    }

    // Close browser
    await browser.close();
});
