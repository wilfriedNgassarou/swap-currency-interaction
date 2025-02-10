import { AnchorHTMLAttributes } from "react"

export function Credits() {
  return (
    <section className="absolute top-4 lg:top-10 left-0 w-full px-3 lg:px-40 flex flex-col lg:flex-row justify-between">
      <span>Coded by <Link href="https://x.com/Wilfried_Ng23">Wilfried Ngassarou</Link></span>
      <span>Designed by <Link href="https://x.com/nitishkmrk">Nitish Khagwal</Link></span>
    </section>
  )
}

function Link(props: AnchorHTMLAttributes<HTMLAnchorElement>){
  return (
    <a 
      {...props} 
      target="_blank"
      className="text-blue-500 font-medium underline"
    >
      {props.children}
    </a>
  )
}