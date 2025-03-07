import React from "react";
import NewsAnnounce from "../components/news/NewsAnnounce";
import { documentTitle } from "../lib/utils";
import TopHeader from "../components/footer/TopHeader";

const NewsAnnouncement = () => {
  documentTitle('News & Announcements');

  return (
    <React.Fragment>
      <NewsAnnounce/>
      <TopHeader/>
    </React.Fragment>
  )
}

export default NewsAnnouncement;