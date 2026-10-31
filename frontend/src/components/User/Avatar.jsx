import { useState } from "react";
import { motion } from "motion/react";
import { useGetUserData } from "../../hooks/useUserData";
import avatar_dummy from "/Avatar/Avatar_3.png";
export default function Avatar({ ...props }) {
  const { data } = useGetUserData();
  const [isHover, setIsHover] = useState(false);
  const userData = data.user;
  const avatarName = `${userData.name.firstName} ${userData.name.lastName}`;

  return (
    <motion.div
      onHoverStart={() => {
        setIsHover(true);
      }}
      onHoverEnd={() => {
        setIsHover(false);
      }}
      {...props}
    >
      <motion.div
        animate={isHover ? { scale: 0.95 } : { scale: 1 }}
        className="relative rounded-[50%] bg-red-300 w-8 h-8 cursor-pointer"
      >
        <motion.img
          src={avatar_dummy}
          alt={avatarName}
          className="w-[2.2rem] aspect-square cursor-pointer"
          animate={
            isHover
              ? {
                  y: "-6px",
                  scale: 1.25,
                  transition: { duration: 0.5, type: "spring" },
                }
              : { scale: 1 }
          }
        />
      </motion.div>
      {isHover && (
        <p className="absolute bg-[var(--primary-300)] px-2 py-1 text-sm rounded-lg">
          {avatarName}
        </p>
      )}
    </motion.div>
  );
}
