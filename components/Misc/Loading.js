import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";
import { CircularProgress, Typography } from "@mui/material";

import classes from "./Loading.module.css";

const Loading = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouteChange = (url, { shallow }) => {
      setLoading(true);
    };

    const handleRouteComplete = (url, { shallow }) => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  if (loading) {
    return createPortal(
      <div key="global-loader" className={classes.loading}>
        <CircularProgress size={50} />
        <Typography variant="h5">Please Wait</Typography>
      </div>,
      document.body
    );
  } else {
    return null;
  }
};

export default Loading;
