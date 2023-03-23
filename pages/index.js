import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from "next/link";

// runs on the server-side and then returns Home with all props
// it won’t even be included in the JS bundle for the browser
export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    const { results } = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
        .then(response => response.json())
        .then(allpokemon => allpokemon);

    return {
        props: {
            allPostsData,
            pokemons: results
        },
    };
}

export default function Home({ allPostsData, pokemons }) {
  return (
      <Layout home>
        <Head>
          <title>{siteTitle}</title>
        </Head>
        <section className={utilStyles.headingMd}>
          <p>This is my blog site</p>
        </section>
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
              <h2 className={utilStyles.headingLg}>Blog</h2>
              <ul className={utilStyles.list}>
                  {allPostsData.map(({ id, date, title }) => (
                      <li className={utilStyles.listItem} key={id}>
                          <Link href={`/posts/${id}`}>{title}</Link>
                          <br />
                          {id}
                          <br />
                          {date}
                      </li>
                  ))}
              </ul>
          </section>
      </Layout>
  );
}