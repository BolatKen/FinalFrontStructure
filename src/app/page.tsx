"use client";

import BestOffers from "@/components/BestOffers";
import Configurator from "@/components/Configurator";
import Description from "@/components/Description";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <>
      <Welcome />
      <Configurator />
      <Description />
      <BestOffers />
    </>
  );
}
