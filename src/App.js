import React, { Fragment } from "react";
import './styles.css'
import Popup from "reactjs-popup";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter, dateFilter } from 'react-bootstrap-table2-filter';
import beers from './beers.json';

export default function App() {

  const [open, setOpen] = React.useState(false)
  const [beerData, setBeerData] = React.useState([])
  const [seed, setSeed] = React.useState("");

  React.useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);


  const GetActionFormat = (cell, row) => {
    return (
      <img height='35px' src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
    )

  }

  const GetInfoButton = (cell, row) => {
    return (
      <button type="button" class="btn" data-toggle="modal" data-target="#exampleModalLong" onClick={() => openModal(row)}>
        <img height='35px' src='https://cdn-icons-png.flaticon.com/512/1810/1810852.png' />
      </button>
    )
  }


  const columns = [
    {
      dataField: "brewery_id",
      text: "Brewery ID",
      sort: true,
      headerStyle: {
        backgroundColor: '#c8e6c9'
      }
    },
    {
      dataField: "",
      text: "Image",
      formatter: GetActionFormat,
      headerStyle: {
        backgroundColor: '#c8e6c9'
      },
    },
    {
      dataField: "name",
      text: "Brewery",
      sort: true,
      filter: textFilter(),
      headerStyle: {
        backgroundColor: '#c8e6c9'
      }
    },
    {
      dataField: "last_mod",
      text: "Last Modified",
      headerStyle: {
        backgroundColor: '#c8e6c9'
      }
    }, {
      text: "More Info",
      formatter: GetInfoButton,
      headerStyle: {
        backgroundColor: '#c8e6c9'
      }
    }
  ];


  const openModal = (row) => {
    setBeerData(row)
    setOpen(true)
  }
  const closeModal = () => {
    setOpen(false)
  }


  return (
    <div className="App">
      <div>
        <section id="home" className="header">
          <div className="text--beer">
            <h1><img height='85px' src={`https://thumbs.gfycat.com/PlainVapidGalah-max-1mb.gif`} />What You Know About <span className="safe">BEER</span> ?</h1>

          </div>
        </section>
      </div>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={beers?.data}
        columns={columns}
        filter={filterFactory()}
        pagination={paginationFactory({ sizePerPage: 7 })}
      />
      <Fragment>
        <div>
          <div className="">
            <Popup
              open={open}
              closeOnDocumentClick
              onClose={closeModal}
            >
              <div className="check">
                <button className="btn--close" onClick={closeModal}>
                  &times;
                </button>
                <div className=" p-4 " style={{ width: '350px' }}>
                  <h5>let's tell you About<br /> {beerData?.name}</h5>
                  <hr />
                  {/* <img className="" src="https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_605,q_75,w_1903/v1/clients/fortworth-redesign/Unknown_6f2a9c4e-e0a7-4d60-a9b5-9cf14ba78bb9.jpg" /> */}
                  About :
                  <span className="">{beerData?.descript}</span>
                  <hr />
                  <div>{'Style ID'} : {beerData?.style_id}</div>
                  <div>{'ABV'} : {beerData?.abv} %</div>
                  <div>{'IBU'} : {beerData?.ibu}</div>
                  <div>{'UPC'} : {beerData?.upc}</div>
                  <div>{'SRM'} : {beerData?.srm}</div>
                  <hr />
                </div>
              </div>
            </Popup>
          </div>
        </div>
      </Fragment>
    </div>
  );
}