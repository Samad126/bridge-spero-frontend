import Footer from "@/features/layout/components/Footer";
import Header from "@/features/layout/components/Header";
import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="space-y-[60px] my-[60px] lg:space-y-[80px] lg:mb-[80px] lg:mt-[100px]">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default layout;
