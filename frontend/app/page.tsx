import Image from 'next/image'
import "antd/dist/antd.css";

import Cards from "../components/Cards";
import Hero from "../components/Hero";
import Wise from "../components/Wise";

export default function Home() {
  return (
    <div className="flex flex-col">
      <main className="flex flex-col">
        <Hero />
        <Wise />
        <Cards/>
      </main>
    </div>
  );
}
