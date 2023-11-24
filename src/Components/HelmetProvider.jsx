import { Helmet } from "react-helmet";

const HelmetProvider = ({ helmetTitle }) => {
  return (
    <Helmet>
      <title>{helmetTitle}</title>
    </Helmet>
  );
};

export default HelmetProvider;
