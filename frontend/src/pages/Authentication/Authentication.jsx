import { useSearchParams } from "react-router-dom";
import logo from "/logo.webp";

import AuthForm from "./AuthForm";
//const AuthForm = lazy(() => import("./AuthForm"));

export default function Authentication() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  return (
    <main className="flex h-lvh max-lg:flex max-lg:flex-col">
      <article className="bg-[var(--primary-700)] w-[48%] p-16 px-20 flex flex-col items-start max-lg:w-full max-lg:items-center max-md:px-8 max-md:py-8 max-lg:px-10 max-lg:py-10">
        <div className="text-left my-auto max-lg:text-center">
          <img src={logo} alt="logo" className="w-28 max-lg:mx-auto"></img>
          <h1 className="text-5xl leading-20 my-1 mx-0 max-md:text-2xl max-lg:text-3xl max-lg:leading-8">
            Taskboard
          </h1>
          <p className="text-lg max-md:text-sm max-lg:text-lg">
            Plan your work, in real time. <br />A Personal Kanban Board to
            organize your own tasks.
          </p>
        </div>
      </article>
      <article className="w-[45%] bg-[var(--primary-900)] m-auto max-md:w-[80%] max-lg:mx-auto max-lg:mt-8 max-lg:w-[80%]">
        <div className="max-w-[70%] mx-auto max-lg:max-w-[90%]">
          <AuthForm key={mode} mode={mode} />
        </div>
      </article>
    </main>
  );
}
