import { useEffect, useState } from "react";
import { theme } from "../theme/theme";

// NOT USED FOR NOW / UNFINISHED / MAY USE LATER
// NOT USED FOR NOW / UNFINISHED / MAY USE LATER
export default function useBackgroundColor() {
  // If we have something in local storate use that, use the default.
  const [backgroundColor, setBackgroundColor] = useState<string>(
    localStorage.getItem("backgroundColor") || `${theme.colors.backgroundColor}`
  );

  useEffect(() => {
    // On change of color by user, set the new color as local storage.
    localStorage.setItem("backgroundColor", backgroundColor);
  }, [backgroundColor]);

  return { backgroundColor, setBackgroundColor };
}
