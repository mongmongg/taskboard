import { Link, useRouteError } from "react-router-dom";

import Logo from "../components/Logo";
import Button from "../components/UIcomponents/Button";
export default function ErrorPage() {
  const error = useRouteError();
  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      <article className="text-center m-auto">
        <div className="mb-4">
          <h1>{title}</h1>
          <p>{message}</p>
        </div>
        <div className="flex gap-2 items-center">
          Go back to
          <Button highlight>
            <Logo
              to="/"
              className="justify-center hover:text-[var(--violet-500)]"
            />
          </Button>
        </div>
      </article>
    </>
  );
}
