"use client"

import Image from "next/image";
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from "react";
import { uploadMovie } from '@/app/lib/actions';

export default function ImageUpload() {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const lastUploadedFile = acceptedFiles[acceptedFiles.length - 1];
    if (!lastUploadedFile) return;
    const formData = new FormData();
    formData.append('file', lastUploadedFile)
    await uploadMovie(formData)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png']
    }
  })

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer	flex h-[500px] w-1/2 flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-white bg-input text-white">
      <input {...getInputProps()}
      />
      <Image src="/UploadIcon.svg" alt="Upload icon" height={24} width={24} />
      <span>Drop an image here</span>
    </div>
  )
}
