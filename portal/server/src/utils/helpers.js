// Differentiate between JOI and other errors
export const parseError = err => {
    if (err.isJoi) {
        return err.details[0].message;
    }

    return err;
};

// Items to store in session
export const sessionizeUser = user => {
    return { userId: user.id, email: user.email };
}