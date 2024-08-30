import React from "react";
import NavBar from "../../components/NavBar";
import Hero from "../../components/Hero";
import Footer from "../../components/Footer";
import Gallery from "../../components/Gallery";
import Services from "../../components/Services";

const Client = () => {
  return (
    <main className="relative overflow-hidden">
      <section>
        <NavBar />
      </section>
      <section>
        <Hero />
      </section>
      <section>
        <Gallery />
      </section>
      <section>
        <Services />
      </section>
      <section>
        <Footer />
      </section>
    </main>
  );
};

export default Client;
