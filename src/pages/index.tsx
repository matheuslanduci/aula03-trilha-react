import { GetStaticProps } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./Home.module.scss";

interface Product {
  priceId: string;
  amount: string;
}

interface HomeProps {
  product: Product;
}

export default function Home({ product }: HomeProps) {
  return (
    <h1>
      <Head>
        <title>Home - ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access all to the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </h1>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1IXqy1BT1C1RcENd2XKFzrYh");

  const product: Product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(price.unit_amount / 100)
  };

  const timeToRevalidate = 60 * 60 * 24;

  return {
    props: {
      product
    },
    revalidate: timeToRevalidate
  };
};
