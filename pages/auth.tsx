import Input from "../components/input";

const auth = () => {
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-fixed bg-no-repeat bg-cover bg-center">
      <div className="bg-black h-full w-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="netflix-logo" className="h-12" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-50 px-10 py-10 self-center mt-2 lg:max-w-md rounded-nd w-full">
            <h2 className="text-white text-4xl font-semibold mb-8">Sign In</h2>
            <div className="flex flex-col gap-4">
              <Input />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default auth;
