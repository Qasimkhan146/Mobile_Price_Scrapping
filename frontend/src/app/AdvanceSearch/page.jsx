"use client";
import React, { Suspense } from "react";
import Head from "next/head";
import Layout from "./Layout";
import AdvanceSearchComponent from "../component/AdvanceSearchComponent/AdvanceSearchComponent";
const AdvanceSearch = () => {
  return (
    <Layout>
      <Head>
        <title>Advance Search</title>
        <link rel="canonical" href="https://www.mobileprice.biz.pk/" />
        <meta name="description" content="Find the perfect mobile for your needs with our Advance Search feature. Compare mobile rates, explore mobile specs, and get the Latest prices on All Vendors." />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <AdvanceSearchComponent />
      </Suspense>
    </Layout>
  );

};

export default AdvanceSearch;

