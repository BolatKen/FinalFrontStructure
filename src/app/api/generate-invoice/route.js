import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req) {
  const { firstName, lastName, address, phone, iin, cartItems, total } = await req.json();

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #000; padding: 8px; text-align: center; }
          .info { margin-bottom: 20px; }
          .info div { margin: 5px 0; }
          .total { margin-top: 20px; font-size: 18px; font-weight: bold; }
        </style>
      </head>
      <body>
        <h1>Счёт на оплату</h1>
        <div class="info">
          <div><strong>Покупатель:</strong> ${firstName} ${lastName}</div>
          <div><strong>ИИН/БИН:</strong> ${iin}</div>
          <div><strong>Юр. адрес:</strong> ${address}</div>
          <div><strong>Телефон:</strong> ${phone}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Наименование</th>
              <th>Количество</th>
              <th>Цена</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            ${cartItems.map((item, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.price.toLocaleString()} ${item.currency}</td>
                <td>${(item.price * item.quantity).toLocaleString()} ${item.currency}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total">
          Всего наименований: ${cartItems.length}<br/>
          Сумма к оплате: ${total.toLocaleString()} ${cartItems[0].currency}
        </div>
      </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Disposition': 'attachment; filename=invoice.pdf',
      'Content-Type': 'application/pdf',
    },
  });
}
