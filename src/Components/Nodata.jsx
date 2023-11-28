import { Link } from "react-router-dom";
import box from "../assets/image/empt_icon.png";
const Nodata = ({ emptyMessage, path }) => {
  return (
    <body className="flex flex-col justify-center items-center h-[500px] ">
      <img src={box} alt="" className="w-60" />
      <p className="max-w-sm text-center my-3">{emptyMessage}</p>
      <Link to={`${path}`} className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        <span className="mr-2">Go Home</span>
      </Link>
    </body>
  );
};

export default Nodata;
