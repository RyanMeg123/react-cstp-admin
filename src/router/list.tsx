import auto from "./auto";
import loadable, { LoadableComponent } from "@loadable/component";
import { Redirect } from "react-router-dom";
const Error = loadable(() => import("@pages/err"));

export type RouterInfo = {
  components: LoadableComponent<any> | React.ReactElement | React.ComponentClass<any>
  [name: string]: any
}

const defaultArr: RouterInfo[] = [
  {
    path: "/",
    key: "index",
    to: "/details/person",
    components: Redirect,
  },
  {
    path: "/result/404",
    components: Error,
  },
  {
    path: "/result/403",
    status: "403",
    errTitle: "403",
    subTitle: "Sorry, you don't have access to this page.",
    components: Error,
  },
  {
    path: "/result/500",
    status: "500",
    errTitle: "500",
    subTitle: "Sorry, the server is reporting an error.",
    components: Error,
  },
  {
    path: "*",
    title: "页面不存在",
    key: "404",
    keepAlive: true,
    components: Error,
  },
];

const list: RouterInfo[] = auto.map((c) => ({ ...c, components: loadable(c.components) }));

list.push(...defaultArr);

export default list;
