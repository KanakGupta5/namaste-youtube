import offlineIcon from "../assets/images/offline.png"

const Offline = () => {
    return <div className=" flex flex-col justify-center items-center gap-y-4">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-14 h-14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M2 8.8a15 15 0 0 1 20 0" />
        <path d="M5 12a10 10 0 0 1 14 0" />
        <path d="M8.5 15.5a5 5 0 0 1 7 0" />
        <path d="M12 19h.01" />
        <path d="M3 3l18 18" />
      </svg>
      <h3 className="font-bold text-3xl">No Internet</h3>
      <p className="rounded-lg bg-gray-200 p-2">It looks like you're not connected to the internet. Please check your connection and try again!</p>
    </div>
}

export default Offline;