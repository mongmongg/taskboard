import { Link, useNavigate } from "react-router-dom";
import { useAuthUser, useSetAuth } from "../../hooks/useUserData.js";

import Form from "../../components/Form/Form";
import Input from "../../components/Form/Input";
import Button from "../../components/UIcomponents/Button";
import Line from "../../components/UIcomponents/Line";
import FormError from "../../components/Form/FormError.jsx";

export default function AuthForm({ mode }) {
  const isLoginPage = mode === "login";
  const setAuthorization = useSetAuth();

  const {
    mutateAsync: authMutate,
    isPending,
    isError,
    error: authError,
  } = useAuthUser({
    isLoginPage,
    onAuthSuccess: (userId) => setAuthorization(userId),
  });

  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      await authMutate({ data: formData });
      navigate(`/main`);
    } catch (error) {
      console.log(error);
      // throw new Error("Something went wrong");
    }
  }

  return (
    <Form
      header={isLoginPage ? "Welcome" : "Create you account"}
      onSubmit={handleSubmit}
    >
      {isError && <FormError>{authError.message}</FormError>}
      {!isLoginPage && (
        <>
          <Input
            label="First Name"
            name="firstName"
            placeholder="your first name"
          />
          <Input
            label="Last Name"
            name="lastName"
            placeholder="your last name"
          />
        </>
      )}
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="you@example.com"
      />
      <Input
        label="Password"
        name="password"
        type="password"
        minLength="8"
        placeholder="At least 8 characters"
      />
      {isLoginPage && <a>Forget Password?</a>}
      <div className="mx-0 my-2">
        <Button type="submit" className="w-full" highlight disabled={isPending}>
          {isLoginPage ? "Login" : "Create account"}
        </Button>
        
      </div>

      <p className="text-center">
        {isLoginPage ? "New here" : "Have an accout?"}
        <Link
          to={`?mode=${isLoginPage ? "signup" : "login"}`}
          className="no-underline text-[var(--violet-300)] hover:text-[var(--violet-500)]"
        >
          {isLoginPage ? "Create an account" : " Log in"}
        </Link>
      </p>
    </Form>
  );
}
