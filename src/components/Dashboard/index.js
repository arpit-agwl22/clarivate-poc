import { constants } from "../pathConstants";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { listSelector } from "../../slices/list";
import Card from "../List/Card";
import { PageLayout } from "../styled-components";

function Dashboard() {
  const { listResponse } = useSelector(listSelector);
  return (
    <PageLayout>
      <Link to={constants.LIST}><button>Go to List</button></Link>
      <h1>Favorites</h1>
      {listResponse.length > 0 ? 
      <Card dashboardView={true} cardData={listResponse} listResponse={listResponse} />
      : <p>No item in Favorite list</p>}
    </PageLayout>
  );
}

export default Dashboard;