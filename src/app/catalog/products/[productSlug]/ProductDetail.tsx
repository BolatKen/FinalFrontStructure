'use client'

import Welcome from '@/components/sections/Welcome/Welcome';
import Description from '@/components/sections/Description/Description';
import Configurator from '@/components/sections/Configurator/Configurator';
import BestOffers from '@/components/sections/BestOffers/BestOffers';
import Header from '@/components/layout/Header/Header';
import { Product } from "@/types/product";

export default function ProductDetail({ product }: { product: Product }) {
    return (<>
        <Header isBlur={false} />
        <Welcome product={product} />
        <Configurator product={product} />
        <Description product={product} />
        <BestOffers />
    </>);
}