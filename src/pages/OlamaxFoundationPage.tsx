import React from "react";
import TopHeader from "../components/footer/TopHeader";
import OlamaxFoundation from "../components/olamaxFoundation/olamaxFoundation";
import { documentTitle } from "../lib/utils";

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