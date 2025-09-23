import { ReactFragment } from "react";

export function SectionTag(props: { content: ReactFragment }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span className="bg-exclusive-secondary rounded w-4 h-8 lg:w-5 lg:h-10"></span>
      <span className="font-semibold text-exclusive-secondary text-sm lg:text-base">{props.content}</span>
    </div>
  )
}