"use client";
import React from "react";
import Header from "../components/Header";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

type Inputs = {
  example: string
  exampleRequired: string
}


const Page = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    }
    return(
        <>
        <div className="w-[50%] h-[80vh] mx-auto my-[10vh] items-center border border-white mt-[15vh]">

            <button onClick={() => router.back()}
            className="flex flex-row h-1 aspect-square text-3xl ml-0">
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            <div className="flex w-[50%] h-[80vh] flex-col mx-auto items-center gap-10">
                <div
                className="flex h-[15vh] mx-auto text-5xl text-white items-center">
                    <FontAwesomeIcon icon={faRocket} className="h-[50%] mr-2" /> 
                    <h1>revoshop</h1>
                </div>
                <h1 className="text-4xl"> Log in to your account </h1>
                <form className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="text-3xl"> Email </h1>
                    <input className="w-[30vw] h-12 border border-white text-xl px-2"
                     {...register("example")} />

                    <h1 className="text-3xl"> Password </h1>
                    <input className="w-[30vw] h-12 border border-white text-xl px-2"
                    type="password"
                    {...register("exampleRequired", { required: true })} />

                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}

                    <br />
                    <br />
                    <input className="w-fit h-12 border border-white text-xl px-8 mx-auto"
                    type="submit"
                    defaultValue={"Log in"}
                    />
                </form>
            </div>
        </div>
        </>
    );

}
export default Page;



