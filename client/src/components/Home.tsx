import React from "react";
import Cards from "./Cards";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <NavBar />
      <Cards employee={{
        id: undefined,
        first_name: undefined,
        email: undefined,
        gender: undefined,
        department: undefined,
        designation: undefined,
        phone: undefined,
        city: undefined,
        image: undefined
      }} />
      <Footer />
    </div>
  );
}

export default Home;
