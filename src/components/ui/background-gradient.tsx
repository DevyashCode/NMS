// import { cn } from "../../lib/utils";
// import React from "react";
// import { motion } from "motion/react";

// export const BackgroundGradient = ({
//   children,
//   className,
//   containerClassName,
//   animate = true,
// }: {
//   children?: React.ReactNode;
//   className?: string;
//   containerClassName?: string;
//   animate?: boolean;
// }) => {
//   const variants = {
//     initial: {
//       backgroundPosition: "0 50%",
//     },
//     animate: {
//       backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
//     },
//   };
//   return (
//     <div className={cn("relative p-[4px] group", containerClassName)}>
//       <motion.div
//         variants={animate ? variants : undefined}
//         initial={animate ? "initial" : undefined}
//         animate={animate ? "animate" : undefined}
//         transition={
//           animate
//             ? {
//                 duration: 5,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }
//             : undefined
//         }
//         style={{
//           backgroundSize: animate ? "400% 400%" : undefined,
//         }}
//         className={cn(
//           "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl  transition duration-500 will-change-transform",
//           "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
//         )}
//       />
//       <motion.div
//         variants={animate ? variants : undefined}
//         initial={animate ? "initial" : undefined}
//         animate={animate ? "animate" : undefined}
//         transition={
//           animate
//             ? {
//                 duration: 5,
//                 repeat: Infinity,
//                 repeatType: "reverse",
//               }
//             : undefined
//         }
//         style={{
//           backgroundSize: animate ? "400% 400%" : undefined,
//         }}
//         className={cn(
//           "absolute inset-0 rounded-3xl z-[1] will-change-transform",
//           "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
//         )}
//       />

//       <div className={cn("relative z-10", className)}>{children}</div>
//     </div>
//   );
// };
import { cn } from "../../lib/utils";
import React from "react";
import { motion } from "motion/react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener("resize", throttledResize);
    return () => {
      window.removeEventListener("resize", throttledResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  // Responsive animation settings
  const animationConfig = React.useMemo(() => ({
    duration: isMobile ? 8 : 5, // Slower on mobile for better performance
    repeat: Infinity,
    repeatType: "reverse" as const,
  }), [isMobile]);

  // Responsive background size
  const backgroundSize = React.useMemo(() => {
    if (!animate) return undefined;
    return isMobile ? "300% 300%" : "400% 400%";
  }, [animate, isMobile]);

  return (
    <div className={cn("relative p-1 sm:p-[2px] md:p-[3px] lg:p-[4px] group", containerClassName)}>
      {/* Blur layer */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={animate ? animationConfig : undefined}
        style={{
          backgroundSize: backgroundSize,
        }}
        className={cn(
          "absolute inset-0 rounded-2xl sm:rounded-3xl z-[1] opacity-40 sm:opacity-60 group-hover:opacity-80 sm:group-hover:opacity-100 blur-sm sm:blur-xl transition duration-300 sm:duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />
      
      {/* Main gradient layer */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={animate ? animationConfig : undefined}
        style={{
          backgroundSize: backgroundSize,
        }}
        className={cn(
          "absolute inset-0 rounded-2xl sm:rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
