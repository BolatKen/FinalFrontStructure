"use client";

import BestOffers from "@/components/BestOffers";
import Configurator from "@/components/Configurator";
import Description from "@/components/Description";
import Welcome from "@/components/Welcome";
import Subscribe from "@/components/ui/Subscribe";

export default function Home() {
  return (
    <>
      <Welcome />
      <Configurator />
      <Description />
      <BestOffers />
      <Subscribe />
    </>
  );
}
