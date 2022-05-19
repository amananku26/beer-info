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
        width: "100px",
        backgroundColor: '#c8e6c9'
      }
    },
    {
      dataField: "",
      text: "Image",
      formatter: GetActionFormat,
      headerStyle: {
        width: "120px",
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
      // dataField: "last_mod",
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
    // this.setState({ open: true });
  }
  const closeModal = () => {
    setOpen(false)
    // this.setState({ open: false });
  }


  return (
    <div className="App">
      <div>
        <section id="home" className="header">
          <div className="text--beer">
            <h1><img height='85px' src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />What You Know About <span className="safe">BEER</span> ?</h1>

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
          <div className="modal-design">
            <Popup
              open={open}
              closeOnDocumentClick
              onClose={closeModal}
            >
              <div className="modal-reset">
                <button className="close" onClick={closeModal}>
                  &times;
                </button>
                <div className="modal-content p-4" style={{ width: "430px" }}>
                  <h5>let's tell you About<br /> {beerData?.name}</h5>
                  <hr />
                  <img height='225px' width='100%' className="modal-image" src="https://cdn.dribbble.com/users/1315892/screenshots/4677429/beer.gif" />
                  About :
                  <span className="modal-heading">{beerData?.descript}</span>
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