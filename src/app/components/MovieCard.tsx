import Image from "next/image";

export default function MovieCard() {
  return (
    <div className="col-span-1 flex flex-col rounded-xl bg-card p-2 pb-4 opacity-100 hover:opacity-55">
      <Image
        className="h-auto w-full"
        src="/test.png"
        alt=""
        width={266}
        height={400}
      />
      <span className="text-base-l">Movie 1</span>
      <span className="text-base-s">2021</span>
    </div>
  )
}
