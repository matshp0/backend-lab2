-- Create currency table first
CREATE TABLE "currency" (
    "code" CHAR(3) NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "decimalPlaces" SMALLINT NOT NULL DEFAULT 2,
    CONSTRAINT "currency_pkey" PRIMARY KEY ("code")
);

-- Insert default USD currency
INSERT INTO "currency" ("code", "name", "symbol", "decimalPlaces")
VALUES ('USD', 'US Dollar', '$', 2);

-- Alter user table to add defaultCurrencyCode column (nullable)
ALTER TABLE "user" ADD COLUMN "defaultCurrencyCode" CHAR(3);

-- Alter record table to add currencyCode column with default 'USD'
ALTER TABLE "record" ADD COLUMN "currencyCode" CHAR(3) NOT NULL DEFAULT 'USD';

-- Add foreign keys
ALTER TABLE "user"
  ADD CONSTRAINT "user_defaultCurrencyCode_fkey"
  FOREIGN KEY ("defaultCurrencyCode") REFERENCES "currency"("code")
  ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "record"
  ADD CONSTRAINT "record_currencyCode_fkey"
  FOREIGN KEY ("currencyCode") REFERENCES "currency"("code")
  ON DELETE RESTRICT ON UPDATE CASCADE;
