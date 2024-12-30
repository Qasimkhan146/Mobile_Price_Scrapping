import React, { Suspense } from "react";
import AdvanceSearchComponent from "../component/AdvanceSearchComponent/AdvanceSearchComponent";

const AdvanceSearch = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdvanceSearchComponent />
    </Suspense>
  );
};

export default AdvanceSearch;
