import ReactDOM from "react-dom/client";
import { ReactNode } from "react";

const showError = ({
  component,
  elID,
}: {
  component: ReactNode;
  elID: string;
}) => {
  const root = ReactDOM.createRoot(
    document.getElementById(elID) as HTMLElement
  );

  root.render(component);
};

export default showError;
