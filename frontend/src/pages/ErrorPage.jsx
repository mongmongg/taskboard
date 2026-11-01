import { Link, useRouteError } from "react-router-dom";
import logo from "/logo.webp";
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
    <section className="flex items-center justify-center gap-20 px-20 h-lvh max-lg:flex-col max-lg:gap-4">
      <article className="">
        <img src={logo} alt="logo" className="w-90 max-lg:mx-auto max-lg:w-60"></img>
      </article>
      <article className="text-left">
        <div className="mb-4">
          <h1 className="text-3xl font-semibold mb-4">{error.status}-error</h1>
          <h3 className="text-xl">{title}</h3>
          <p>{message}</p>
        </div>
        <div className="flex gap-2 items-center justify-start">
          <Button highlight className="px-4 py-2">
            <Link to="/main">Back To Home</Link>
          </Button>
        </div>
      </article>
    </section>
  );
}
