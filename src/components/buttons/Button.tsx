
export default function Button({text, onClick}:Readonly<{text:string, onClick:()=>void}>) {
  return (
    <button className='font-redHatBold font-bold bg-red-900 text-[white] rounded-full w-full py-3' onClick={onClick}>{text}</button>
  )
}
