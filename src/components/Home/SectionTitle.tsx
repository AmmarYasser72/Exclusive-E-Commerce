import { ReactFragment } from "react";

export function SectionTitle(props: { content: ReactFragment }){
  return (
    <h2 className="text-exclusive-text-2 font-inter font-semibold text-xl md:text-3xl">{props.content}</h2>
  )
}