export const cachebuster = Math.round(new Date().getTime() / 1000);
export const isProd = process.env.NODE_ENV === 'prod' ? true : false;
