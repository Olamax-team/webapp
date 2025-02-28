import React from "react";
import OlamaxFoundation from "../components/olamaxFoundation/olamaxFoundation";
import { documentTitle } from "../lib/utils";

const OlamaxFoundationPage = () => {
  documentTitle('Olamax Foundation');

  return (
    <React.Fragment>
        <OlamaxFoundation/>
    </React.Fragment>
  )
}

export default OlamaxFoundationPage;