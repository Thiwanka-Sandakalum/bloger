import { RingLoader } from "react-spinners";

export default function loading() {
  return (
    <div className="w-full flex-col-reverse space-y-5 h-screen flex justify-center items-center">
        <p>please wait</p>
        <p><RingLoader size={30} color="#1C1917" /></p>
    </div>
  )
}
