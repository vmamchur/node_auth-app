export function validateEmail(value: string) {
  if (!value) {
    return 'Email is required';
  }

  const emailRegex = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

  if (!emailRegex.test(value)) {
    return 'Email is not valid';
  }
}

export function validatePassword(value: string) {
  if (!value) {
    return 'Password is required';
  }

  if (value.length < 6) {
    return 'At least 6 characters';
  }
}