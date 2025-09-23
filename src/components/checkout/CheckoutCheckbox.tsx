"use client";

import * as Checkbox from "@radix-ui/react-checkbox";
import { BsCheckLg } from "react-icons/bs";

export function CheckoutCheckbox() {
  return (
    <div className="flex items-start mb-24 xl:mb-36">
      <Checkbox.Root
        className="flex h-6 w-9 md:w-6 appearance-none items-center justify-center rounded-[4px] bg-[#e0e0e0]"
        defaultChecked
        id="saveInfo"
      >
        <Checkbox.Indicator className="flex items-center rounded justify-center w-full h-full bg-exclusive-secondary">
          <BsCheckLg className="text-exclusive-background" size={20} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label
        className="pl-4 text-exclusive-text-2"
        htmlFor="saveInfo"
      >
        Save this information for faster check-out next time
      </label>
    </div>
  )
}