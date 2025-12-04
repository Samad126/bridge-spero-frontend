import AuthLogo from "../AuthLogo";
import Link from "next/link";

const StudentRegistration = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center my-10">
      <section className="w-[343px] h-full mx-auto flex flex-col items-center justify-center border border-gray-light p-[32px] gap-[24px] lg:w-[692px] ">
        <AuthLogo />
        <div className="flex flex-col gap-[12px]">
          <h2 className="text-primary text-[28px] text-center leading-[100%] lg:text-[48px]">
            Student Registration
          </h2>
          <p className="text-tertiary text-center leading-[130%] lg:text-[20px]">
            Create your account to start learning
          </p>
        </div>
        <div>
          <form
            action=""
            className="grid grid-cols-1 gap-[18px] lg:grid-cols-2 lg:gap-x-[12px] lg:gap-y-[24px]"
          >
            <p className="w-full">
              <label
                htmlFor=""
                className="leading-[100%] block w-full mb-[8px]"
              >
                First Name *
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
              />
            </p>

            <p className="w-full">
              <label
                htmlFor=""
                className="leading-[100%] block w-full mb-[8px]"
              >
                Last Name *
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
              />
            </p>

            <p className="w-full">
              <label
                htmlFor=""
                className="leading-[100%] block w-full mb-[8px]"
              >
                Email *
              </label>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
              />
            </p>

            <div className="w-full">
              <label
                htmlFor=""
                className="leading-[100%] block w-full mb-[8px]"
              >
                Phone Number *
              </label>
              <div className="flex w-full">
                <select
                  name=""
                  id=""
                  className="p-[12px] h-[43px] leading-[130%] border border-gray-light placeholder-gray-light outline-0"
                >
                  <option value="all">+994</option>
                </select>
                <input
                  type="email"
                  placeholder="Phone Number"
                  className="p-[12px] w-full h-[43px] leading-[130%] border border-gray-light placeholder-gray-light  outline-0"
                />
              </div>
            </div>

            <p className="w-full">
              <label
                htmlFor=""
                className="leading-[100%] block w-full mb-[8px]"
              >
                Password *
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
              />
            </p>

            <p className="w-full">
              <label
                htmlFor=""
                className="leading-[100%] block w-full mb-[8px]"
              >
                Confirm Password *
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
              />
            </p>

            <p className="w-full lg:col-span-2">
              <label
                htmlFor=""
                className="leading-[100%] block w-full mb-[8px]"
              >
                Which Subjects Interests You?
              </label>
              <select className="w-full h-[43px] p-[12px] gap-[10px] border border-gray-light outline-0 text-gray-light">
                <option value="all">Choose</option>
              </select>
            </p>

            <p className="w-full lg:col-span-2">
              <label
                htmlFor=""
                className="leading-[100%] block w-full mb-[8px]"
              >
                Bio
              </label>
              <textarea
                placeholder="Bio"
                className="w-full p-[12px] border border-gray-light placeholder-gray-light outline-0 h-[100px] text-gray-light"
              ></textarea>
            </p>
            <div className="flex items-center gap-[12px] lg:col-span-2">
              <input
                type="checkbox"
                className="w-[18px] h-[18px] border border-gray-light"
              />
              <label htmlFor="" className="text-[15px] leading-[100%] lg:block">
                I agree to the{" "}
                <span className="text-primary">terms and conditions</span>
              </label>
            </div>
            <button className="w-full text-[18px] text-custom-white bg-secondary p-[12px] lg:col-span-2">
              Create Student Account
            </button>
            <p className="w-full text-center lg:col-span-2">
              Already have an account?{" "}
              <span className="text-primary">
                <Link href={"/login"}>Sign In</Link>
              </span>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default StudentRegistration;
