import {navbar} from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "全书组织",
    icon: "book fas",
    link: "/Introduction.md",
  },
  {
    text: "相关文档",
    icon: "link fas",
    children: [
      {
        text: "https://yunlzheng.gitbook.io/prometheus-book/",
        icon: "paper-plane fas",
        link: "https://yunlzheng.gitbook.io/prometheus-book/",
      },
      {
        text: "https://doc.cncf.vip/prometheus-handbook/",
        icon: "paper-plane fas",
        link: "https://doc.cncf.vip/prometheus-handbook/",
      },
    ],
  },
]);
