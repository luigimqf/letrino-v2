"use client";

import { Check, X } from "lucide-react";

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

interface PasswordRequirementsProps {
  password: string;
  className?: string;
}

const requirements: PasswordRequirement[] = [
  {
    label: "Pelo menos 8 caracteres",
    test: (password) => password.length >= 8,
  },
  {
    label: "Pelo menos uma letra maiúscula",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    label: "Pelo menos uma letra minúscula",
    test: (password) => /[a-z]/.test(password),
  },
  {
    label: "Pelo menos um número",
    test: (password) => /\d/.test(password),
  },
  {
    label: "Pelo menos um caractere especial",
    test: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
];

export function PasswordRequirements({ password, className = "" }: PasswordRequirementsProps) {
  if (!password) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      <p className="text-sm font-medium text-text-100">Requisitos da senha:</p>
      <ul className="space-y-1">
        {requirements.map((requirement, index) => {
          const isValid = requirement.test(password);
          return (
            <li key={index} className="flex items-center gap-2 text-xs">
              {isValid ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <X className="h-3 w-3 text-red-500" />
              )}
              <span className={`${isValid ? "text-green-600" : "text-red-600"} font-medium`}>
                {requirement.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
