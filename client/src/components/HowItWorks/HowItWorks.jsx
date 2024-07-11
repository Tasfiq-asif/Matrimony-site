

function HowItWorks() {
  return (
    <section className=" py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10 text-darkPurple">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-full p-6 mb-6 flex items-center justify-center w-24 h-24">
              <span className="text-4xl text-darkPink">1</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Create Your Profile</h3>
            <p className="text-gray-700 text-center">
              Sign up and create your detailed biodata including your
              preferences.
            </p>
          </div>
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-full p-6 mb-6 flex items-center justify-center w-24 h-24">
              <span className="text-4xl text-darkPink">2</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Unlock Contact Details</h3>
            <p className="text-gray-700 text-center">
              Make a secure payment to unlock the contact details of potential
              matches.
            </p>
          </div>
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="bg-white rounded-full p-6 mb-6 flex items-center justify-center w-24 h-24">
              <span className="text-4xl text-darkPink">3</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Connect & Communicate</h3>
            <p className="text-gray-700 text-center">
              Connect with your preferred matches and start your journey towards
              finding your life partner.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks