/**
 * Signup errors
 */

export const signUpErrors = (err) => {
    let errors = { pseudo: "", password: "" }

    if (err.message.includes("pseudo"))
        errors.pseudo = "Votre pseudo ne peut contenir que des lettres, chiffres, tirets (-) et underscoress (_) et faire entre 3 et 20 caractères.";
    if (err.message.includes("password"))
        errors.password = "Votre mot de passe ne respecte pas les conditions requises.";
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = "Ce pseudo est déjà pris.";

    return errors;
};

/**
 * Signin errors
 */

export const signInErrors = (err) => {
    let errors = { pseudo: "", password: "" }

    if (err.name.includes("pseudo"))
        errors.pseudo = "Ce pseudo n\'existe pas."
    if (err.name.includes("password"))
        errors.password = "Mot de passe incorrect."

    return errors
}