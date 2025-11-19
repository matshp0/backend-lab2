import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { DB } from 'src/db/types';

dotenv.config();

async function main() {
  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
  });

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', decimalPlaces: 2 },
    { code: 'EUR', name: 'Euro', symbol: '€', decimalPlaces: 2 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', decimalPlaces: 0 },
    { code: 'GBP', name: 'British Pound', symbol: '£', decimalPlaces: 2 },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', decimalPlaces: 2 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: '$', decimalPlaces: 2 },
    { code: 'AUD', name: 'Australian Dollar', symbol: '$', decimalPlaces: 2 },
    { code: 'NZD', name: 'New Zealand Dollar', symbol: '$', decimalPlaces: 2 },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', decimalPlaces: 2 },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', decimalPlaces: 2 },
    { code: 'SGD', name: 'Singapore Dollar', symbol: '$', decimalPlaces: 2 },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: '$', decimalPlaces: 2 },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', decimalPlaces: 2 },
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', decimalPlaces: 2 },
    { code: 'ZAR', name: 'South African Rand', symbol: 'R', decimalPlaces: 2 },
    { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', decimalPlaces: 2 },
    { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', decimalPlaces: 2 },
    { code: 'DKK', name: 'Danish Krone', symbol: 'kr', decimalPlaces: 2 },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', decimalPlaces: 2 },
    { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', decimalPlaces: 2 },
    { code: 'KRW', name: 'South Korean Won', symbol: '₩', decimalPlaces: 0 },
    { code: 'THB', name: 'Thai Baht', symbol: '฿', decimalPlaces: 2 },
    { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', decimalPlaces: 2 },
    { code: 'PHP', name: 'Philippine Peso', symbol: '₱', decimalPlaces: 2 },
    { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', decimalPlaces: 0 },
    { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', decimalPlaces: 0 },
    { code: 'TRY', name: 'Turkish Lira', symbol: '₺', decimalPlaces: 2 },
    { code: 'RUB', name: 'Russian Ruble', symbol: '₽', decimalPlaces: 2 },
    { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', decimalPlaces: 2 },
    { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', decimalPlaces: 2 },
    { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', decimalPlaces: 0 },
    { code: 'RON', name: 'Romanian Leu', symbol: 'lei', decimalPlaces: 2 },
  ];

  for (const currency of currencies) {
    await db
      .insertInto('currency')
      .values(currency)
      .onConflict((oc) => oc.column('code').doNothing())
      .execute();
  }

  console.log('Currencies seeded successfully!');
  await db.destroy();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
