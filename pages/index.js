import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
  const pokemonResp = await fetch(
    "https://raw.githubusercontent.com/jherr/pokemon/main/index.json"
  );
  const pokemon = await pokemonResp.json();
  return {
    props: {
      pokemon,
    },
  };
}

export default function Home({ pokemon }) {
  return (
    <div>
      <Head>
        <title>Pokemon Home Page</title>
      </Head>
      <div className={styles.grid}>
        {pokemon.map((pokemon, index) => (
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            {pokemon.name.english}
          </Link>
        ))}
      </div>
    </div>
  );
}
