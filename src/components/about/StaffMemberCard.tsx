import Image from "next/image";
import Link from "next/link";

import { RiTwitterLine } from 'react-icons/ri'
import { RiInstagramLine } from 'react-icons/ri'
import { RiLinkedinLine } from 'react-icons/ri'

export function StaffMemberCard(props: { name: string, role: string, src: string, twitter: string, instagram: string, linkedin: string }) {
  return (
    <div className="flex flex-col w-full items-center">
      <div className="bg-[#F5F5F5] w-full mb-8">
        <Image src={props.src} alt="" className="mx-auto" />
      </div>
      <div className="flex flex-col mb-4 items-start w-full">
        <span className="font-inter font-medium text-3xl">{props.name}</span>
        <span>{props.role}</span>
      </div>
      <div className="flex gap-4 items-start w-full">
        <Link href={props.twitter} target="_blank" title="twitter"><RiTwitterLine size={24} /></Link>
        <Link href={props.instagram} target="_blank" title="instagram"><RiInstagramLine size={24} /></Link>
        <Link href={props.linkedin} target="_blank" title="linkedin"><RiLinkedinLine size={24} /></Link>
      </div>
    </div>
  )
}