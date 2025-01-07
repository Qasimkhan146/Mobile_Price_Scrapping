"use client";
import React, { Suspense } from "react";
import Layout from "./Layout";
import AdvanceSearchComponent from "../component/AdvanceSearchComponent/AdvanceSearchComponent";
const AdvanceSearch = () => {
  return (
    <Layout>
    <Suspense fallback={<div>Loading...</div>}>
      <AdvanceSearchComponent />
    </Suspense>
    </Layout>
  );

};

export default AdvanceSearch;
