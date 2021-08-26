export interface User {
    email: string;
    password: string;
    returnSecureToken?: boolean;
}

export interface FbAuthResponse {
    idToken: string;
    expiresIn: string;
}

export interface Game {
    added?: boolean;
    id?: string;
    img?: string;
    title: string;
    genre: string;
    developer: string;
    text: string;
    date: Date;
    price: string;
}
export interface Gamer {
    id?: string;
    name: string;
    type: string;
    added?: boolean;
    req?: boolean;
}

export interface FbCreateResponse {
    name: string;
}
