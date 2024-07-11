import about from "../../assets/about.jpeg"


function About() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-customPurple sm:text-4xl">
            About Matchmaker
          </h2>
          <p className="mt-4 text-lg text-darkPurple">
            Connecting hearts, creating bonds.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-8 md:gap-y-16">
          <div>
            <img
              className="mx-auto h-auto w-full object-cover rounded-lg shadow-lg"
              src={about}
              alt="Matchmaker"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-darkPurple mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              At Matchmaker, our mission is simple: to help people find their
              perfect match and build meaningful relationships that last a
              lifetime. We understand the importance of companionship and
              compatibility, and we are dedicated to making the process of
              finding love as easy and enjoyable as possible.
            </p>
            <h3 className="text-xl font-semibold text-darkPurple mb-4">
              Our Approach
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Unlike other matrimonial websites, we prioritize quality over
              quantity. We believe that true compatibility goes beyond
              superficial factors like appearance or wealth. That is why we focus
              on matching individuals based on shared values, interests, and
              life goals. Our advanced matching algorithms and personalized
              matchmaking services ensure that every connection made on
              Matchmaker has the potential to blossom into something beautiful.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About