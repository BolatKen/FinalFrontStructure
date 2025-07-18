// pages/payment-info/page.tsx
"use client";

import Header from "@/components/layout/Header/Header";
import styles from "./legal.module.css";

export default function PaymentInfoPage() {
  return (
    <>
      <Header />
      <div className={styles.page}>
        <h1 className={styles.title}>Описание процедуры оплаты</h1>
        <p className={styles.subtitle}>
          Безопасность платежей и правила возврата.
        </p>
        <div className={styles.content}>
          <p><strong>1. Оплата банковскими картами осуществляется через: </strong></p>
          <p>1.1. К оплате принимаются карты VISA и MasterCard.</p>
          <p>Услуга оплаты через интернет осуществляется в соответствии с Правилами международных платежных систем Visa и MasterCard на принципах соблюдения конфиденциальности и безопасности совершения платежа, для чего используются самые современные методы проверки, шифрования и передачи данных по закрытым каналам связи. Ввод данных банковской карты осуществляется на защищенной платежной странице FreedomPay. 
На странице для ввода данных банковской карты потребуется ввести номер карты, имя владельца карты, срок действия карты, трёхзначный код безопасности (CVV2 для VISA или CVC2 для MasterCard). Все необходимые данные пропечатаны на самой карте. 
Трёхзначный код безопасности — это три цифры, находящиеся на обратной стороне карты. 
Далее вы будете перенаправлены на страницу Вашего банка для ввода 3DSecure кода, который придет к Вам в СМС. Если 3DSecure код к Вам не пришел, то следует обратится в банк выдавший Вам карту. </p>
          <p>1.2. Случаи отказа в совершении платежа: </p>
          <p>1.2.1. банковская карта не предназначена для совершения платежей через интернет, о чем можно узнать, обратившись в Ваш Банк; </p>
          <p>1.2.2. недостаточно средств для оплаты на банковской карте. Подробнее о наличии средств на банковской карте Вы можете узнать, обратившись в банк, выпустивший банковскую карту; </p>
          <p>1.2.3. данные банковской карты введены неверно; </p>
          <p>1.2.4. истек срок действия банковской карты. Срок действия карты, как правило, указан на лицевой стороне карты (это месяц и год, до которого действительна карта). Подробнее о сроке действия карты Вы можете узнать, обратившись в банк, выпустивший банковскую карту; </p>
          <p>По вопросам оплаты с помощью банковской карты и иным вопросам, связанным с работой сайта, Вы можете обращаться по следующему телефону: 8 (706) 806 2525. 
Предоставляемая вами персональная информация (имя, адрес, телефон, e-mail, номер банковской карты) является конфиденциальной и не подлежит разглашению. Данные вашей кредитной карты передаются только в зашифрованном виде и не сохраняются на нашем Web-сервере. </p>
          <p><strong>2. Правила возврата товара</strong></p>
          <p>При оплате картами возврат наличными денежными средствами не допускается. Порядок возврата регулируется правилами международных платежных систем. 
Процедура возврата товара регламентируется статьей 14 закона «О защите прав потребителей». 
</p>
          <p>2.1. Потребитель вправе отказаться от товара в любое время до его передачи, а после передачи товара -в течение 14 (четырнадцати) дней; </p>
          <p>2.1.1. Возврат товара надлежащего качества возможен в случае, если сохранены его товарный вид, потребительские свойства, а также документ, подтверждающий факт и условия покупки указанного товара; </p>
          <p>2.1.2. Потребитель не вправе отказаться от товара надлежащего качества, имеющего индивидуально-определенные свойства, если указанный товар может быть использован исключительно приобретающим его человеком; </p>
          <p>2.1.3. При отказе потребителя от товара продавец должен возвратить ему денежную сумму, уплаченную потребителем по договору, за исключением расходов продавца на доставку от потребителя возвращенного товара, не позднее чем через десять дней со дня предъявления потребителем соответствующего требования;</p>
          <p>Для возврата денежных средств на банковскую карту необходимо заполнить «Заявление о возврате денежных средств», которое высылается по требованию компанией на электронный адрес и оправить его вместе с приложением копии паспорта по адресу test@test.kz 
Возврат денежных средств будет осуществлен на банковскую карту в течение 21 (двадцати одного) рабочего дня со дня получения «Заявление о возврате денежных средств» Компанией. 
Для возврата денежных средств по операциям проведенными с ошибками необходимо обратиться с письменным заявлением и приложением копии паспорта и чеков/квитанций, подтверждающих ошибочное списание. Данное заявление необходимо направить по адресу test@test.kz 
Сумма возврата будет равняться сумме покупки. Срок рассмотрения Заявления и возврата денежных средств начинает исчисляться с момента получения Компанией Заявления и рассчитывается в рабочих днях без учета праздников/выходных дней. 4. Правила доставки товара. 
Наличие на электронной витрине Интернет-магазина информации по доставке товара (получении работы, услуги), такой как сроки, способы, а также любой другой информации, необходимой для получения ясного представления о доставке товара (получении работы, услуги) после оплаты с использованием карты. </p>
        </div>
      </div>
    </>
  );
}