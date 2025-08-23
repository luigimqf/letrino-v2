import { useMutation, useQueryClient } from "@tanstack/react-query";

type AttemptRouteProps = {
  attempt: string;
  status: "success" | "fail";
};

async function registerAttempt({ attempt, status }: AttemptRouteProps) {
  const response = await fetch(`/attempt/${status}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attempt,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to submiting attempt");
  }

  return response.json();
}

async function registerSkipped() {
  const response = await fetch("/attempt/skipped/register", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to register skipped attempt");
  }

  return response.json();
}

async function deleteSkipped() {
  const response = await fetch("/attempt/skipped/delete", {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to register skipped attempt");
  }

  return response.json();
}

export const useAttemptSuccessMutation = () => {
  return useMutation({
    mutationKey: ["attempt-fail"],
    mutationFn: ({ attempt }: { attempt: string }) => registerAttempt({ attempt, status: "fail" }),
  });
};

export const useAttemptFailedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["attempt-success"],
    mutationFn: ({ attempt }: { attempt: string }) =>
      registerAttempt({ attempt, status: "success" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leaderboard"] });
    },
  });
};

export const useRegisterSkippedMutation = () => {
  return useMutation({
    mutationKey: ["attempt", "skipped", "register"],
    mutationFn: registerSkipped,
  });
};

export const useDeleteSkippedMutation = () => {
  return useMutation({
    mutationKey: ["attempt"],
    mutationFn: deleteSkipped,
  });
};
