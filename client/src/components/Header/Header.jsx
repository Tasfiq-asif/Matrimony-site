

// eslint-disable-next-line react/prop-types
function Header({title}) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-darkPurple mx-auto text-center my-10 mb-10">{title}</h1>
    </div>
  );
}

export default Header