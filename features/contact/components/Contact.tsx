import Link from 'next/link'
import React from 'react'

const Contact = () => {
    return (
        <section className="container">
            <div className=" ">
                <div className=" flex flex-col gap-[16px] px-[20px] mb-15 mt-20 lg:w-[30%] lg:mx-auto">
                    <h2 className="text-primary text-[32px] text-center leading-[100%] lg:text-[54px]">
                        Contact
                    </h2>
                    <p className="text-secondary text-center leading-[130%] lg:text-[20px]">
                        Reach out for support, questions, or feedback
                    </p>
                </div>
                <div>
                    <form
                        action=""
                        className="grid grid-cols-1 gap-[18px] lg:grid-cols-4 lg:gap-x-[12px] lg:gap-y-[24px]"
                    >
                        <p className="w-full">
                            <label
                                htmlFor=""
                                className="leading-[100%] block w-full mb-[8px]"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
                            />
                        </p>

                        <p className="w-full">
                            <label
                                htmlFor=""
                                className="leading-[100%] block w-full mb-[8px]"
                            >
                                Surname
                            </label>
                            <input
                                type="text"
                                placeholder="Surname"
                                className="w-full p-[12px] gap-[10px] border border-gray-light placeholder-gray-light outline-0 h-[43px]"
                            />
                        </p>

                        <p className="w-full">
                            <label
                                htmlFor=""
                                className="leading-[100%] block w-full mb-[8px]"
                            >
                                Email
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

                        <p className="w-full lg:col-span-4">

                            <label
                                htmlFor=""
                                className="leading-[100%] block w-full mb-[8px]"
                            >
                                Message
                            </label>
                            <textarea
                                placeholder="Message"
                                className="w-full p-[12px] border border-gray-light placeholder-gray-light outline-0 h-[166px] text-gray-light resize-none"
                            ></textarea>


                        </p>

                        <button className="w-[200px] text-[18px] mx-auto text-custom-white bg-secondary py-[12px] px-[30px] lg:col-span-4">
                            Submit
                        </button>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default Contact
