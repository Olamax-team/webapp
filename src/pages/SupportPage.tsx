import React from "react";
import { documentTitle } from "../lib/utils";
import Support from "../components/support/support";

const SupportPage = () => {
  documentTitle('Support');

  return (
    <React.Fragment>
        <Support/>
    </React.Fragment>
  )
}

export default SupportPage;