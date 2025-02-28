import React from "react";
import NewsAnnounce from "../components/news/NewsAnnounce";
import { documentTitle } from "../lib/utils";

const NewsAnnouncement = () => {
  documentTitle('News & Announcements');

  return (
    <React.Fragment>
      <NewsAnnounce/>
    </React.Fragment>
  )
}

export default NewsAnnouncement;