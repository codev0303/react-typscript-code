import { FunctionComponent } from "react";
import H4 from "../H4/H4";
import { Checkmark, Container } from "./styled";
import { HTTPTodos } from "../../constants/httpTypes";
import Loader from "../loader/loader";
interface UserCheckListProps {
  todoItems?: HTTPTodos[]|null;
  loading?: boolean;
}

const UserCheckList: FunctionComponent<UserCheckListProps> = ({
  todoItems,
  loading,
}) => {
 return !loading ? (
    <div className="flex flex-col ">
      <H4 text="Task List" cssClass=" mb-6 " />
      {!todoItems && <p className="font-semibold ">No Todos found for this user...  </p>}
      {todoItems && !todoItems.length &&  <p className="font-semibold ">No Todos found for this user...  </p>}
      {todoItems && (todoItems || [])?.map((item: HTTPTodos, idx: number) => {
        return (
          <Container key={`${item}-${idx}`} >
            {item?.title}
            <input
              type="checkbox"
              checked={item?.completed === true ? true : false}
              readOnly
            />
            <Checkmark />
          </Container>
        );
      })}
    </div>
  ) : (
    <div className="min-h-screen h-full flex items-center justify-center w-full">
    <Loader message={"Loading checklist..."} showLoader={false}/>
    </div>
  );
};

export default UserCheckList;
