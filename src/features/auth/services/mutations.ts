import { useMutation } from "@tanstack/react-query";

async function logout() {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
    });

    if (!res.ok) {
      return {
        success: false,
        error: "unable to logout",
      };
    }

    return {
      success: true,
      message: null,
    };
  } catch {
    return {
      success: false,
      error: "server error",
    };
  }
}

export const useLogout = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
};
