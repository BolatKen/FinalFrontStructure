'use client'

import Welcome from '@/components/sections/Welcome/Welcome';
import Description from '@/components/sections/Description/Description';
import Configurator from '@/components/sections/Configurator/Configurator';
import BestOffers from '@/components/sections/BestOffers/BestOffers';
import Header from '@/components/layout/Header/Header';
import { Product } from "@/types/product";
import { useRef } from 'react';

export default function ProductDetail({ product }: { product: Product }) {
    const configuratorRef = useRef<HTMLDivElement | null>(null);

    const scrollToConfigurator = () => {
        configuratorRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    return (<>
        <Header isBlur={false} />
        <Welcome product={product} scrollToConfigurator={scrollToConfigurator} />
        <div ref={configuratorRef}>
            <Configurator product={product} />
        </div>
        <Description product={product} />
        <BestOffers products={product.best_offers} />
    </>);
}