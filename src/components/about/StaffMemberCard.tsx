import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { RiTwitterLine, RiInstagramLine, RiLinkedinLine } from "react-icons/ri";

type Props = {
  name: string;
  role: string;
  /** Public path ("/about/staff/…") or a static import */
  src: string | StaticImageData;
  /** Optional alt text for the image (defaults to "{name} portrait") */
  alt?: string;
  /** Optional explicit image size (required only when src is a string path) */
  imageWidth?: number;
  imageHeight?: number;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
};

export function StaffMemberCard({
  name,
  role,
  src,
  alt,
  imageWidth = 360,
  imageHeight = 360,
  twitter = "#",
  instagram = "#",
  linkedin = "#",
}: Props) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="w-full bg-[#F5F5F5] mb-8">
        <Image
          src={src}
          alt={alt ?? `${name} portrait`}
          width={imageWidth}
          height={imageHeight}
          className="mx-auto h-auto w-auto"
          loading="lazy"
        />
      </div>

      <div className="mb-4 flex w-full flex-col items-start">
        <span className="font-inter text-3xl font-medium">{name}</span>
        <span className="text-sm opacity-80">{role}</span>
      </div>

      <div className="flex w-full items-start gap-4">
        <Link href={twitter} target="_blank" rel="noopener noreferrer" title="Twitter">
          <RiTwitterLine size={24} />
        </Link>
        <Link href={instagram} target="_blank" rel="noopener noreferrer" title="Instagram">
          <RiInstagramLine size={24} />
        </Link>
        <Link href={linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
          <RiLinkedinLine size={24} />
        </Link>
      </div>
    </div>
  );
}
