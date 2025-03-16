export const passwordRequirements = {
  minLength: 8,
  patterns: {
    hasUppercase: /[A-Z]/,
    hasLowercase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSymbol: /[!@#$%^&*(),.?":{}|<>]/,
  },
}

export function validatePassword(password: string) {
  return {
    minLength: password.length >= passwordRequirements.minLength,
    hasUppercase: passwordRequirements.patterns.hasUppercase.test(password),
    hasLowercase: passwordRequirements.patterns.hasLowercase.test(password),
    hasNumber: passwordRequirements.patterns.hasNumber.test(password),
    hasSymbol: passwordRequirements.patterns.hasSymbol.test(password),
  }
}

export function isPasswordValid(requirements: ReturnType<typeof validatePassword>) {
  return Object.values(requirements).every(Boolean)
}

