import { useState, useEffect } from "react";
import { constants } from "../pathConstants";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchApi, listSuccess, saveListApiResponseSuccess, numOfItemsToShow } from '../../slices/list';
import { listSelector } from "../../slices/list";
import Card from "./Card";
import { PageLayout } from "../styled-components";

function List() {
  const { listResponse, listApiResponse, loading, numOfItems } = useSelector(listSelector);
  // const [numOfItems, setNumOfItems] = useState(10);
  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchApi(dispatch, numOfItems);
    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    getMorePosts();
  }, [isFetching]);


  const getMorePosts = () => {
    setIsFetching(true);
    dispatch(numOfItemsToShow(numOfItems + 10));
    setTimeout(() => {
      fetchApi(dispatch, numOfItems);
    }, 2000);
  }
  // const handleScroll = () => {
  //   const container = document.querySelector(".dashboard")
  //   // if (
  //   //   window.innerHeight + document.documentElement.scrollTop !==
  //   //   document.documentElement.offsetHeight
  //   // )
  //   //   return;
  //   if (
  //     Math.ceil(container.clientHeight + container.scrollTop) >= container.scrollHeight
  //   ) setIsFetching(true);
  // }
  const onAddToFavorites = (item) => {
    !listResponse.some(e => e.id === item.id) &&
      dispatch(listSuccess([...listResponse, { ...item, addedToFav: true }]));
  }
  const removeFromFavorites = (item) => {
    const removeIndex = (listResponse.map(e => e.id)).indexOf(item.id);
    const listResponseOnRemove = [...listResponse]
    listResponseOnRemove.splice(removeIndex, 1);
    dispatch(listSuccess(listResponseOnRemove));
  }
  // const loadFunc = () => {

  // }

  return (
    <div className="dashboard">
      <PageLayout>
        <Link to={constants.HOME}><button>Back</button></Link>
        {loading ? <h1>Loading ...</h1> :
          <>
            <Card dashboardView={false} cardData={listApiResponse} listResponse={listResponse} onAddToFavorites={onAddToFavorites} removeFromFavorites={removeFromFavorites} />
            {isFetching && (
              <div className="loader">
                <div className="circle"></div>
                <div className="circle"></div>
                <div className="circle"></div>
              </div>
            )}
            <button onClick={getMorePosts}>Load more</button>
          </>
        }
      </PageLayout>
    </div>
  );
}

export default List;