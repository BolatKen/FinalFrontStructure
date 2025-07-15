import styles from "./MainWelcome.module.css";
import Header from "@/components/layout/Header/Header";
import GeneralInfo from "../../shared/GeneralInfo/GeneralInfo.jsx";
import GeneralInfoRightUpper from "../../shared/GeneralInfoRightUpper/GeneralInfoRightUpper.jsx";
import GeneralInfoRightDown from "../../shared/GeneralInfoRightDown/GeneralInfoRightDown.jsx";
import GeneralInfoLeftDown from "../../shared/GeneralInfoLeftDown/GeneralInfoLeftDown.jsx";
import InfoList from "../../shared/InfoList/InfoList";
import ProductCatalog from "@/components/shared/ProductCatalog/ProductCatalog";
import OtherCatalog from "../../shared/OtherCatalog/OtherCatalog";
import MainWelcomeClient from "./MainWelcomeClient";
import { CategoryWelcome } from "@/types/category";

// Расширенный тип для продуктов главной страницы
interface WelcomeProduct {
  id: number;
  name: string;
  slug: string;
  image?: string;
  description?: string;
  is_popular?: boolean;
  is_new?: boolean;
  currency?: string;
  bonus?: number;
  variants?: Array<{
    final_price?: number;
  }>;
}

interface MainWelcomeProps {
  products?: WelcomeProduct[];
  categories?: CategoryWelcome[];
}

export default function MainWelcome({ products = [], categories = [] }: MainWelcomeProps) {
  const rightContent = <GeneralInfoRightUpper />;
  const rightContentDown = <GeneralInfoRightDown />;
  const leftContentDown = <GeneralInfoLeftDown />;

  return (
    <>
      <section className={styles.welcome}>
        <Header isBlur={false} />
        {products.length > 0 && <MainWelcomeClient products={products} />}
      </section>
      <GeneralInfo className="" contentLeft={null} contentRight={rightContent} />
      <InfoList />
      {categories.map((item, key) =>
        item.is_full_format ? (
          <ProductCatalog
            key={`catalog-${item.slug || item.id || key}`}
            title={item.name}
            slug={item.slug || ''}
            tags={
              (item.subcategories || []).map((cat: {
                id: number | string;
                name: string;
                group?: string;
                priority?: number;
                icon?: string;
                is_toggle?: boolean;
                // [key: string]: any;
              }) => ({
                id: typeof cat.id === 'number' ? cat.id : Number(cat.id),
                name: cat.name,
                group: cat.group || '',
                priority: cat.priority || 0,
                icon: cat.icon || '',
                is_toggle: cat.is_toggle ?? false,
              }))
            }
            products={item.products}
          />
        ) : (
          <OtherCatalog key={`other-${item.slug || item.id || key}`} />
        )
      )}
      <GeneralInfo
        className=""
        contentLeft={leftContentDown}
        contentRight={rightContentDown}
        isLight={true}
      />
    </>
  );
}

export { default as MainWelcome } from "./MainWelcome";
