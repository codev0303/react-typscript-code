import { FunctionComponent } from "react";
import { H4Shape } from "./typed";

const H4: FunctionComponent<H4Shape> = ({ text, cssClass= "" }) => {
  return <h4 className={`text-3xl ${cssClass}`}>{text}</h4>;
};

export default H4;
