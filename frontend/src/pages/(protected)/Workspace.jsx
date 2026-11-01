import useModal from "../../hooks/useModal";
import { useCurrentBoards } from "../../hooks/useBoardsData";
import { VscAdd } from "react-icons/vsc";

import CardItem from "../../components/Card/CardItem";
import CardList from "../../components/Card/CardList";
import PageContent from "../../components/PageContent";
import Button from "../../components/UIcomponents/Button";
import heroImg from "/hero-2.png";
import Loading from "../Loading";
export default function Workspace() {
  const { showModal } = useModal();
  const { data, isLoading } = useCurrentBoards({});
  const boardsData = data.boards;
  return (
    <PageContent title="Your workspace">
      {isLoading && <Loading />}
      {/* No content to show */}
      {!boardsData ||
        (boardsData.length <= 0 && (
          <section className="mx-auto my-8 flex flex-col gap-4 justify-center items-center text-center">
            <img src={heroImg} alt="" className="w-[35rem]" />
            <p>Start your personal boards to manage your projects.</p>
            <Button highlight onClick={() => showModal("CREATE")}>
              Create your first board
            </Button>
          </section>
        ))}
      {/* Show content */}
      {boardsData && boardsData.length > 0 && (
        <section className="w-full max-lg:w-[90%] max-lg:mx-auto">
          <CardList className="max-lg:grid max-lg:grid-cols-2 max-md:grid-cols-1">
            {boardsData.map((board) => (
              <CardItem
                key={board._id}
                id={board._id}
                data={board}
                linkTo={`/boards/${board._id}`}
              />
            ))}
            <li
              onClick={() => showModal("CREATE")}
              className="flex justify-center items-center min-w-60 w-60 min-h-28 border-2 border-dashed border-[var(--primary-300)] rounded-lg px-4 pt-2 pb-3 mb-1 hover:cursor-pointer hover:bg-[var(--primary-700)] hover:border-[var(--violet-500)] hover:shadow-lg/20 max-lg:w-full"
            >
              <VscAdd className="rounded-[50%] px-1 py-1 w-auto h-auto mr-1 " />
              <p className="text-center">Create New Board</p>
            </li>
          </CardList>
        </section>
      )}
    </PageContent>
  );
}
