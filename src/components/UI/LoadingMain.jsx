import classes from "./LoadingMain.module.css";

const LoadingMain = () => {
  return (
    <div className={classes["loading-spinner-container"]}>
      <h3 className={classes["loading-spinner-item"]}>Loading..</h3>
    </div>
  );
};

export default LoadingMain;
