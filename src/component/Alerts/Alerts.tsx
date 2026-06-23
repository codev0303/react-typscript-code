import { Dispatch, FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { setError } from "../../store/actions/errorAction";

interface AlertsProps {
  snackbar: IError;
}

const Alerts: FunctionComponent<AlertsProps> = ({ snackbar }) => {
  const dispatch: Dispatch<any> = useDispatch();
  /**
   * Message title component
   * @returns String
   */
  const messageTitle = () => {
    if (snackbar) {
      switch (snackbar.type) {
        case "info":
          return "Information";
        case "success":
          return "Success message";
        case "error":
          return "Error message";
        default:
          return "";
      }
    }
    return "";
  };
  /**
   * Alert Border types
   * @returns String
   */
  const alertBorder = () => {
    if (snackbar) {
      switch (snackbar.type) {
        case "info":
          return "border-primaryColor border-opacity-50";
        case "success":
          return "border-green-500 border-opacity-50";
        case "error":
          return "border-red-500 border-opacity-50";
        default:
          return "border-primaryColor border-opacity-50";
      }
    }
    return "border-primaryColor border-opacity-50";
  };
  return (
    <div
      className={`${
        snackbar.showError
          ? "visible transform transition-all duration-150 ease-out translate-y-12"
          : "invisible transform transition-all duration-150 scale-0"
      } w-1/4 md:w-1/4 bg-white my-2 rounded-r-md px-6 border-l-4  ${alertBorder()}  absolute right-2 top-0 drop-shadow-lg`}
    >
      <div className="flex items-center py-4 justify-between">
        <i className="fas fa-info-circle fill-current text-4xl text-gray-700"></i>
        <div className="ml-5">
          <h1 className="text-lg font-bold">{messageTitle()}</h1>
          <p className="text-gray-700 my-0">
            {(snackbar && snackbar.body) || ""}
          </p>
        </div>
        <div>
          <button
            type="button"
            className=" text-yellow-700 outline-none absolute top-0 "
            onClick={() =>
              dispatch(
                setError({
                  title: "",
                  body: "",
                  showError: false,
                  type: "",
                })
              )
            }
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state: { errorState: { error: IError } }) => {
  return {
    snackbar: state.errorState.error,
  };
};
export default connect(mapStateToProps)(Alerts);
