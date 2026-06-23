import { FunctionComponent } from "react";
import { Link, useParams } from "react-router-dom";
import { UserShape } from "./types";

const User: FunctionComponent<UserShape> = ({ name, id }) => {
  const { userId =   '1' } = useParams<{ userId: string }>();
  return (
    <Link to={`/users/${id}`}>
      <p className="bg-white p-3 mb-3 flex items-center justify-between">
        {name}
        {id === parseInt(userId ?? '', 10) ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        ) : null}
      </p>
    </Link>
  );
};

export default User;
