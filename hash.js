import bcrypt from "bcrypt";

const run = async () => {
  const password = "123456789";
  const hash = await bcrypt.hash(password, 10);
  console.log("Хеш пароля:", hash);
};

run();
