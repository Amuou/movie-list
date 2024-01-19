import FormInput from "@/app/components/FormInput";
import Button from "@/app/components/Button";
import Link from "next/link";
import ImageUpload from "@/app/components/ImageUpload";

export default function CreateMoviePage() {
  return (
    <section className="flex flex-col">
      <h2>Create a new movie</h2>
      <div className="mt-[7.5rem] flex flex-row items-center justify-center space-x-32">
        <ImageUpload />
        <div className="h-[500px] w-1/2">
          <FormInput className="w-full" placeholder="Title" />
          <FormInput className="mt-4 w-2/3" placeholder="Publishing year" />
          <div className="mt-16 flex space-x-4">
            <Link href="/"
                  className="btn flex w-1/2 items-center justify-center border-[1px] border-solid border-white bg-transparent">Cancel</Link>
            <Button className="w-1/2" text="Submit" />
          </div>
        </div>
      </div>
    </section>
  )
}