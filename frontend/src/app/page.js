'use client';

import Image from "next/image";
import { DashboardComponent } from "@/components/dashboard";



export default function Home() {
  return (
    <>
      <DashboardComponent />
      <Image src="/D.jpg" alt="Vercel Logo" width="1920" height="1080" />
    </>
  );
}
