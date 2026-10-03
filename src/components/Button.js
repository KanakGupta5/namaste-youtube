const Button = ({data}) => {
    const {name} = data;
    return (
    <>
        <button className="bg-gray-100 px-2.5 py-1 rounded-xl text-nowrap shrink-0">{name}</button>
    </>
    )
}

export default Button;