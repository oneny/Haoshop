const publicURL = (fileName) => {
  return process.env.NODE_ENV === "production"
    // ? `/api/public/${fileName}`
    // : `http://localhost:8000/api/public/${fileName}`;
    ?  `http://15.164.250.22/public/${fileName}`
    : `http://localhost:8000/public/${fileName}`;
};

export default publicURL;
