import React from "react";
import TopHeader from "../components/footer/TopHeader";
import NewsAnnounce from "../components/news/NewsAnnounce";
import { documentTitle } from "../lib/utils";

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