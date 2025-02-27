import React from "react";
import TopHeader from "../components/footer/TopHeader";
import { documentTitle } from "../lib/utils";

const SupportPage = () => {
  documentTitle('Support');

  return (
    <React.Fragment>
        <SupportPage/>
        <TopHeader/>
    </React.Fragment>
  )
}

export default SupportPage;