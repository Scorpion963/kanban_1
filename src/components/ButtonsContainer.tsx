import BoardButton from "./BoardButton";

export default async function ButtonsContainer () {
    return <div className="flex flex-col pr-4">
        <BoardButton />
        <BoardButton />
        <BoardButton />
        <BoardButton />
    </div>
}