import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Spin } from "antd";
import Layout from "@/layout";
import Login from "@pages/login";
import { connect } from "react-redux";
import { RouterBasename } from "@/common";
import { setUserInfoAction } from "@/store/user/action";
import { getLocalUser } from "@/utils";
import { State, Dispatch } from "@/types"

interface AppRouterProps {
  userInfo: State["user"]
  setUser: (info: State["user"]) => void
}

const mapStateToProps = (state: State) => ({
  userInfo: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (info: State["user"]) => dispatch(setUserInfoAction(info)),
});

function AppRouter({ userInfo, setUser }: AppRouterProps) {
  const [loading, setLoad] = useState(true);
  useEffect(() => {
    if (!userInfo) {
      let localInfo = getLocalUser();
      if (localInfo && localInfo.isLogin === true) {
        setUser(localInfo);
      }
      return setLoad(false);
    }
    setLoad(false);
    // eslint-disable-next-line
  }, []);
  if (loading)
    return (
      <Spin size="large" wrapperClassName="loading-page" tip="Loading...">
        <div className="loading-page"></div>
      </Spin>
    );
  if (!userInfo) return <Login />;
  return (
    <Router basename={RouterBasename}>
      <Layout />
    </Router>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRouter);
