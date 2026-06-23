import { FunctionComponent } from "react";
import PageNotFound from "../../assets/no-activity.png";
import H4 from "../../component/H4/H4";
interface NotFoundPageProps {
  title?: string;
  subtitle?: string;
  goto?: string;
  cta?: string;
}

const NotFoundPage: FunctionComponent<NotFoundPageProps> = ({
  title,
  subtitle,
  goto,
  cta,
}) => {
  return (
    <div
      className={`self-center`}
    >
      <div className=" m-auto flex flex-col justify-center items-center min-h-max h-screen px-3">
        <img src={PageNotFound} alt="page not found" className="noCourseImg" />
        <H4 cssClass="text-3xl mt-3" text={`${title || "Page Not Found"}`} />
        <p className="noDiscussionP mt-3 mb-6">
          {subtitle ||
            "Sorry, it seems the page you are looking for does not exist or has been moved to a different location."}
        </p>

        <button className="px-4 py-2 font-semibold text-sm bg-white text-slate-700 border border-slate-300 rounded-md shadow-sm outline outline-2 outline-offset-2 outline-slate-500 dark:bg-slate-700 dark:text-slate-200 dark:border-transparent" 
          onClick={() => {
            window.location.href =  goto || '/';
          }}>
            {cta || "Goto Home"}
          </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
