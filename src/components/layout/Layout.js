import React from "react";
import Footer from "./Footer";
import MainNavigation from "./MainNavigation";

export default function Layout({ children }) {
  return (
    <>
      <MainNavigation />
      <main className="py-5">{children}</main>
      <Footer />
    </>
  );
}
