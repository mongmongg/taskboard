import * as motion from "motion/react-client";

export default function Form({ header, className, children, onSubmit }) {
  const cssClass = "text-left max-w-full m-auto " + className;
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
  }
  return (
    <form className={cssClass} onSubmit={handleSubmit}>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        className="mb-4"
      >
        <h2 className="mb-4 flex justify-between items-center">{header}</h2>
      </motion.section>
      <motion.section
        initial={{ y: "10px" }}
        animate={{ y: "0px", transition: { duration: 0.5, type: "tween" } }}
        className="flex flex-col gap-3.5"
      >
        {children}
      </motion.section>
    </form>
  );
}
