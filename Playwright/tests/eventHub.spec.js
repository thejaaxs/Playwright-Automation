import { test, expect } from '@playwright/test';

test.only('Event Hub Automation', async ({ page }) => {
    const userName = page.getByPlaceholder('you@email.com');
    const password = page.locator('input#password');

    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await userName.fill('thejas@gmail.com');
    await password.fill('Thejas@2004');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page.locator('div h1')).toHaveText('Discover & BookAmazing Events');
    await page.locator('a#nav-events').click();
    await page.locator('article#event-card').first().waitFor();
    await page.getByRole('button', { name: 'Add New Event' }).click();
    await expect(page.locator("h2:has-text('+ New Event')")).toHaveText('+ New Event');
    await page.getByLabel('Title').fill('Birthday Party');
    await page.getByPlaceholder('Describe the event…').fill('Planned Birthday Party Of Corner-Stone Group Owner');
    await page.getByLabel('Category').selectOption('Concert');
    await page.getByLabel('City').fill('Bangalore');
    await page.getByLabel('Venue').fill('Palace Grounds Gayathri Vihar 2');
    await page.locator("input[id*='event-date']").fill('2027-11-30T15:00');
    await page.getByLabel('Price ($)').fill('2000');
    await page.getByLabel('Total Seats').fill('100');
    await page.getByLabel('Image URL (optional)').fill('https://tse3.mm.bing.net/th/id/OIP.yr0DKtuNGYyOgVIqKb3PnQHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3');
    await page.getByRole('button', { name: '+ Add Event' }).click();
    await expect(page.getByText('Event Created')).toBeVisible();
    await page.locator('#nav-home').click();


    const eventToBeBooked = page.locator('.p-4').filter({ hasText: 'Birthday Party' });

    async function seatCount(eventToBeBooked) {
        const seatBefore = await eventToBeBooked.locator('span.text-emerald-600').textContent();
        return Number(seatBefore.match(/\d+/)[0]);
    }
    const initialSeats = await seatCount(eventToBeBooked);
    console.log(`Initial Seat : ${initialSeats}`);
    await eventToBeBooked.locator('a#book-now-btn').click();
    await expect(page.locator('.flex h2')).toHaveText('Book Tickets');
    await page.getByLabel('Full Name').fill('Thejas Shetty');
    await page.getByLabel('Email').fill('thejas@gmail.com');
    await page.getByLabel('Phone Number').fill('+91 70125 79845');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    await expect(page.getByRole('heading', { name: 'Booking Confirmed! 🎉' })).toBeVisible();
    await page.getByRole('button', { name: 'View My Bookings' }).click();
    await expect(page.getByRole('heading', { name: 'My Bookings' })).toBeVisible();
    const confirmedConfirmation = await page.locator('#booking-card .inline-flex').first().textContent();
    console.log(confirmedConfirmation);
    await page.locator('#nav-home').click();
    await page.reload();

    const eventAfterUpdation = page.locator('.p-4').filter({ hasText: 'Birthday Party' });
    const afterBookingSeatCount = await seatCount(eventAfterUpdation);
    console.log(`Seat After Booking : ${afterBookingSeatCount}`);
    expect(initialSeats - afterBookingSeatCount).toBe(1);
});