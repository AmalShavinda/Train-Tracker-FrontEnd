import React from "react";
import NavBar from "../../components/NavBar";
import Hero from "../../components/Hero";

const Client = () => {
  return (
    <main className="relative">
      <section>
        <NavBar />
      </section>
      <section>
        <Hero />
      </section>
    </main>
  );
};

export default Client;
