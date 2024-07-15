import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

export default function ErrorPage() {
  const navigation = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-y-5">
      <img src="/cat.png" alt="sad-cat" className="aspect-square w-[150px]" />

      <div className="flex w-[30%] flex-col justify-center items-center gap-y-5 bg-white translate-y-[-63px] p-2 rounded shadow-md">
        <p>Ooops, something went wrong</p>
        <p>The resource you're looking for is not here|</p>
        <p>
          404:{" "}
          <span className="font-bold">
            {window.location.pathname.split("/")[1]}
          </span>{" "}
          Not Found
        </p>
        <Button variant={"destructive"} onClick={() => navigation("/")}>
          Home
        </Button>
      </div>
      <img
        src="/cat_paws.png"
        alt="sad-cat"
        className="aspect-square w-[150px] translate-y-[-378px]"
      />
    </div>
  );
}
