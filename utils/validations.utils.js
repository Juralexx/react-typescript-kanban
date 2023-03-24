export const isPasswordStrong = (password) => {
   const passwordRegexp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
   return passwordRegexp.test(password)
}