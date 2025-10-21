-- DropForeignKey
ALTER TABLE "public"."product_categories" DROP CONSTRAINT "product_categories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."product_categories" DROP CONSTRAINT "product_categories_productId_fkey";

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
