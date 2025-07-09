export const SERVER_PORT: number = +process.env.SERVER_PORT;
export const SERVER_HOST: string = process.env.SERVER_HOST;
export const SERVER_PROTOCOL: string = process.env.SERVER_PROTOCOL;
export const SERVER_URL: string = `${process.env.SERVER_PROTOCOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`;