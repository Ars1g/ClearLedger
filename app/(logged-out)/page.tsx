import Link from "next/link";
import Image from "next/image";
import img from "@/public/calculator.jpg";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mt-65 text-center">
      {/* <Image
        src={img}
        fill
        alt="calculator, pen and couple of blank sheets"
        className="object-cover object-top z-0"
        quality={100}
        placeholder="blur"
      /> */}
      <div className="space-y-6 text-md">
        <h1>Take control of your finances, for free!</h1>
        <p>
          Track income and expenses, visualize your spending habits, and build a
          better budget.
        </p>
      </div>

      <Button className="mt-7">
        <Link href="/signup">START NOW</Link>
      </Button>
    </main>
  );
}
