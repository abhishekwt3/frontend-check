import React, { useContext } from "react";
import KeyContext from "../components/KeyContext";

const seeFourthKey = () => {
  const keyContext = useContext(KeyContext);
  return <div>Key of Fourth Object: {keyContext.key}</div>;
};

export default seeFourthKey;
