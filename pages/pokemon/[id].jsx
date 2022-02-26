/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Detail.module.css";

// export async function getServerSideProps({ params }) {
//   const pokemonResp = await fetch(
//     `https://raw.githubusercontent.com/jherr/pokemon/main/pokemon/${params.id}.json`
//   );
//   const pokemon = await pokemonResp.json();
//   return {
//     props: {
//       pokemon,
//     },
//   };
// }

export async function getStaticPaths() {
  const pokemonResp = await fetch(
    "https://raw.githubusercontent.com/jherr/pokemon/main/index.json"
  );
  const pokemon = await pokemonResp.json();

  return {
    paths: pokemon.map(({ id }) => ({ params: { id: id.toString() } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pokemonResp = await fetch(
    `https://raw.githubusercontent.com/jherr/pokemon/main/pokemon/${params.id}.json`
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
      <div>
        <Link href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`https://raw.githubusercontent.com/jherr/pokemon/main/images/${pokemon.name.english.toLowerCase()}.jpg`}
            alt={pokemon.name.english}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name.english}</div>
          <div className={styles.type}>{pokemon.type.join(", ")}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(pokemon.base).map((k) => (
                <tr key={k}>
                  <td className={styles.attribute}>{k}</td>
                  <td>{pokemon.base[k]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
