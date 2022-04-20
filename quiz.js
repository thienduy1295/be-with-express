const db = [123, 345, 657];

const isAuthenticated = (accessToken) => {
  const result = db.includes(accessToken);
  if (!result) {
    console.log("accessToken is invalid");
    console.log("Please login!");
  }
};

const middlewareOne = () => {
  console.log("m1");
  middlewareTwo();
};
const middlewareTwo = () => {};

const postNews = (req) => {
  isAuthenticated(req);
};

const body = { title: "Wednesday", content: "Learning express" };
const accessToken = 123;
const req = { body, accessToken };

postNews();
