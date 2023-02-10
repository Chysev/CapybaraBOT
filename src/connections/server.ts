const nodes = [
  {
    name: "Music Server API",
    host: `${process.env.HOST}`,
    password: `${process.env.PASSWORD}`,
    port: 443,
    secure: true,
    retryAmount: 3,
    retryDelay: 600,
  },
];

export default nodes;
