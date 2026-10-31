import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { lazy, Suspense, useLayoutEffect } from "react";
import { useAuthVerifyQueryOptions } from "../../hooks/useUserData";

// import SideNavList from "../../components/Navigation/SideNavList";
const SideNavList = lazy(
  () => import("../../components/Navigation/SideNavList"),
);
const MainNavigation = lazy(() => import("../(protected)/MainNavigation"));
const CreateBoardModal = lazy(() => import("../(protected)/CreateBoardModal"));
const Loading = lazy(() => import("../Loading"));
const ConfirmationDeleteModal = lazy(
  () => import("../(protected)/ConfirmationDeleteModal"),
);
// import MainNavigation from "../(protected)/MainNavigation";
// import CreateBoardModal from "../(protected)/CreateBoardModal";
// import Loading from "../Loading";
// import ConfirmationDeleteModal from "../(protected)/ConfirmationDeleteModal";
export default function ProtectedRoot() {
  const { data: auth, isLoading } = useAuthVerifyQueryOptions();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (!auth && !isLoading) {
      navigate("/auth?mode=login", { replace: true });
    }
  }, [auth, navigate, isLoading]);
  const variants = {
    open: { width: "100%", opacity: 1 },
    closed: { width: "80%", opacity: 0 },
  };
  if (!auth || isLoading) {
    return <Loading />;
  }

  return (
    <>
      <MainNavigation />
      <Suspense>
        <main className="grid grid-cols-[repeat(6,1fr)] gap-0 h-screen max-lg:grid-cols-1">
          <motion.aside
            className="h-full bg-[var(--primary-700)] pt-18 border-r-1 border-[var(--border)] max-lg:hidden"
            variants={variants}
            initial="closed"
            animate="open"
          >
            <SideNavList />
          </motion.aside>
          <ConfirmationDeleteModal />
          <CreateBoardModal />

          <article className="grid-cols-subgrid col-span-5 w-full h-full mx-auto pt-18 pb-4 pl-2 pr-4">
            <Outlet />
          </article>
        </main>
      </Suspense>
    </>
  );
}
