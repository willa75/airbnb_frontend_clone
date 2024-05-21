import EmptyState from "../EmptyState";

const Home: React.FC<{}> = () => {
  const isEmpty = true;

  if (isEmpty) {
    return (
      <EmptyState />
    )
  }

  return (
    <div className="
      mx-auto 
      xl:px-20
      md:px-10 
      sm:px-2 px-4
      pt-24
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      xl:grid-cols-5
      2xl:grid-cols-6
    ">
      <div>My future listings</div>
    </div>
  );
};

export default Home;