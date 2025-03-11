import React from "react";
import OlamaxFoundation from "../components/olamaxFoundation/olamaxFoundation";
import { documentTitle } from "../lib/utils";
import TopHeader from "../components/footer/TopHeader";

const OlamaxFoundationPage = () => {
  documentTitle('Olamax Foundation');

  return (
    <React.Fragment>
        <OlamaxFoundation/>
        <TopHeader/>
    </React.Fragment>
  )
}

export default OlamaxFoundationPage;