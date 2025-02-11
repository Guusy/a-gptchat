import { LoaderPinwheel } from "lucide-react";

export default function FullScreenLoader({ size }: { size: number }) {
  return (
    <div className="flex justify-center items-center h-full">
      <LoaderPinwheel className="animate-spin text-grey-500" size={size} />
    </div>
  );
}
