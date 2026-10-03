import sidebarData from "../mockData/sidebarData.json"
import SidebarTile from "./SidebarTile";

const Sidebar = () => {
    return <>
        <div >
            {
                sidebarData.length > 0 && sidebarData.map((ele, index) => <SidebarTile key={index} data={ele} />)
            }
        </div>
    </>
}
export default Sidebar;