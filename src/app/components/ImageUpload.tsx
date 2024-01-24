import { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'

interface ImageUploadProps {
  poster: File | null
  setPoster: Dispatch<SetStateAction<File | null>>
  text: string
}

export default function ImageUpload({
  poster,
  setPoster,
  text,
}: ImageUploadProps) {
  return (
    <div className="flex w-full items-center justify-center self-start">
      <label
        htmlFor="poster"
        className="flex h-[32rem] w-full cursor-pointer flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-white bg-input hover:border-gray-100 hover:bg-input/55"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <Image src="/images/UploadIcon.svg" alt="" width={32} height={32} />
          <p className="mb-2 text-base-s text-white">{text}</p>
        </div>
        <input
          accept="image/png"
          id="poster"
          name="poster"
          type="file"
          className="hidden"
        />
      </label>
    </div>
  )
}
