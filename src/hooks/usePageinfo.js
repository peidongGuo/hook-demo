import React, { Component, useState, useEffect } from "react";
import {
  useParams,
  useHistory,
  useLocation,
  useRouteMatch
} from "react-router-dom";

const usePageinfo = () => {
  const routeParams = useParams();
  const routeHistory = useHistory();
  const routeLocation = useLocation();
  const routeMatch = useRouteMatch();
  console.log("useParams:");
  console.log(routeParams);
  console.log("useHistory:");
  console.log(routeHistory);
  console.log("useLocation:");
  console.log(routeLocation);
  console.log("useMatch:");
  console.log(routeMatch);
};

export default usePageinfo;
