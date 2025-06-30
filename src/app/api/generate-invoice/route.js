import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req) {
  const { firstName, lastName, address, phone, iin, cartItems, total } = await req.json();

  const today = new Date();
  const formattedDate = today.toLocaleDateString('ru-RU');

  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; font-size: 12px; padding: 40px; }
          .top-notice { font-size: 11px; margin-bottom: 20px; }
          .beneficiary-table, .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          .beneficiary-table td, .beneficiary-table th, 
          .items-table td, .items-table th {
            border: 1px solid black;
            padding: 6px;
          }
          .title {
            font-weight: bold;
            font-size: 18px;
            text-align: center;
            margin: 20px 0;
          }
          .supplier, .buyer {
            margin: 10px 0;
            font-size: 13px;
          }
          .buyer {
            color: red;
            font-weight: bold;
          }
          .summary {
            margin-top: 15px;
            font-size: 14px;
            font-weight: bold;
          }
          .summary .red {
            color: red;
          }
          .executor {
            margin-top: 50px;
            font-size: 13px;
          }
          .executor .line {
            display: inline-block;
            border-top: 1px solid black;
            width: 200px;
            margin-left: 20px;
          }
        </style>
      </head>
      <body>
        <div class="top-notice">
          Внимание! Оплата данного счета означает согласие с условиями поставки товара.
          Уведомление об оплате обязательно, в противном случае не гарантируется наличие товара на складе.
          Товар отпускается по факту прихода денег на р/с Поставщика, самовывозом, при наличии доверенности и документов удостоверяющих личность.
        </div>

        <table class="beneficiary-table">
          <tr>
            <td>Бенефициар: Индивидуальный предприниматель "Leka Beauty"<br>
            В лице директора Накуповой Сауле Галихановны</td>
            <td>ИИК<br>KZ208560000006209476</td>
            <td>Кбе<br>19</td>
          </tr>
          <tr>
            <td>БИН: 910124400172<br>Банк бенефициара:<br>АО "Банк Центр Кредит", г. Алматы</td>
            <td>БИК<br>KCJBKZKX</td>
            <td>Код назначения платежа<br>710</td>
          </tr>
        </table>

        <div class="title">
          Счет на оплату №6/н от ${formattedDate} без НДС
        </div>

        <div class="supplier">
          <strong>Поставщик:</strong><br>
          ИИН/БИН: 910124400172, ИП "Leka Beauty"<br>
          Юр. Адрес: Республика Казахстан, город Алматы, улица Биянху 67<br>
          Тел.: +7 702 272 00 00
        </div>

        <div class="buyer">
          <div>Покупатель: ${firstName} ${lastName}</div>
          ИИН/БИН: ${iin}<br>
          Юр. Адрес: ${address}  Тел.: ${phone}
        </div>

        <div><strong>Договор:</strong> от</div>

        <table class="items-table">
          <thead>
            <tr>
              <th>№</th>
              <th>Код</th>
              <th>Наименование</th>
              <th>Кол-во</th>
              <th>Ед.</th>
              <th>Цена</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            ${cartItems.map((item, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td>${item.base_sku}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>шт.</td>
                <td>${item.price.toLocaleString('ru-RU')}</td>
                <td>${(item.price * item.quantity).toLocaleString('ru-RU')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="summary">
          <div>Всего наименований ${cartItems.length} на сумму ${total.toLocaleString('ru-RU')} тг.</div>
          <div class="red">Всего к оплате: ${total.toLocaleString('ru-RU')} тг.</div>
        </div>

        <div class="executor">
          Исполнитель <span class="line"></span> / Накупова С.Г.
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

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

  await browser.close();

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Disposition': 'attachment; filename=invoice.pdf',
      'Content-Type': 'application/pdf',
    },
  });
}
