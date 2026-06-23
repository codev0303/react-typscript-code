import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import UserCheckList from "../component/Checklist/Checklist";
import H4 from "../component/H4/H4";
import Loader from "../component/loader/loader";
import User from "../component/User/User";
import { HTTPTodos, HTTPUser } from "../constants/httpTypes";
import routes from "../constants/routes";
import { replaceDynamics } from "../helpers/url";
import useHTTPGetRequest from "../hooks/use_get_request_hook";
import { setError } from "../store/actions/errorAction";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { userId = "1" } = useParams<{ userId: string }>();
  const [localUsers, setLocalUsers] = useState<HTTPUser[]>();
  const [localTodos, setLocalTodos] = useState<HTTPTodos[] | [] | null>();
  const [fetchTodos, setFetchTodos] = useState<boolean>(true);

  const usersConfig = useMemo(
    () => ({ reloadCondition: !localUsers }),
    [localUsers]
  );
  const todosConfig = useMemo(
    () => ({ reloadCondition: userId !== undefined && fetchTodos }),
    [userId, fetchTodos]
  );

  const users = useHTTPGetRequest<HTTPUser[]>(
    routes.users,
    "Users",
    undefined,
    usersConfig
  );

  const todos = useHTTPGetRequest<HTTPTodos[] | []>(
    replaceDynamics(routes.todos, { id: userId }),
    "Todos",
    undefined,
    todosConfig
  );

  useEffect(() => {
    if (users && !users.loading) {
      if (Array.isArray(users.data) && !users.data.length) {
        dispatch(
          setError({
            title: "Error message",
            body: "No users found",
            showError: true,
            type: "error",
          })
        );
        return;
      }
      setLocalUsers(users.data);
    }
  }, [users, dispatch]);

  useEffect(() => {
    if (todos && !todos.loading) {
      setLocalTodos(todos.data ?? []);
      setFetchTodos(false);
    }
  }, [todos]);

  useEffect(() => {
    setLocalTodos(undefined);
    setFetchTodos(true);
  }, [userId]);

  return !users.loading ? (
    <div className="App border min-h-screen h-full lg-w-3/6">
      <h1 className="text-4xl text-center mt-6 mb-6 font-bold p-5">
        Onboarding Tracker
      </h1>

      <div
        className={`flex ${
          !todos?.loading ? "justify-between" : "justify-evenly"
        } mx-9`}
      >
        {!users.data && <p className="font-semibold ">No user found.. </p>}
        {users.data && (
          <div>
            <H4 text="Users" cssClass="mb-6 " />
            <div>
              {users &&
                (users.data || []).map((user: { name: string; id: number }) => (
                  <User name={user?.name} id={user?.id} key={`u-${user?.id}`} />
                ))}
            </div>
          </div>
        )}
        {users?.data && userId ? (
          <UserCheckList todoItems={localTodos} loading={todos?.loading} />
        ) : null}
      </div>
    </div>
  ) : (
    <div className="min-h-screen h-full flex items-center justify-center">
      <Loader message={"Loading users..."} showLoader={true} />
    </div>
  );
};

export default Home;
