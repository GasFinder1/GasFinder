import styles from "./Home.module.css";

import MapContainer from "../../components/MapContainer/MapContainer";
import NavBar from "../../components/NavBar/NavBar"
import CardLateral from "../../components/CardLateral/CardLateral";
import CardPosto from "../../components/CardPosto/CardPosto";

const Home = () => {
  // document.addEventListener("click", function click(e) {
  //   let div = e.target;

  //   if (div instanceof HTMLElement) {
  //     console.log("Element clicked:", div.tagName);
  //     console.log("Outer HTML:", div.outerHTML);
  //     console.log("Attributes:", Array.from(div.attributes).map(attr => `${attr.name}="${attr.value}"`).join(", "));
  //     console.log("Classes:", Array.from(div.classList).join(", "));

  //     let teste2 = div.outerHTML
  //     console.log(div)
  //   }
  // });

  return (
    <section className={styles.map}>
      <NavBar />
      <CardLateral />
      <MapContainer />
      <CardPosto
      url = "https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
      distancia = "100"
      precoGasolina = "5,19"
      precoEtanol = "4,05"
      precoDiesel = "5,40"
      />
      <div></div>
    </section>
  );
};

export default Home;

// const teste = div.toString()
// div.map((item, index) => {
//   console.log(`item${index} -> ${item}`)
// })
// div.inn
// const teste = []
// let teste1 = JSON.stringify(div)
// let teste = JSON.parse(teste1)

// console.log("teste >>>", teste)
// console.log(div)
// console.log("teste ", teste.length)
// console.log("teste ", teste[0].toString())