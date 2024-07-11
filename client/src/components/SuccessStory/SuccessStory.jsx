import couple1 from '../../assets/couple1.jpeg'
import couple2 from '../../assets/couple2.jpeg'
import couple3 from '../../assets/couple3.jpeg'

function SuccessStory() {
    const successStories = [
      {
        coupleImage: couple1,
        gender: "male",
        marriageDate: "June 12, 2023",
        reviewStar: 5,
        successStoryText:
          "We found each other on this platform and couldn't be happier. Thank you for helping us find our perfect match!",
      },
      {
        coupleImage: couple2,
        gender: "female",
        marriageDate: "September 5, 2022",
        reviewStar: 4,
        successStoryText:
          "Meeting my husband on this site was a dream come true. We're grateful for the opportunity to have found each other.",
      },
      {
        coupleImage: couple3,
        gender: "female",
        marriageDate: "September 5, 2022",
        reviewStar: 4,
        successStoryText:
          "Our journey started on this platform, and it led us to each other. We couldn't be happier with the connection we found here. Thank you for helping us create our happily ever after.",
      },
      // Add more success stories as needed
    ];
  return (
    <section className=" py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-darkPurple">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {successStories.map((story, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-4">
                {story.gender === "male" ? (
                  <img
                    src={story.coupleImage}
                    alt="Male"
                    className="w-24 h-24 rounded-full mx-auto"
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                  />
                ) : (
                  <img
                    src={story.coupleImage}
                    alt="Female"
                    className="w-24 h-24 rounded-full mx-auto object-cove"
                    style={{ maxWidth: "150px", maxHeight: "150px" }}
                  />
                )}
              </div>
              <p className="text-gray-600 text-center mb-2">
                Marriage Date: {story.marriageDate}
              </p>
              <div className="flex justify-center mb-4">
                {[...Array(story.reviewStar)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-current text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 17.707a1 1 0 0 1-1.414-1.414L8 10.586 1.707 4.293a1 1 0 0 1 1.414-1.414L9 9.172l6.293-6.293a1 1 0 0 1 1.414 1.414L10.414 10l6.293 6.293a1 1 0 0 1-1.414 1.414L9 11.828l-6.293 6.293a1 1 0 0 1-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-gray-700">{story.successStoryText}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuccessStory