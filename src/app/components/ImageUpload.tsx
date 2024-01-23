import { Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'

interface ImageUploadProps {
  poster: File | null
  setPoster: Dispatch<SetStateAction<File | null>>
}

export default function ImageUpload({ poster, setPoster }: ImageUploadProps) {
  return (
    <div>
      <input
        className={clsx(
          !poster && 'cursor-pointer',
          'file:flex',
          'file:h-[500px]',
          'file:w-full',
          'file:flex-col',
          'file:items-center',
          'file:justify-center',
          'file:rounded-[10px]',
          'file:border-2',
          'file:border-dashed',
          'file:border-white',
          'file:bg-input',
          'file:text-white',
          'file:align-middle',
        )}
        type="file"
        id="poster"
        name="poster"
      />
    </div>
  )
}
