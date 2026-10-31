import { motion } from "motion/react";
export default function UserDetail({ label, detail }) {
  return (
    <motion.div
      className="flex flex-col w-70"
      initial={{ y: 10 }}
      animate={{ y: 0, transition: { duration: 0.8, type: "tween" } }}
    >
      <p className="text-sm ">{label}</p>
      <h3 className="text-md text-white ">{detail}</h3>
    </motion.div>
  );
}
