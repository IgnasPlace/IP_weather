import classes from "./LoadingMain.module.css";
import PuffLoader from "react-spinners/PuffLoader";

const LoadingMain = () => {
  return (
    <div className={classes["loading-spinner-container"]}>
      <PuffLoader className={classes["loading-spinner-item"]} color="#aaa" />
      {/* <h3 className={classes["loading-spinner-item"]}>Loading..</h3> */}
    </div>
  );
};

export default LoadingMain;
