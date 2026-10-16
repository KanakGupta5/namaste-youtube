const Button = ({data}) => {
    const {title} = data?.snippet;
    return (
    <>
        <button className="bg-gray-100 px-2.5 py-1 rounded-xl text-nowrap shrink-0">{title}</button>
    </>
    )
}

export default Button;