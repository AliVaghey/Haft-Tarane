import { getLangs } from "@/lib/langs";

const Home = async ({ params }) => {
  const dict = await getLangs(params.lang);
  return (
    <main className="">
      <div>{dict["main"].title}</div>
    </main>
  );
};

export default Home;
